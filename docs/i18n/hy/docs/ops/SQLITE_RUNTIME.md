# SQLite Runtime Resolution (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute-ը գործարկման պահին որոշում է իր SQLite դրայվերը՝ 5-քայլանոց պահուստային շղթայի միջոցով.

1. **Փաթեթավորված `better-sqlite3`** (`package.json`-ի `dependencies`-ի միջոցով)
   — ամենաարագ տարբերակն է, օգտագործում է բնիկ երկուական ֆայլ և տեղադրվում է `npm install`-ի միջոցով, երբ առկա են կառուցման գործիքներ։

2. **Կատարման ժամանակ տեղադրված `better-sqlite3`** (`~/.omniroute/runtime/`-ում)
   — առաջին գործարկման ժամանակ տեղադրվում է ըստ անհրաժեշտության **ԿԱՄ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs`-ի միջոցով։
   Բեռնումից առաջ ստուգում է բնիկ `.node` ֆայլի կախարդական բայթերը (ELF / Mach-O / PE)՝
   վնասված կամ սխալ հարթակի համար նախատեսված երկուական ֆայլերից պաշտպանվելու նպատակով։

3. **`node:sqlite`** (Node ≥22.5 ստանդարտ գրադարան) — բնիկ կառուցում չի պահանջում և օգտագործվում է, երբ
   better-sqlite3-ի երկու ուղիներն էլ ձախողվում են։ Ունի գործառույթների սահմանափակ հավաքածու։

4. **`sql.js`** (WASM) — վերջնական պահուստային տարբերակը։ Աշխատում է ամենուր, սակայն ավելի դանդաղ է
   և տվյալները գրում է պարբերական ընդմիջումներով, այլ ոչ թե համաժամանակյա եղանակով։

## Ինչո՞ւ է այս ամենն այսքան բարդ։

- **Windows EBUSY**. `npm install -g omniroute@latest`-ը կարող է ձախողվել, եթե նախորդ
  տարբերակի `better_sqlite3.node` ֆայլը կողպված է գործող գործընթացի կողմից։ Կատարման ժամանակ
  `~/.omniroute/runtime/`-ում տեղադրումը շրջանցում է npm-ի համընդհանուր քեշը։
- **Կառուցման գործիքների բացակայություն**. որոշ միջավայրեր (կորպորատիվ Windows՝ առանց VS Build
  Tools-ի, նվազագույն Docker պատկերներ) չեն կարող կոմպիլացնել `better-sqlite3`-ը։ Կատարման ժամանակի
  տեղադրիչը npm ռեեստրից ստանում է նախապես կառուցված երկուական ֆայլ, իսկ պահուստային
  դրայվերներն ապահովում են, որ OmniRoute-ը գործարկվի նույնիսկ այդ գործընթացի ձախողման դեպքում։
- **Ցանցից մեկուսացված համակարգեր**. եթե npm ռեեստրն անհասանելի է, `node:sqlite`-ը
  կամ `sql.js`-ը երաշխավորում են բազային գործառունակությունը։

## Կախարդական բայթերի ստուգում

Կատարման ժամանակ տեղադրված `.node` ֆայլը բեռնելուց առաջ OmniRoute-ը կարդում է առաջին 8
բայթը և համեմատում դրանք հայտնի հարթակների կախարդական արժեքների հետ.

| Հարթակ                | Բայթեր (hex)  | Պիտակ       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Եթե կախարդական արժեքը չի համընկնում, ֆայլն անտեսվում է, և պահուստային շղթան անցնում է հաջորդ քայլին։

## Ակտիվ դրայվերի ստուգում

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ձեռքով կառավարում

```bash
# Բաց թողնել postinstall նախնական տաքացումը (արագ CI տեղադրումների համար)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Հարկադրաբար վերատեղադրել կատարման ժամանակի better-sqlite3-ը
rm -rf ~/.omniroute/runtime
omniroute  # կվերատեղադրվի հաջորդ գործարկման ժամանակ

# Ստուգել, թե որ դրայվերն է ակտիվ
omniroute config db-info  # (եթե CLI հրամանը գոյություն ունի)
```

## Համաժամանակյա կանգերի ախտորոշում

`better-sqlite3`-ի դեպքում գործարկումից առաջ սահմանեք `OMNIROUTE_SQLITE_SLOW_MS=200`՝
համաժամանակյա ադապտերի ժամանակաչափումը միացնելու համար։ Լռելյայն այն անջատված է։ Ավարտված գործողությունը,
որը տևել է առնվազն այդքան միլիվայրկյան, առաջացնում է `[SQLITE-SLOW]` նախազգուշացում՝ յուրաքանչյուր
ադապտերի համար առավելագույնը տասը վայրկյանը մեկ։ Նախազգուշացումը պարունակում է միայն դրայվերը,
գործողության դասը (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, տրանզակցիա կամ սպասարկում) և
անցած միլիվայրկյանների քանակը. այն չի պարունակում SQL, կապակցված արժեքներ, տողեր, ուղիներ կամ բացառության տեքստ։

Սա ախտորոշիչ օժանդակ միջոց է, ոչ թե ժամանակի սահմանափակում կամ հարցման օպտիմալացում։ Այն չի կարող հաղորդել
գործողության մասին, որը երբեք չի վերադարձվում, տարբերակել CPU-ի աշխատանքը սկավառակի սպասումներից, որոշել
կոնկրետ SQL-ը կամ դիտարկել հում դրայվերի բռնակի միջոցով կատարված գործողությունները։
Ասինխրոն պահուստավորման տևողությունը միտումնավոր բացառված է. SQLite-ի մյուս դրայվերները չեն
գործիքավորվում այս ընտրովի հնարավորությամբ։ Փոփոխականն անջատելիս վերականգնվում է սկզբնական ադապտերը՝
առանց ժամանակաչափման փաթաթիչների։ Տվյալների բազայի սխեման կամ պահպանված կազմաձևումը չի փոխվում։

`/healthz`-ի հապաղման նախազգուշացումը հաղորդում է նախորդ նմուշառումից ի վեր իրադարձությունների ցիկլի
առավելագույն հապաղումը, ոչ թե ամբողջ աշխատանքի ժամանակի միջինը։ Նախքան կանգը SQLite-ին կամ սկավառակի
խափանմանը վերագրելը՝ համադրեք դրա ժամանակային նշումները դանդաղ գործողությունների նախազգուշացումների
և հոսթի/պահեստի չափումների հետ։

## Տեղեկատու

Իրականացում.

- `bin/cli/runtime/magicBytes.mjs` — երկուական ֆայլերի կախարդական բայթերի ստուգման օժանդակ միջոցներ
- `bin/cli/runtime/sqliteRuntime.mjs` — կատարման ժամանակի 5-քայլանոց որոշիչ և ըստ անհրաժեշտության տեղադրիչ
- `bin/cli/runtime/index.mjs` — գործարկման համակարգող (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-ի հետտեղադրման կեռիկ (ոչ ճակատագրական նախնական տաքացում)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` արտահանումներ

## Մեկ գրողի տոպոլոգիա (HA-ն չի աջակցվում)

Վերը նշված դրայվերների պահուստային շղթան շարունակում է աշխատել **մեկ գործընթացում**։ Լռելյայն
SQLite-ով OmniRoute-ը **մեկ գրող** ունի.

- Մի միացրեք OmniRoute-ի երկու կրկնօրինակ նույն `storage.sqlite` ֆայլին։
- Կոնտեյների վերագործարկումը, Recreate տեղակայումը, OOM kill-ը կամ HEALTHCHECK վերագործարկումը դադարեցնում է
  ընթացքի մեջ գտնվող բոլոր SSE աշխատաշրջանները։ Ստանդարտ ուղու դեպքում աշխատաշրջանների սահուն ավարտ չկա։
- Համակարգողի կենսունակության ստուգումը, որը դանդաղ `/healthz`-ը համարում է անաշխատունակ, կդադարեցնի միակ
  կրկնօրինակը։ Նախընտրեք TCP կենսունակության ստուգում + HTTP `/healthz` պատրաստության ստուգում։ Տե՛ս
  [Docker ուղեցույց — հասանելիություն](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  և [Kubernetes-ի ստուգումների առաջարկություններ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)։
