# SQLite Runtime Resolution (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute yana gano direban SQLite ɗinsa lokacin farawa ta hanyar jerin madadin matakai 5:

1. **`better-sqlite3` da aka haɗa** (ta hanyar `dependencies` a cikin `package.json`)
   — shi ne mafi sauri, binary na asali, kuma `npm install` ne ke shigar da shi idan akwai kayan aikin ginawa.

2. **`better-sqlite3` da aka shigar a lokacin aiki** (a cikin `~/.omniroute/runtime/`)
   — ana shigar da shi ne idan an buƙata a farkon aiki **KO** ta `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Yana tantance magic bytes na asalin `.node` (ELF / Mach-O / PE) kafin lodawa
   domin kariya daga binary da ya lalace ko wanda aka gina don wani dandali.

3. **`node:sqlite`** (ma'ajin daidaitaccen Node ≥22.5) — ba ya buƙatar gina binary na asali; ana amfani da shi idan
   duk hanyoyin better-sqlite3 biyu suka gaza. Yana da iyakantattun fasaloli.

4. **`sql.js`** (WASM) — madadin ƙarshe. Yana aiki a ko'ina amma ya fi jinkiri
   kuma yana rubuta bayanai a wani tazara maimakon yin hakan nan take.

## Me ya sa ake buƙatar wannan sarƙaƙƙiyar hanya?

- **Windows EBUSY**: `npm install -g omniroute@latest` na iya gazawa idan wani tsari da ke aiki
  ya kulle `better_sqlite3.node` na sigar da ta gabata. Shigarwa a lokacin aiki
  cikin `~/.omniroute/runtime/` yana kauce wa cache na npm na duniya.
- **Babu kayan aikin ginawa**: Wasu muhalli (Windows na kamfani ba tare da VS Build
  Tools ba, ko ƙananan hotunan Docker) ba za su iya haɗa `better-sqlite3` ba. Mai shigarwa
  na lokacin aiki yana samo binary da aka riga aka gina daga rajistar npm; direbobin
  madadin suna tabbatar da cewa OmniRoute zai iya farawa ko da hakan ya gaza.
- **Tsarukan da aka ware daga hanyar sadarwa**: Idan ba za a iya isa ga rajistar npm ba, `node:sqlite`
  ko `sql.js` suna tabbatar da samuwar ainihin ayyuka.

## Tantance magic-byte

Kafin loda fayil ɗin `.node` da aka shigar a lokacin aiki, OmniRoute yana karanta bytes 8
na farko kuma yana kwatanta su da sanannun magic bytes na dandali:

| Dandali               | Bytes (hex)   | Lakabi      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Magic da bai dace ba → ana watsi da fayil ɗin, sannan a ci gaba zuwa matakin madadin na gaba.

## Duba direban da ke aiki

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Sarrafawa da hannu

```bash
# Tsallake ɗumamar postinstall (don shigarwar CI mai sauri)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Sake shigar da better-sqlite3 na lokacin aiki da tilas
rm -rf ~/.omniroute/runtime
omniroute  # zai sake shigarwa a farawa na gaba

# Duba direban da ke aiki
omniroute config db-info  # (idan umarnin CLI yana akwai)
```

## Gano musabbabin tsayawar aiki mai daidaitawa

Tare da `better-sqlite3`, saita `OMNIROUTE_SQLITE_SLOW_MS=200` kafin farawa domin shiga
auna lokacin adafta mai daidaitawa. A tsohon tsari wannan a kashe yake. Aikin da aka kammala wanda ya ɗauki
aƙalla adadin millisekan ɗin nan yana fitar da gargaɗin `[SQLITE-SLOW]`, sau ɗaya kacal mafi yawa a cikin
kowane daƙiƙa goma ga kowane adafta. Gargaɗin yana ɗauke da direba, ajin aiki
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction ko maintenance), da
millisekan da suka wuce kawai: babu SQL, bindings, rows, paths ko rubutun exception.

Wannan taimako ne na gano matsala, ba timeout ko inganta query ba. Ba zai iya bayar da rahoton
aikin da bai taɓa dawowa ba, bambance aikin CPU da jiran disk, gano
ainihin SQL, ko lura da ayyukan da aka yi ta hanyar raw driver handle ba.
An ware tsawon lokacin async backup da gangan; sauran direbobin SQLite ba su da
wannan kayan aunawa na zaɓi. Kashe variable ɗin yana mayar da adafta na asali
ba tare da timing wrappers ba. Babu wani canji ga database schema ko stored configuration.

Gargaɗin lag na `/healthz` yana bayar da rahoton kololuwar event-loop tun daga samfurin da ya gabata,
ba matsakaicin tsawon rayuwa ba. Kwatanta timestamps ɗinsa da gargaɗin ayyuka masu jinkiri
da metrics na host/storage kafin danganta tsayawar aiki da SQLite ko lalacewar disk.

## Madogara

Aiwatarwa:

- `bin/cli/runtime/magicBytes.mjs` — mataimakan tantance magic-byte na binary
- `bin/cli/runtime/sqliteRuntime.mjs` — mai gano runtime mai matakai 5 + mai shigarwa idan an buƙata
- `bin/cli/runtime/index.mjs` — mai tsara farawa (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook na npm bayan shigarwa (ɗumamar da gazawarta ba ta dakatar da aiki)
- `src/lib/db/core.ts` — exports na `ensureDbInitialized()` / `getDriverInfo()`

## Tsarin marubuci guda ɗaya (ba a tallafa wa HA)

Jerin madadin direbobin da ke sama har yanzu yana aiki ne cikin **process guda ɗaya**. SQLite
na tsohon tsarin OmniRoute **marubuci guda ɗaya** ne:

- Kada a haɗa replicas biyu na OmniRoute da fayil ɗin `storage.sqlite` guda ɗaya.
- Sake farawa na container, Recreate deploy, OOM kill, ko sake farawa na HEALTHCHECK yana katse
  duk wani SSE session da ke gudana. Babu session drain a daidaitacciyar hanyar.
- Liveness na orchestrator da ke ɗaukar `/healthz` mai jinkiri a matsayin wanda ya mutu zai kashe replica
  guda ɗaya tilo. Fi son TCP liveness + readiness na HTTP `/healthz`. Duba
  [Jagorar Docker — samuwa](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  da [shawarwarin probe na Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
