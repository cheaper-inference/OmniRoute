# SQLite Runtime Resolution (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute na-achọpụta draịva SQLite ya n'oge mmalite site n'usoro ndabere nwere nzọụkwụ 5:

1. **`better-sqlite3` agụnyere** (site na `dependencies` dị na `package.json`)
   — nke kachasị ọsọ, faịlụ binary nke sistemụ, nke `npm install` na-etinye mgbe ngwa ọrụ build dị.

2. **`better-sqlite3` etinyere n'oge runtime** (na `~/.omniroute/runtime/`)
   — a na-etinye ya naanị mgbe achọrọ ya na mbido mbụ **MA Ọ BỤ** site na `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Ọ na-enyocha magic bytes nke `.node` nke sistemụ (ELF / Mach-O / PE) tupu ebugo ya
   iji gbochie faịlụ binary mebiri emebi ma ọ bụ nke ikpo okwu na-ekwesịghị ekwesị.

3. **`node:sqlite`** (ọba akwụkwọ ọkọlọtọ Node ≥22.5) — build nke sistemụ adịghị mkpa; a na-eji ya mgbe
   ụzọ better-sqlite3 abụọ ahụ dara. Ọ nwere njirimara ole na ole.

4. **`sql.js`** (WASM) — ndabere ikpeazụ. Ọ na-arụ ọrụ ebe niile mana ọ na-eji nwayọ karịa
   ma na-ede data n'oge etiti oge kama ime ya ozugbo.

## Gịnị kpatara mgbagwoju anya a?

- **Windows EBUSY**: `npm install -g omniroute@latest` nwere ike ịda ma ọ bụrụ na usoro na-agba ọsọ
  kpọchiri `better_sqlite3.node` nke ụdị gara aga. Ntinye runtime
  dị na `~/.omniroute/runtime/` na-agafe cache npm zuru ụwa ọnụ.
- **Enweghị ngwa ọrụ build**: Ụfọdụ gburugburu (Windows ụlọ ọrụ na-enweghị VS Build
  Tools, oyiyi Docker pere mpe) enweghị ike ịchịkọta `better-sqlite3`. Onye ntinye runtime
  na-enweta faịlụ binary e wuru tupu oge eruo site na ndekọ npm; draịva
  ndabere na-ahụ na OmniRoute ka nwere ike ịmalite ọbụlagodi ma nke ahụ daa.
- **Sistemụ ndị na-enweghị njikọ netwọkụ mpụga**: Ọ bụrụ na enweghị ike iru ndekọ npm, `node:sqlite`
  ma ọ bụ `sql.js` na-ekwe nkwa na arụmọrụ bụ isi ga-adị.

## Nnyocha magic-byte

Tupu ebugo faịlụ `.node` etinyere n'oge runtime, OmniRoute na-agụ baitị 8
mbụ ma tụnyere ha na magic ndị amaara nke ikpo okwu:

| Ikpo okwu             | Baitị (hex)   | Akara       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Magic na-adabaghị → a na-eleghara faịlụ ahụ anya, usoro ndabere na-aga n'ihu na nzọụkwụ ọzọ.

## Ịlele draịva na-arụ ọrụ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Njikwa aka

```bash
# Mafee nkwadebe postinstall (maka ntinye CI ngwa ngwa)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Manye ntinyegharị runtime better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # ọ ga-etinyegharị ya na mmalite ọzọ

# Lelee draịva na-arụ ọrụ
omniroute config db-info  # (ọ bụrụ na iwu CLI dị)
```

## Ịchọpụta nkwụsị synchronous

Mgbe ị na-eji `better-sqlite3`, tọọ `OMNIROUTE_SQLITE_SLOW_MS=200` tupu mmalite iji họrọ
ịtụ oge nke adapter synchronous. A na-agbanyụ ya na ndabara. Ọrụ emechara nke were
opekata mpe millisekọnd ole ahụ na-ewepụta ịdọ aka ná ntị `[SQLITE-SLOW]`, ọ kachasị otu ugboro n'ime
sekọnd iri ọ bụla maka adapter ọ bụla. Ịdọ aka ná ntị ahụ nwere naanị draịva, klaasị ọrụ
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction ma ọ bụ maintenance), na
millisekọnd gafere: enweghị SQL, bindings, rows, paths ma ọ bụ ederede exception.

Nke a bụ enyemaka nchọpụta, ọ bụghị timeout ma ọ bụ nkwalite query. Ọ pụghị ịkọ
ọrụ na-adịghị alaghachi ma ọlị, ịmata ọdịiche dị n'etiti ọrụ CPU na ichere disk, ịchọpụta
SQL kpọmkwem, ma ọ bụ ịhụ ọrụ e mere site na raw driver handle.
A kpachaara anya wepụ oge backup async; a naghị etinye ngwaọrụ nlele a a na-ahọrọ iji n'ime
draịva SQLite ndị ọzọ. Ịgbanyụ variable ahụ na-eweghachi adapter mbụ
na-enweghị wrappers ịtụ oge. Enweghị mgbanwe na schema database ma ọ bụ nhazi echekwara.

Ịdọ aka ná ntị lag nke `/healthz` na-akọ ọnụ ọgụgụ kachasị elu nke event-loop kemgbe sample gara aga,
ọ bụghị nkezi oge ndụ ya niile. Tụnyere timestamps ya na ịdọ aka ná ntị ọrụ ndị ji nwayọ
yana metrics nke host/storage tupu i kwuo na nkwụsị ahụ sitere na SQLite ma ọ bụ ọdịda disk.

## Nrụtụaka

Mmejuputa:

- `bin/cli/runtime/magicBytes.mjs` — ndị enyemaka maka nnyocha magic-byte nke binary
- `bin/cli/runtime/sqliteRuntime.mjs` — onye na-achọpụta runtime nwere nzọụkwụ 5 + onye ntinye lazy
- `bin/cli/runtime/index.mjs` — onye nhazi mmalite (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook npm mgbe ntinye gasịrị (nkwadebe na-anaghị akpata ọdịda)
- `src/lib/db/core.ts` — exports nke `ensureDbInitialized()` / `getDriverInfo()`

## Topology otu onye na-ede (anaghị akwado HA)

Usoro ndabere draịva dị n'elu ka na-agba n'ime **otu process**. SQLite ndabara
nke OmniRoute nwere **otu onye na-ede**:

- Ejikọla replicas OmniRoute abụọ na otu faịlụ `storage.sqlite`.
- Mmalitegharị container, deploy Recreate, OOM kill, ma ọ bụ mmalitegharị HEALTHCHECK na-akwụsị
  session SSE niile ka na-arụ ọrụ. Enweghị session drain n'ụzọ ndabara.
- Liveness nke orchestrator nke na-ewere `/healthz` ji nwayọ dị ka ihe nwụrụ anwụ ga-akwụsị naanị
  replica ahụ. Họrọ TCP liveness + readiness HTTP `/healthz`. Lee
  [Ntuziaka Docker — ịdị adị](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  na [ndụmọdụ probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
