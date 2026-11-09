# SQLite Runtime Resolution (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute tuvastab käivitamisel oma SQLite'i draiveri viieastmelise varuahela kaudu:

1. **Kaasapandud `better-sqlite3`** (`package.json` faili `dependencies` kaudu)
   — kiireim, kasutab natiivset binaarfaili ja installitakse käsuga `npm install`, kui kompileerimistööriistad on saadaval.

2. **Käituse ajal installitud `better-sqlite3`** (asukohas `~/.omniroute/runtime/`)
   — installitakse laisalt esimesel käivitamisel **VÕI** ahela `scripts/build/postinstall.mjs → scripts/postinstall.mjs` kaudu.
   Enne laadimist valideeritakse natiivse `.node` faili signatuurbaidid (ELF / Mach-O / PE),
   et kaitsta rikutud või vale platvormi binaarfailide eest.

3. **`node:sqlite`** (Node ≥22.5 standardteek) — natiivset kompileerimist pole vaja; kasutatakse siis, kui
   mõlemad better-sqlite3 teed ebaõnnestuvad. Piiratud funktsioonide komplekt.

4. **`sql.js`** (WASM) — viimane varuvariant. Töötab kõikjal, kuid on aeglasem
   ja kirjutab andmeid sünkroonse kirjutamise asemel kindla intervalliga.

## Miks selline keerukus?

- **Windowsi EBUSY**: `npm install -g omniroute@latest` võib ebaõnnestuda, kui eelneva
  versiooni `better_sqlite3.node` on töötava protsessi poolt lukustatud. Käitusaegne
  install asukohas `~/.omniroute/runtime/` väldib globaalset npm-i vahemälu.
- **Kompileerimistööriistad puuduvad**: mõned keskkonnad (ettevõtte Windows ilma VS Build
  Toolsita, minimaalsed Dockeri tõmmised) ei suuda paketti `better-sqlite3` kompileerida. Käitusaegne
  installer hangib npm-i registrist eelkompileeritud binaarfaili; varudraiverid
  tagavad, et OmniRoute käivitub ka siis, kui see ebaõnnestub.
- **Võrgust eraldatud süsteemid**: kui npm-i register pole kättesaadav, tagab `node:sqlite`
  või `sql.js` põhifunktsionaalsuse.

## Signatuurbaitide valideerimine

Enne käituse ajal installitud `.node` faili laadimist loeb OmniRoute esimesed 8
baiti ja võrdleb neid teadaolevate platvormisignatuuridega:

| Platvorm                 | Baidid (hex)  | Silt        |
| ------------------------ | ------------- | ----------- |
| Linux                    | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE          | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE          | `CF FA ED FE` | `macho-le`  |
| macOS fat (universaalne) | `CA FE BA BE` | `macho-fat` |
| Windows                  | `4D 5A` (MZ)  | `pe`        |

Sobimatu signatuur → faili eiratakse ja varuahel jätkub järgmise sammuga.

## Aktiivse draiveri kontrollimine

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Käsitsi juhtimine

```bash
# Jäta installimisjärgne eellaadimine vahele (kiirete CI-installide jaoks)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Installi käitusaegne better-sqlite3 sunniviisiliselt uuesti
rm -rf ~/.omniroute/runtime
omniroute  # installitakse järgmisel käivitamisel uuesti

# Kontrolli, milline draiver on aktiivne
omniroute config db-info  # (kui CLI-käsk on olemas)
```

## Sünkroonsete hangumiste diagnoosimine

Paketi `better-sqlite3` kasutamisel määra enne käivitamist `OMNIROUTE_SQLITE_SLOW_MS=200`,
et lülitada sisse sünkroonse adapteri ajastuse mõõtmine. Vaikimisi on see välja lülitatud.
Lõpetatud toiming, mis kestab vähemalt nii mitu millisekundit, väljastab hoiatuse
`[SQLITE-SLOW]`, maksimaalselt üks kord kümne sekundi jooksul adapteri kohta. Hoiatus
sisaldab ainult draiverit, toiminguklassi (`prepare`, `get`, `all`, `run`, `exec`,
`pragma`, transaktsioon või hooldus) ja kulunud aega millisekundites: see ei sisalda
SQL-i, seoseid, ridu, failiteid ega eranditeksti.

See on diagnostiline abivahend, mitte ajalõpp ega päringu optimeerimine. See ei saa
teatada toimingust, mis kunagi ei naase, eristada protsessori tööd kettal ootamisest,
tuvastada täpset SQL-i ega jälgida töötlemata draiveri pideme kaudu tehtud toiminguid.
Asünkroonse varundamise kestus on sihilikult välja jäetud; teised SQLite'i draiverid
ei ole selle valikulise funktsiooni kaudu instrumenteeritud. Muutuja keelamine taastab
algse adapteri ilma ajastusümbristeta. Andmebaasi skeemi ega salvestatud konfiguratsiooni
ei muudeta.

`/healthz` viivituse hoiatus annab teada sündmusetsükli tipust alates eelmisest
mõõtmisest, mitte kogu tööaja keskmisest. Enne hangumise omistamist SQLite'ile või
ketta tõrkele kõrvuta selle ajatempleid aeglaste toimingute hoiatuste ning hosti ja
andmekandja mõõdikutega.

## Viited

Teostus:

- `bin/cli/runtime/magicBytes.mjs` — binaarfailide signatuurbaitide valideerimise abifunktsioonid
- `bin/cli/runtime/sqliteRuntime.mjs` — viieastmeline käitusaegne tuvastaja + laisk installer
- `bin/cli/runtime/index.mjs` — käivitamise orkestreerija (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-i installimisjärgne haak (mittesaatuslik eellaadimine)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ekspordid

## Ühe kirjutajaga topoloogia (HA pole toetatud)

Ülaltoodud draiverite varuahel töötab endiselt **ühes protsessis**. SQLite'i
vaikekonfiguratsiooniga OmniRoute kasutab **ühte kirjutajat**:

- Ära ühenda kahte OmniRoute'i replikaati sama `storage.sqlite` failiga.
- Konteineri taaskäivitamine, Recreate-juurutus, OOM-i tõttu lõpetamine või HEALTHCHECK-i
  taaskäivitus katkestab kõik pooleliolevad SSE-seansid. Standardlahenduses seansse
  enne sulgemist ei tühjendata.
- Orkestraatori elusolekukontroll, mis käsitleb aeglast `/healthz` vastust tõrkena,
  lõpetab ainsa replikaadi. Eelista TCP-elusolekukontrolli + HTTP `/healthz`
  valmiduskontrolli. Vaata jaotisi
  [Dockeri juhend — käideldavus](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ja [Kubernetese kontrollide soovitused](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
