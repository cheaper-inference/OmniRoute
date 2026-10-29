# SQLite Runtime Resolution (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ń pinnu awakọ SQLite rẹ nígbà ìbẹ̀rẹ̀ nípasẹ̀ ẹ̀wọ̀n àṣàyàn-àfẹ́yinti onígbésẹ̀ 5:

1. **`better-sqlite3` tí a kó sínú rẹ̀** (nípasẹ̀ `dependencies` nínú `package.json`)
   — ó yára jù lọ, ó jẹ́ native binary, `npm install` sì máa ń fi sílẹ̀ nígbà tí àwọn irinṣẹ́ build bá wà.

2. **`better-sqlite3` tí a fi sílẹ̀ ní runtime** (nínú `~/.omniroute/runtime/`)
   — a máa ń fi sílẹ̀ nígbà tí a bá kọ́kọ́ ṣiṣẹ́ **TÀBÍ** nípasẹ̀ `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Ó máa ń fìdí àwọn magic bytes `.node` native (ELF / Mach-O / PE) múlẹ̀ kí ó tó load wọn
   láti dáàbò bo ara rẹ̀ lọ́wọ́ àwọn binary tó bàjẹ́ tàbí tí wọ́n jẹ́ ti platform mìíràn.

3. **`node:sqlite`** (stdlib Node ≥22.5) — kò nílò native build; a máa ń lò ó nígbà tí
   àwọn ọ̀nà better-sqlite3 méjèèjì bá kùnà. Àwọn feature rẹ̀ ní ààlà.

4. **`sql.js`** (WASM) — àṣàyàn-àfẹ́yinti ìkẹyìn. Ó ń ṣiṣẹ́ ní gbogbo ibi ṣùgbọ́n ó lọ́ra sí i,
   ó sì ń kọ data sílẹ̀ ní àárín àsìkò dípò kí ó ṣe bẹ́ẹ̀ ní synchronous.

## Kí ló dé tí ó fi díjú báyìí?

- **Windows EBUSY**: `npm install -g omniroute@latest` lè kùnà bí
  `better_sqlite3.node` ti version àtijọ́ bá wà ní títìpa lọ́wọ́ process kan tó ń ṣiṣẹ́. Fífi sílẹ̀ ní runtime
  nínú `~/.omniroute/runtime/` máa ń yẹra fún global npm cache.
- **Kò sí àwọn irinṣẹ́ build**: Àwọn environment kan (Windows ilé-iṣẹ́ tí kò ní VS Build
  Tools, àwọn Docker image kékeré) kò lè compile `better-sqlite3`. Runtime
  installer máa ń gba binary tí a ti kọ́ tẹ́lẹ̀ láti npm registry; àwọn awakọ
  àfẹ́yinti sì ń rí i dájú pé OmniRoute ṣì lè boot bí ìyẹn bá tilẹ̀ kùnà.
- **Àwọn system tí kò ní àsopọ̀ síta**: Bí npm registry kò bá ṣe é dé, `node:sqlite`
  tàbí `sql.js` máa ń ṣe ìdánilójú pé iṣẹ́ ìpìlẹ̀ ṣì wà.

## Ìfìdímúlẹ̀ magic-byte

Kí OmniRoute tó load file `.node` tí a fi sílẹ̀ ní runtime, ó máa ń ka àwọn byte 8
àkọ́kọ́, ó sì fi wọ́n wé àwọn magic platform tí a mọ̀:

| Platform              | Àwọn byte (hex) | Àmì         |
| --------------------- | --------------- | ----------- |
| Linux                 | `7F 45 4C 46`   | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF`   | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE`   | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE`   | `macho-fat` |
| Windows               | `4D 5A` (MZ)    | `pe`        |

Magic tí kò bá mu → a máa foju kọ file náà, àṣàyàn-àfẹ́yinti yóò sì tẹ̀síwájú sí ìgbésẹ̀ tó kàn.

## Ṣíṣàyẹ̀wò awakọ tó ń ṣiṣẹ́

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ìṣàkóso pẹ̀lú ọwọ́

```bash
# Foju kọ postinstall warm-up (fún CI install tó yára)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Fi runtime better-sqlite3 sílẹ̀ tuntun ní tipátipá
rm -rf ~/.omniroute/runtime
omniroute  # yóò tún fi sílẹ̀ ní ìbẹ̀rẹ̀ tó kàn

# Ṣàyẹ̀wò awakọ tó ń ṣiṣẹ́
omniroute config db-info  # (bí command CLI náà bá wà)
```

## Ṣíṣe àyẹ̀wò àwọn ìdádúró synchronous

Pẹ̀lú `better-sqlite3`, ṣètò `OMNIROUTE_SQLITE_SLOW_MS=200` kí ìbẹ̀rẹ̀ tó wáyé láti
yàn ìwọ̀n àsìkò adapter synchronous. Ó wà ní pípà ní default. Iṣẹ́ tó parí tí ó sì gba
ó kéré tán iye millisecond yẹn máa ń mú ìkìlọ̀ `[SQLITE-SLOW]` jáde, kò ju ẹ̀ẹ̀kan lọ
ní gbogbo ìṣẹ́jú-àáyá mẹ́wàá fún adapter kọ̀ọ̀kan. Ìkìlọ̀ náà ní awakọ, class iṣẹ́
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction tàbí maintenance), àti
iye millisecond tó kọjá nìkan: kò ní SQL, bindings, rows, paths tàbí ọ̀rọ̀ exception.

Èyí jẹ́ ohun èlò ìwádìí, kì í ṣe timeout tàbí query optimization. Kò lè jabo
iṣẹ́ tí kò padà rárá, ṣe ìyàtọ̀ láàárín iṣẹ́ CPU àti dídúró de disk, ṣe ìdánimọ̀
SQL pàtó, tàbí ṣàkíyèsí àwọn iṣẹ́ tí a ṣe nípasẹ̀ raw driver handle.
A mọ̀ọ́mọ̀ yọ iye àsìkò async backup kúrò; a kò fi instrumentation sí àwọn awakọ SQLite mìíràn
nípasẹ̀ opt-in yìí. Pípa variable náà máa ń mú adapter àkọ́kọ́ padà
láìsí àwọn timing wrapper. Kò sí ìyípadà sí database schema tàbí configuration tí a fipamọ́.

Ìkìlọ̀ lag `/healthz` máa ń jabo event-loop peak láti sample tó ṣáájú,
kì í ṣe average gbogbo ìgbésí-ayé. Fi àwọn timestamp rẹ̀ wé àwọn ìkìlọ̀ iṣẹ́ tó lọ́ra
àti àwọn metric host/storage kí o tó sọ pé ìdádúró náà wá láti SQLite tàbí ìkùnà disk.

## Ìtọ́kasí

Ìmúṣẹ:

- `bin/cli/runtime/magicBytes.mjs` — àwọn helper fún ìfìdímúlẹ̀ binary magic-byte
- `bin/cli/runtime/sqliteRuntime.mjs` — runtime resolver onígbésẹ̀ 5 + lazy installer
- `bin/cli/runtime/index.mjs` — olùṣètò ìbẹ̀rẹ̀ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm post-install hook (warm-up tí ìkùnà rẹ̀ kì í dá iṣẹ́ dúró)
- `src/lib/db/core.ts` — àwọn export `ensureDbInitialized()` / `getDriverInfo()`

## Topology olùkọ̀wé-kan ṣoṣo (HA kò ní àtìlẹ́yìn)

Ẹ̀wọ̀n àṣàyàn-àfẹ́yinti awakọ lókè ṣì ń ṣiṣẹ́ nínú **process kan ṣoṣo**. SQLite
default OmniRoute jẹ́ **olùkọ̀wé kan ṣoṣo**:

- Má ṣe so replica OmniRoute méjì mọ́ file `storage.sqlite` kan náà.
- Container restart, Recreate deploy, OOM kill, tàbí HEALTHCHECK restart máa ń gé
  gbogbo session SSE tó ń lọ lọ́wọ́. Kò sí session drain lórí ọ̀nà boṣewa.
- Orchestrator liveness tí ó ka `/healthz` tó lọ́ra sí ohun tó ti kú yóò pa
  replica kan ṣoṣo náà. Yan TCP liveness + HTTP `/healthz` readiness dípò rẹ̀. Wo
  [Ìtọ́sọ́nà Docker — availability](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  àti [Àwọn àbá probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
