# SQLite Runtime Resolution (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute finner SQLite-driveren ved oppstart gjennom en reservekjede i fem trinn:

1. **Medfølgende `better-sqlite3`** (via `dependencies` i `package.json`)
   — raskest, bruker en nativ binærfil og installeres av `npm install` når byggeverktøy er tilgjengelige.

2. **Kjøretidsinstallert `better-sqlite3`** (i `~/.omniroute/runtime/`)
   — installeres ved behov ved første kjøring **ELLER** av `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validerer magiske byte i den native `.node`-filen (ELF / Mach-O / PE) før innlasting
   for å beskytte mot skadde binærfiler eller binærfiler for feil plattform.

3. **`node:sqlite`** (Node ≥22.5-standardbiblioteket) — krever ingen nativ bygging og brukes når
   begge better-sqlite3-alternativene mislykkes. Begrenset funksjonssett.

4. **`sql.js`** (WASM) — siste reservealternativ. Fungerer overalt, men er tregere
   og skriver data med jevne mellomrom i stedet for synkront.

## Hvorfor denne kompleksiteten?

- **Windows EBUSY**: `npm install -g omniroute@latest` kan mislykkes hvis den forrige
  versjonens `better_sqlite3.node` er låst av en kjørende prosess. Kjøretidsinstallasjonen
  i `~/.omniroute/runtime/` omgår den globale npm-hurtigbufferen.
- **Ingen byggeverktøy**: Enkelte miljøer (Windows i bedrifter uten VS Build
  Tools, minimale Docker-avbildninger) kan ikke kompilere `better-sqlite3`. Kjøretidsinstallasjonsprogrammet
  henter en forhåndsbygd binærfil fra npm-registeret, mens reservedriverne
  sikrer at OmniRoute fortsatt starter selv om dette mislykkes.
- **Isolerte systemer**: Hvis npm-registeret ikke er tilgjengelig, garanterer `node:sqlite`
  eller `sql.js` grunnleggende funksjonalitet.

## Validering av magiske byte

Før en kjøretidsinstallert `.node`-fil lastes inn, leser OmniRoute de første 8
bytene og sammenligner dem med kjente plattformsignaturer:

| Plattform              | Byte (hex)    | Etikett     |
| ---------------------- | ------------- | ----------- |
| Linux                  | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE        | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE        | `CF FA ED FE` | `macho-le`  |
| macOS fat (universell) | `CA FE BA BE` | `macho-fat` |
| Windows                | `4D 5A` (MZ)  | `pe`        |

En signatur som ikke samsvarer → filen ignoreres, og reservekjeden fortsetter til neste trinn.

## Kontrollere den aktive driveren

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuell kontroll

```bash
# Hopp over oppvarming etter installasjon (for raske CI-installasjoner)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Tving ny installasjon av better-sqlite3 for kjøretidsmiljøet
rm -rf ~/.omniroute/runtime
omniroute  # installeres på nytt ved neste oppstart

# Kontroller hvilken driver som er aktiv
omniroute config db-info  # (hvis CLI-kommandoen finnes)
```

## Diagnostisering av synkrone blokkeringer

Med `better-sqlite3` kan du angi `OMNIROUTE_SQLITE_SLOW_MS=200` før oppstart for å
aktivere tidtaking av den synkrone adapteren. Dette er deaktivert som standard. En fullført operasjon som tar
minst så mange millisekunder, utløser en `[SQLITE-SLOW]`-advarsel, maksimalt én gang per
ti sekunder per adapter. Advarselen inneholder bare driveren, operasjonsklassen
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaksjon eller vedlikehold) og
forløpte millisekunder: ingen SQL, bindinger, rader, baner eller unntakstekst.

Dette er et diagnostisk hjelpemiddel, ikke et tidsavbrudd eller en spørringsoptimalisering. Det kan ikke rapportere
en operasjon som aldri returnerer, skille CPU-arbeid fra venting på disk, identifisere
den nøyaktige SQL-en eller observere operasjoner som utføres gjennom det rå driverhåndtaket.
Varigheten til asynkron sikkerhetskopiering er bevisst utelatt; andre SQLite-drivere
instrumenteres ikke av denne valgfrie funksjonen. Hvis variabelen deaktiveres, gjenopprettes den opprinnelige adapteren
uten omsluttende tidtakingsfunksjoner. Databaseskjemaet og lagret konfigurasjon endres ikke.

Forsinkelsesadvarselen fra `/healthz` rapporterer hendelsesløkkens høyeste verdi siden forrige måling,
ikke gjennomsnittet for hele levetiden. Sammenlign tidsstemplene med advarsler om trege operasjoner
og verts-/lagringsmålinger før en blokkering tilskrives SQLite- eller diskfeil.

## Referanse

Implementasjon:

- `bin/cli/runtime/magicBytes.mjs` — hjelpefunksjoner for validering av binære magiske byte
- `bin/cli/runtime/sqliteRuntime.mjs` — femtrinns kjøretidsvelger + installasjonsprogram ved behov
- `bin/cli/runtime/index.mjs` — oppstartskoordinator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-krok etter installasjon (ikke-kritisk oppvarming)
- `src/lib/db/core.ts` — eksporterer `ensureDbInitialized()` / `getDriverInfo()`

## Topologi med én skriver (HA støttes ikke)

Reservekjeden for drivere ovenfor kjører fortsatt i **én prosess**. Med standardoppsettet for SQLite
er OmniRoute en **enkeltstående skriver**:

- Ikke koble to OmniRoute-replikaer til den samme `storage.sqlite`-filen.
- Omstart av en container, Recreate-distribusjon, OOM-avslutning eller HEALTHCHECK-omstart avslutter
  alle aktive SSE-økter. Standardoppsettet har ingen nedtapping av økter.
- En livssjekk i orkestratoren som tolker en treg `/healthz` som utilgjengelig, vil avslutte den eneste
  replikaen. Foretrekk TCP-livssjekk + HTTP `/healthz`-beredskapssjekk. Se
  [Docker-veiledning — tilgjengelighet](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  og [anbefalinger for Kubernetes-prober](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
