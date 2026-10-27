# SQLite Runtime Resolution (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute paleidimo metu nustato savo SQLite tvarkyklę naudodama 5 žingsnių atsarginio pasirinkimo grandinę:

1. **Komplektuojama `better-sqlite3`** (per `package.json` lauką `dependencies`)
   — greičiausia, naudoja savąjį dvejetainį failą, įdiegiama vykdant `npm install`, kai yra kompiliavimo įrankių.

2. **Vykdymo metu įdiegta `better-sqlite3`** (kataloge `~/.omniroute/runtime/`)
   — atidėtai įdiegiama pirmą kartą paleidus **ARBA** naudojant `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Prieš įkeliant patikrinami savojo `.node` failo signatūros baitai (ELF / Mach-O / PE),
   kad būtų apsisaugota nuo sugadintų arba netinkamai platformai skirtų dvejetainių failų.

3. **`node:sqlite`** (Node ≥22.5 standartinė biblioteka) — nereikia savųjų komponentų kompiliavimo; naudojama, kai
   abu better-sqlite3 variantai nesuveikia. Funkcijų rinkinys ribotas.

4. **`sql.js`** (WASM) — paskutinis atsarginis variantas. Veikia visur, tačiau yra lėtesnis
   ir duomenis įrašo periodiškai, o ne sinchroniškai.

## Kodėl tai taip sudėtinga?

- **Windows EBUSY**: `npm install -g omniroute@latest` gali nepavykti, jei ankstesnės
  versijos `better_sqlite3.node` failą yra užrakinęs veikiantis procesas. Diegimas
  vykdymo metu į `~/.omniroute/runtime/` leidžia apeiti visuotinę npm podėlio saugyklą.
- **Nėra kompiliavimo įrankių**: kai kuriose aplinkose (įmonių Windows sistemose be VS Build
  Tools, minimaliose Docker atvaizdžių sistemose) negalima sukompiliuoti `better-sqlite3`. Vykdymo metu
  veikianti diegimo programa iš npm registro gauna iš anksto sukompiliuotą dvejetainį failą; atsarginės
  tvarkyklės užtikrina, kad OmniRoute vis tiek bus paleista, net jei tai nepavyks.
- **Nuo tinklo izoliuotos sistemos**: jei npm registras nepasiekiamas, `node:sqlite`
  arba `sql.js` užtikrina bazinį funkcionalumą.

## Signatūros baitų tikrinimas

Prieš įkeldama vykdymo metu įdiegtą `.node` failą, OmniRoute nuskaito pirmuosius 8
baitus ir palygina juos su žinomomis platformų signatūromis:

| Platforma              | Baitai (šešioliktainiai) | Žyma        |
| ---------------------- | ------------------------ | ----------- |
| Linux                  | `7F 45 4C 46`            | `elf`       |
| macOS 64 bitų BE       | `FE ED FA CF`            | `macho`     |
| macOS 64 bitų LE       | `CF FA ED FE`            | `macho-le`  |
| macOS fat (universali) | `CA FE BA BE`            | `macho-fat` |
| Windows                | `4D 5A` (MZ)             | `pe`        |

Jei signatūra nesutampa → failas ignoruojamas, o atsarginio pasirinkimo grandinė pereina prie kito žingsnio.

## Aktyvios tvarkyklės tikrinimas

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Rankinis valdymas

```bash
# Praleisti postinstall parengimą (greitam diegimui CI aplinkoje)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Priverstinai iš naujo įdiegti vykdymo aplinkos better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # bus iš naujo įdiegta kito paleidimo metu

# Patikrinti, kuri tvarkyklė aktyvi
omniroute config db-info  # (jei CLI komanda egzistuoja)
```

## Sinchroninių strigimų diagnostika

Naudodami `better-sqlite3`, prieš paleidimą nustatykite `OMNIROUTE_SQLITE_SLOW_MS=200`, kad
įjungtumėte sinchroninio adapterio trukmės matavimą. Pagal numatytuosius nustatymus jis išjungtas. Užbaigus operaciją,
trukusią bent tiek milisekundžių, pateikiamas įspėjimas `[SQLITE-SLOW]`, ne dažniau kaip kartą per
dešimt sekundžių kiekvienam adapteriui. Įspėjime nurodoma tik tvarkyklė, operacijos klasė
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, operacija arba priežiūra) ir
praėjęs laikas milisekundėmis: nepateikiama SQL, susiejimo reikšmių, eilučių, kelių ar išimties teksto.

Tai diagnostikos priemonė, o ne skirtasis laikas ar užklausų optimizavimas. Ji negali pranešti
apie niekada nebaigiamą operaciją, atskirti CPU darbo nuo disko laukimo, nustatyti
tikslios SQL užklausos ar stebėti operacijų, atliekamų per tiesioginį tvarkyklės objektą.
Asinchroninio atsarginio kopijavimo trukmė sąmoningai neįtraukiama; kitoms SQLite tvarkyklėms
šis pasirenkamasis instrumentavimas netaikomas. Išjungus kintamąjį, atkuriamas pradinis adapteris
be trukmės matavimo apvalkalų. Duomenų bazės schema ir išsaugota konfigūracija nekeičiamos.

`/healthz` delsos įspėjimas pateikia didžiausią įvykių ciklo delsą nuo ankstesnio matavimo,
o ne viso veikimo laikotarpio vidurkį. Prieš priskirdami strigimą SQLite ar disko gedimui,
sugretinkite jo laiko žymas su lėtų operacijų įspėjimais ir pagrindinio kompiuterio bei saugyklos metrikomis.

## Nuorodos

Realizacija:

- `bin/cli/runtime/magicBytes.mjs` — dvejetainių failų signatūros baitų tikrinimo pagalbinės priemonės
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 žingsnių vykdymo aplinkos parinkiklis ir atidėto diegimo priemonė
- `bin/cli/runtime/index.mjs` — paleidimo koordinatorius (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm podiegiminė gaudyklė (nekritinis parengimas)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` eksportai

## Vieno rašytojo topologija (HA nepalaikomas)

Anksčiau aprašyta atsarginio tvarkyklių pasirinkimo grandinė vis tiek veikia **viename procese**. Numatytoji SQLite
naudojanti OmniRoute yra **vieno rašytojo** sistema:

- Nejunkite dviejų OmniRoute replikų prie to paties `storage.sqlite` failo.
- Konteinerio paleidimas iš naujo, Recreate diegimas, nutraukimas dėl OOM arba HEALTHCHECK inicijuotas paleidimas iš naujo nutraukia
  kiekvieną tuo metu aktyvią SSE sesiją. Standartiniame veikimo režime nėra sesijų užbaigimo mechanizmo.
- Orkestratoriaus gyvybingumo patikra, kuri lėtą `/healthz` atsaką vertina kaip neveikiančią paslaugą, nutrauks vienintelę
  repliką. Gyvybingumui tikrinti rinkitės TCP, o parengčiai — HTTP `/healthz`. Žr.
  [Docker vadovą — pasiekiamumas](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ir [Kubernetes patikrų rekomendacijas](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
