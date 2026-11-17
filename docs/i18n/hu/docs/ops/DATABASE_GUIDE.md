# Database Schema & Operations Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: Az OmniRoute elsődleges adattárként **WAL naplózást használó SQLite-ot** alkalmaz, az érzékeny mezők nyugalmi állapotú titkosításához pedig **AES-256-GCM** titkosítást használ. Ez az útmutató az adatbázissémát, a migrációkat, a biztonsági mentést és helyreállítást, valamint az üzemeltetési eljárásokat ismerteti.

**Források:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 alaptábla)
- `src/lib/db/migrationRunner.ts` — verziózott migrációk
- `src/lib/db/migrations/` — 167 verziózott SQL-fájl
- `src/lib/db/encryption.ts` — titkosítási segédfüggvények
- `src/lib/db/backup.ts` — biztonsági mentések exportálása/importálása
- `src/lib/db/healthCheck.ts` — állapotdiagnosztika

---

## Miért SQLite?

Az OmniRoute több okból választotta a SQLite-ot a PostgreSQL/MySQL helyett:

| Szempont               | SQLite                                      | PostgreSQL                                  |
| ---------------------- | ------------------------------------------- | ------------------------------------------- |
| **Telepítés**          | Beágyazott — nem igényel külön kiszolgálót  | Kiszolgáló beállítását igényli              |
| **Titkosítás**         | Alkalmazási rétegben (AES-256-GCM)          | Beépített TDE                               |
| **Teljesítmény**       | Gyorsabb kis/közepes terhelés esetén        | Jobb nagy mennyiségű párhuzamos írás esetén |
| **Párhuzamosság**      | A WAL mód párhuzamos olvasást tesz lehetővé | Teljes MVCC                                 |
| **Biztonsági mentés**  | Egyetlen fájl másolása                      | `pg_dump` vagy fájlrendszer-pillanatkép     |
| **Felhasználási eset** | Felhasználónkénti telepítés, beágyazott     | Több-bérlős SaaS                            |

Az **egyfelhasználós, egypéldányos** telepítésekhez (az OmniRoute elsődleges felhasználási módjához) a SQLite egyszerűbb és gyorsabb.

### WAL-naplózás

A `core.ts` **WAL (Write-Ahead Logging) módban** nyitja meg az adatbázist:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

A WAL írás közben is lehetővé teszi a **párhuzamos olvasást** — ez fontos az irányítópult számára, amely lekérdezéseket hajt végre a kérések rögzítése közben.

Az alapértelmezett gyorsítótárméret **65 536 KiB (64 MiB)**. A SQLite a negatív
`cache_size` értéket megközelítő felső korlátként értelmezi KiB-ban, és igény szerint foglal le lapokat.
A **Beállítások > Rendszer és tárhely > Gyorsítótár mérete** mező **1 és
1 000 000 KiB** közötti egész értékeket fogad el; a beállítás mentése alkalmazza azt az élő adatbázis-kapcsolatra,
az OmniRoute pedig indításkor visszaállítja a megőrzött értéket.

---

## Az adatbázis helye

A SQLite-fájl tárolási helye:

| Operációs rendszer | Elérési út                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Linux              | `~/.omniroute/storage.sqlite`                                         |
| macOS              | `~/.omniroute/storage.sqlite`                                         |
| Windows            | `%USERPROFILE%\.omniroute\storage.sqlite`                             |
| Docker             | `/app/data/storage.sqlite` (a `DATA_DIR` segítségével konfigurálható) |

Kapcsolódó fájlok:

- `storage.sqlite-wal` — előreírási napló
- `storage.sqlite-shm` — megosztottmemória-fájl
- `call_logs/` — kérések hasznos adatait tartalmazó melléktermékek (ha engedélyezve van)

**A hely felülbírálása:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Tartományi modularchitektúra

Az OmniRoute adatbázisa **110 legfelső szintű TypeScript-modult** tartalmaz a `src/lib/db/` könyvtárban. Minden tartományi modul:

- Egy vagy több konkrét táblát kezel
- Típusbiztos CRUD-függvényeket exportál
- Soha nem fér hozzá más modulok tábláihoz
- A `core.ts` fájlból származó `getDbInstance()` függvényt használja az adatbázis eléréséhez

### A 110 legfelső szintű adatbázismodul

Az OmniRoute **110 legfelső szintű TypeScript-fájlt** tartalmaz a `src/lib/db/` könyvtárban. Az alábbiakban az alapvető modulokból látható egy válogatás; a teljes lista a könyvtár tartalomjegyzékében található:

| Modul                   | Táblák                                                         | Felelősségi kör                                                                         |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Szolgáltatók regisztrációja és hitelesítő adatai OAuth/API-kulcs alapján                |
| `models.ts`             | `key_value` (modelladatok)                                     | Modelldefiníciók, képességek, árazás                                                    |
| `combos.ts`             | `combos`                                                       | Kombinált útválasztási konfigurációk és sorrend                                         |
| `apiKeys.ts`            | `api_keys`                                                     | API-kulcsok életciklusa, hatókörei és kvótakövetése                                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Rendszerkonfiguráció és megosztott kulcs-érték-tároló                                   |
| `backup.ts`             | —                                                              | Biztonsági mentések exportálási/importálási műveletei                                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxykonfigurációk és útválasztási szabályok                                            |
| `prompts.ts`            | `prompt_templates`                                             | Újrafelhasználható prompt-sablonok és verziókezelés                                     |
| `webhooks.ts`           | `webhooks`                                                     | Eseményvezérelt webhook-feliratkozások és naplók                                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Kérésenkénti auditnaplózás (opcionális, nagy adatmennyiségű)                            |
| `domainState.ts`        | `domain_*` (5 tábla)                                           | Tartományi keretek, áramkör-megszakítók, kizárások, tartalékláncok és költségelőzmények |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Engedélyezési listán szereplő API-kulcsok az MCP/A2A számára                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Korábbi kvótahasználat                                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellek hozzárendelése alapértelmezett kombinációkhoz                                  |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-specifikus állandó állapot                                                          |
| `encryption.ts`         | —                                                              | Segédfüggvények mezők titkosításához/visszafejtéséhez                                   |
| `readCache.ts`          | —                                                              | Memórián belüli gyorsítótár az olvasásintenzív műveletekhez                             |
| `secrets.ts`            | `key_value` (titkosított bejegyzések)                          | Titkosított bizalmasadat-tárolás                                                        |
| `stateReset.ts`         | —                                                              | Az adatbázis-állapot törlése/visszaállítása teszteléshez                                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Munkamenet-környezet az ügynökátadáshoz                                                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Használatkövetés                                                                        |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Tömörítési konfiguráció                                                                 |

### Modulhatárok

Alapvető architekturális szabály: **a modulok nem férnek hozzá közvetlenül egymás tábláihoz**. Egy másik modul adatainak használatához az adott modul függvényét kell importálni.

```ts
// ❌ HELYTELEN: közvetlen SQL-lekérdezés egy másik modulból
db.prepare("SELECT * FROM provider_connections").all();

// ✅ HELYES: a providers modul függvényének használata
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ezt a szabályt kódellenőrzéssel tartatják be — statikus ellenőrzés nincs, de a szabálysértéseket megjelölik.

---

## Alapséma (17 tábla)

A `core.ts` definiálja a 17 alaptáblát a `SCHEMA_SQL` változóban. Ezeket a `001_initial_schema.sql` migráció hozza létre, és ezek alkotják az alapvető sémát.

### Alaptáblák (a kezdeti migráció hozza létre)

| Tábla                      | Rendeltetés                                  | Fő oszlopok                                                             |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Szolgáltatói hitelesítő adatok (titkosítva)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Szolgáltatói csomópontok útválasztási adatai | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Általános kulcs-érték-tároló                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Útválasztási kombinációk definíciói          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-kulcsok az átjáróhoz                     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Adatbázis-metaadatok                         | `key`, `value`                                                          |
| `usage_history`            | Kéréshasználati rekordok                     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Kérések tartalma és válaszai                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxykérések naplói                          | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modell–szolgáltató tartalékláncok            | `model`, `chain`                                                        |
| `domain_budgets`           | Tartományonkénti költségkeretek              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Költségkeret-visszaállítási előzmények       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Tartományonkénti költségkövetés              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Tartományi sebességkorlátozás állapota       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Áramkör-megszakító állapota tartományonként  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM-válaszok gyorsítótára                    | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Korábbi kvótapillanatképek                   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### További táblák (későbbi migrációk adják hozzá)

A későbbi migrációk többek között az alábbi táblákat adják hozzá:

- `cli_tool_state` (011-es migráció) — a CLI-eszköz állapota
- `mcp_*` táblák — MCP-kiszolgálók auditálása
- `a2a_*` táblák — A2A-feladatok állapota
- `usage_*` táblák — használatkövetés
- `plugin_*` táblák — beépülőmodul-rendszer
- `skill_executions` — készség-végrehajtási előzmények
- `memory_*` táblák — memóriarendszer
- `compression_*` táblák — tömörítési rendszer
- `webhook_*` táblák — webhook-kézbesítési napló
- `acp_*` táblák — Agent Client Protocol
- `oneproxy_*` táblák — 1proxy piactér
- `proxy_assignments` — proxy-hatókörök hozzárendelései
- `detailed_call_artifacts` — hívásnapló-melléktermékek metaadatai
- `quota_alert_history` — kvótariasztások auditnaplója
- `command_code_auth_sessions` — Command Code OAuth-munkamenetek

A több mint 30 táblát tartalmazó teljes lista a `src/lib/db/migrations/` könyvtárban található.

---

## Migrációk

OmniRoute használ** verziójú, idempotens migrációk** a `src/lib/db/migrations/`. Minden áttelepítés egyetlen SQL fájl. Két elnevezési formátum létezik egymás mellett; a `_omniroute_migrations` ben rögzített verzió a numerikus előtag.

### Migrációs elnevezés

| Formátum                                            | Példa                                | Használt                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (pontosan 3 számjegy)         | `241_seen_models.sql`                | A régi sorozat `001`–`241`. Lefagyott, amikor az időbélyeg formátuma leszállt (`240` és `241` közvetlenül előtte egyesült): egyetlen új fájl sem kap sorszámot. |
| `YYYYMMDDHHMMSS_description.sql` (14 számjegy, UTC) | `20261113120000_add_usage_index.sql` | Minden 2026-11-13 óta létrehozott migráció.                                                                                                                     |

Miért a változás? Sorozatszámok esetén a párhuzamos PRs ugyanazt a következő számot választotta, és egy kivételével mindegyiket újra kellett számozni, mielőtt egyesítette volna. A UTC időbélyeg minden PR megadja a saját verzióját.

Az időbélyeg formátumának szabályai ( `npm run check:migration-numbering` által kényszerítve, megosztva a generátorral `scripts/check/lib/migrationNaming.mjs` ben):

- Az időbélyeg egy valódi UTC dátum és idő, nem korábban, mint `20261113000000` és legfeljebb 10 perccel a jövőben.
- A leírás kisbetűs `snake_case` betűvel kezdődően (`a-z`, `0-9`, egyetlen `_` a szavak között), legfeljebb 80 karakter.
- Két azonos időbélyeggel rendelkező fájl duplikált.
- A hézagmentesség szabály csak a régi sorozatokra vonatkozik: `001` tól `241` minden számnak léteznie kell, kivéve a `026`, `055` és `121` ismert réseket. `241` (vagy bármely régi fájl) törlése meghiúsítja a kaput. `001` és `241` soha nem adható hozzá a `KNOWN_GAPS` engedélyezési listához. Az időbélyegzett fájlok soha nem hoznak létre hézagot.
- `src/lib/db/migrations/` minden bejegyzésének normál fájlnak kell lennie érvényes kisbetűs `.sql` névvel. Egy könyvtár, egy szimbolikus hivatkozás, egy `.SQL` vagy `.sql.bak` fájl, egy rejtett fájl vagy egy szóközt tartalmazó név tönkreteszi a kaput, mert a futó csendben kihagyja, vagy rendszerindításkor összeomlik.

**Rendelés alkalmazása.** A futtató az előtag numerikus értéke szerint rendez, nem szöveg szerint: először a régi `001`–`241` fájlok, majd az időbélyegzett fájlok időbélyegző sorrendben, majd a `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` -vel regisztrált névteres könyvtárak (olyan verziók, mint `ee-001`). Függőben lévő áttelepítés minden olyan fájl, amelynek verziója nem `_omniroute_migrations` formátumban van, így a régebbi ágból származó áttelepítés, amely egy újabb után egyesül, továbbra is érvényes a meglévő adatbázisokra.

**Az időbélyeg a létrehozási sorrend, nem az összevonási sorrend.** Ha az áttelepítés egy olyan táblától vagy oszloptól függ, amelyet az a** újabb** időbélyegző (például egy másik PR ból, amely először egyesült), egy friss adatbázis először a tiéd fut, és meghiúsul. Amíg PR még nyitva van, állítsa újra a fájlnevet `npm run db:new-migration` -vel, hogy újabb időbélyeget kapjon, vagy tegye függetlenné. `npm run test:migrations:fresh` minden migrációt egy üres adatbázisra alkalmaz, és ezt elkapja.

### Az egyesített migrációt soha nem törölték vagy nevezik át

Ha egy áttelepítési fájl egy kiadási ágon vagy `main` van, már futott homológ- és fejlesztői adatbázisokon, VPS telepítéseken és a vállalati szinkronizálásban. Onnantól kezdve:

- **Soha ne törölje.** A friss telepítések elveszítenék a sémáját, míg a frissített adatbázisok megtartják.
- **Soha ne nevezd át.** A `_omniroute_migrations` -ban lévő verzió már nem egyezne egy fájllal, így minden adatbázis, amely már alkalmazta, újra futtatná. A nem idempotens SQL ezután megkettőzi az adatokat, vagy leállítja a rendszerindítást.
- **Más sémára van szüksége?** Hozzon létre egy új migrációt `npm run db:new-migration` segítségével.

Az átnevezés csak olyan fájl esetén biztonságos, amely még nincs összevonva, erre utalnak a kapu tippjei. A kiadási címke itt semmit sem változtat: minden egyes `release/v*` ágnak történő leküldés közzéteszi a Docker `:next` képfájlt, és homologon, VPS telepítéseken és Enterprise sync-en fut, így az egyesített migráció valós adatbázisokon futott, mielőtt bármilyen `vX.Y.Z` címke létezett volna. A kapu meghiúsítja az alapfájl minden eltávolítását, akár címkézett, akár nem.

- **Egyesített áttelepítés visszaállítása.** A fájlt törlő `git revert` meghibásodik a kapun. Tartsa meg a fájlt, és vonja vissza a sémáját egy új áttelepítésben: `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` és így tovább. A frissített és friss adatbázisok ezután ugyanazzal a sémával végződnek.
- **Az egyetlen elfogadott átnevezés: kompatibilitási bejegyzés és azonos tartalom.** Ha egy egyesített fájlnak el kell költöznie (például két egyesített fájlnak van egy időbélyegzője, és a futó verzióütközéssel áll le), nevezze át a későbbi fájlt anélkül, hogy megérintené SQL ját, és adja hozzá `{ fromVersion, fromName, toVersion, toName }` `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts`-ben. A régi verziót alkalmazó adatbázisok `_omniroute_migrations` sorát áthelyezik ahelyett, hogy újra futtatnák a fájlt. A gate figyelmeztet az ilyen átnevezésre, és mindig lefuttatja rajta a kommutációs ellenőrzést, bármilyen legyen is az új időbélyeg: a friss telepítések az új helyen alkalmazzák a fájlt, a frissített adatbázisok nem, ezért válassz egy új időbélyeget a régi közelében. A kapu nem tudja átnevezni, ha a tartalom megváltozott (a sémamódosítás továbbra is megtörténik az új áttelepítés során), vagy ha a bejegyzés célfájlja nincs a lemezen.
- **Soha ne nevezze át ugyanazon az időbélyegzőn belül.** Az időbélyegzőt őrző és csak a leírást módosító átnevezés meghiúsítja a kaput, akár bejegyzéssel, akár anélkül. Egy olyan bejegyzésnél, amelynek `toVersion` megegyezik `fromVersion`, a futó törli a régi `_omniroute_migrations` sort, és újra alkalmazza a fájlt minden adatbázisban, amelyen már futott. Bejegyzés nélkül a futtató csak a verziót követi nyomon: kihagyja a fájlt azokban az adatbázisokban (az új tartalom ott soha nem fut), és minden rendszerindításkor naplóz egy újraszámozási hibát. Használjon másik időbélyeget és egy kompatibilitási bejegyzést, vagy tartsa meg a nevet.
- **A kapu ellenőrzi, hogy az átnevezett fájl nem fut-e újra.** Minden lefedett átnevezésnél a kapu átadja az új fájlnevet a kommutációs ellenőrzésnek `--must-not-apply` segítségével. Az ellenőrzés elindítja a frissített adatbázist a valódi futtatóval, és ha a futtató újra alkalmazza a fájlt (például azért, mert a bejegyzésnek rossz a verziója vagy a neve, vagy mert a kapu szövegelemzője `constants.ts` eltérően olvassa be TypeScript től), a kapu meghiúsul `migration renomeada rodaria de novo` vel, és kéri, hogy ellenőrizze a bejegyzés régi és új verzióit és nevét.

### Amit a kapu ellenőrzi a bázissal szemben

Lehívási kérés és egyesítési sor futtatásakor `npm run check:migration-numbering` összehasonlítja a lemezen lévő `src/lib/db/migrations/` az alapág azonos könyvtárával. Az alap a következő sorrendben: `--base-latest-tag`, `--base <ref>`, a `MIGRATION_BASE_REF` változó, vagy ha `GITHUB_EVENT_NAME` értéke `pull_request`, `pull_request_target` vagy `merge_group`, az összevonási véglegesítés első szülője, az esemény hasznos terhelésének `merge_group.base_sha` vagy `git merge-base HEAD origin/$GITHUB_BASE_REF`. Feloldható bázis nélküli lehívási kérelem vagy összevonási sor futtatásakor a kapu meghibásodik. CI kívül `--base` nélkül kiírja `comparação com a base: pulada (sem --base)`, és kihagyja ezeket a szabályokat.

`--base-latest-tag` összehasonlítja a legújabb kiadású címkével (`vX.Y.Z` féloldali sorrendben; az utótagú címkék, például az éjszakai nadrágok nem számítanak), amely `HEAD` történetében szerepel, ugyanazokkal a szabályokkal, mint `--base`. A Release-Green (`scripts/quality/validate-release-green.mjs`) így futtatja a kaput, mert a push és ütemezett futtatásoknak nincs lekérési bázisuk, és az összevonás friss CI futás nélkül is leszállhat. Ha nincs kiadási címke az előzményekben, a kapu meghibásodik; futtassa `git fetch --tags` ( CI ban `actions/checkout` és `fetch-depth: 0` hozza a címkéket).

| Változás a lehívási kérelemben                                                                                          | Eredmény                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Az alapon létező fájlt átnevezzük egy `RENAMED_MIGRATION_COMPATIBILITY` bejegyzéssel                                    | **Figyelmeztetés** ha a tartalom azonos, és a kommutációs ellenőrzés az új időbélyegtől függetlenül fut; ez meghiúsul, ha az új pozíció megváltoztatja a végső sémát (visszavonja az átnevezést, vagy kiválaszt egy másik új időbélyeget, ahol ingázik), vagy ha a futtató újra alkalmazza az átnevezett fájlt egy frissített adatbázison.** Sikertelen** ha a tartalom megváltozott. |
| Az alapon létező fájlt átnevezzük az időbélyeg megtartásával (csak a leírás változik)                                   | **Sikertelen** , bejegyzéssel vagy anélkül: a futó újra alkalmazná (a bejegyzéssel), vagy verziónként kihagyná (egy nélkül). Használjon másik időbélyeget és egy kompatibilitási bejegyzést, vagy tartsa meg a nevet.                                                                                                                                                                 |
| A bázison létező fájl törlődik, vagy bejegyzés nélkül átnevezi                                                          | **Sikertelen** , függetlenül attól, hogy a fájl egy kiadási címkében van-e vagy sem. A visszavonáshoz állítsa vissza a fájlt a `git checkout <base> -- src/lib/db/migrations/<file>`; a séma visszaállításához adjon hozzá egy új áttelepítést `DROP ... IF EXISTS` segítségével.                                                                                                     |
| A bázison létező fájl eltérő tartalommal rendelkezik                                                                    | **Figyelmeztetés** (a `::warning` megjegyzés GitHub Actions-ben), és a kommutációs ellenőrzés lefut. Sikertelen, ha a szerkesztés megváltoztatja a végső sémát, mert a frissített adatbázisok nem alkalmazzák újra a szerkesztett fájlt: tegye a módosítást egy új áttelepítésbe. Az ártalmatlan szerkesztés (egy megjegyzés, `IF NOT EXISTS`) csak figyelmeztet.                     |
| Az időbélyegzett fájl nem újabb időbélyeggel kerül hozzáadásra, mint az alap legújabb verziója                          | Lefuttatja az alább leírt kommutációs ellenőrzést.                                                                                                                                                                                                                                                                                                                                    |
| A rendszer hozzáad egy régi formátumú `NNN_` fájlt egy számmal az alap legújabb, régi formátumú fájlja alá              | **Sikertelen** , akkor is, ha `KNOWN_GAPS` ugyanabban a lehívási kérelemben van szerkesztve: a régi sorozat lefagyott, hozza létre a migrációt `npm run db:new-migration`-vel. A régi formátumú fájlok az alap legújabb fájlja felett (a `release/v*` től `main` tartó lekérési kérés) elfogadhatók.                                                                                  |
| Egy nem megfelelő, szerkesztett vagy átnevezett fájl `INSERT`, `UPDATE`, `DELETE` vagy `REPLACE` utasításokat tartalmaz | **Figyelmeztetés** : a kommutációs ellenőrzés nem hasonlítja össze az adatokat, ezért ellenőrizze, hogy a frissített és friss adatbázisok alkalmazásának sorrendje megváltoztatja-e az eredményt.                                                                                                                                                                                     |

A kommutáció-ellenőrzés egy futtatása egyszerre fedi le az elromlott, a szerkesztett és az átnevezett fájlokat.

A kommutációs ellenőrzés (`scripts/check/migration-commutation.ts`) két ideiglenes adatbázist épít fel a valós telepítési útvonallal: an** frissítve** egy (indítás az alap áttelepítésekkel, majd újraindítás ugyanarról a fájlról a lekérési kérés költöztetésével) és egy** friss** one (egy rendszerindítás a lekérési kérelem migrációjával). Összehasonlítja a kapott sémákat: táblák és oszlopok (az oszlopsorrend figyelmen kívül hagyásával), UNIQUE / PRIMARY KEY és FOREIGN KEY megszorítások, az egyes táblák normalizált `CREATE TABLE` szövege (amely lefedi CHECK megszorításokat, leválogatásokat, generált oszlopokat és táblázatbeállításokat), indexek, triggerek és nézetek. A soradatok nem kerülnek összehasonlításra. Ha egyeznek, a kapu kiírja, hogy a fájl nem működik, de ingázik, és átmegy. Ha eltérnek, a kapu meghibásodik a különbséggel, és egy tippet az esetre: egy soron kívüli fájl esetén generálja újra a nevét `npm run db:new-migration`-val, ami biztonságos, mert a fájl még nincs egyesítve; szerkesztett alapfájl esetén állítsa vissza az alaptartalmat, és helyezze át a módosítást egy új áttelepítésbe; átnevezett fájl esetén vonja vissza az átnevezést, vagy válasszon másik új időbélyeget, ahol az ingázik, soha ne használja ugyanazt az időbélyeget egy másik névvel. Ha maga az ellenőrzés nem fut le, a kapu meghiúsul CI ban, és csak helyileg figyelmeztet. Szerkesztett alapfájl esetén a frissített adatbázis az adott fájl alap tartalmával épül fel, és a második rendszerindítás kihagyja, mert a verziója már rögzítve van. Átnevezett fájl esetén a frissített adatbázis a fájl régi nevén épül fel, és a második rendszerindító `_omniroute_migrations` sorát a kompatibilitási bejegyzésen keresztül mozgatja ahelyett, hogy újra futtatná; a kapu átadja az új nevet `--must-not-apply`-lel, így az ellenőrzés sikertelen, ha a második rendszerindítás alkalmazza. Ha a lekérési kérés áttelepítése nem érvényesül a frissített útvonalon, azaz minden alap áttelepítés után (függetlenül attól, hogy az új telepítésnél is meghiúsul, vagy sem), a kapu jelenti `migration do PR não aplica`, és kéri, hogy javítsa ki a SQL az alap jelenlegi sémájához képest; ha a fájl egy másik lekérési kérés áttelepítésétől függ egy későbbi időbélyeggel, állítsa újra a nevét `npm run db:new-migration`-val.

Ugyanennek az összehasonlításnak a helyben történő futtatásához adja át kifejezetten az alapot, például `npm run check:migration-numbering -- --base origin/<base-branch>` vagy `npm run check:migration-numbering -- --base-latest-tag`, hogy összehasonlítsa a legújabb kiadással.

### Nyílt PR `NNN` migráció konvertálása

A váltás előtt megnyitott lekérési kérelem továbbra is tartalmazhat egy szekvenciális fájlt, például `242_add_widgets.sql`. `241` feletti régi számokat a rendszer elutasítja, ezért egyesítés előtt konvertálja át:

1. **Nevezze át a fájlt a generátorral, megtartva a leírást.** Futtassa `npm run db:new-migration -- <same description>` az új név megszerzéséhez, helyezze át a SQL bele, és törölje a régi `NNN_` fájlt. A leírásnak azonosnak kell lennie: az alábbi kompatibilitási bejegyzés megegyezik rajta.
2. **Adjon hozzá egy kompatibilitási bejegyzést, ha egy állandó adatbázis a régi számot futtatta.** Ha bármelyik tárolt adatbázis (homolog, egy VPS, egy közreműködő saját telepítése) lefuttatta a PR buildjét a `NNN_` fájllal, adja hozzá `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts` ben. Ez van** szükséges `237` és `241` között** : ezek a slotok most a kanonikus `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` és `241_seen_models.sql` tartalmazzák, és a bejegyzés nélkül egy ilyen adatbázis örökre kihagyja a kanonikus migrációt, és újra futtatja a konvertált. Üresen maradó helyek esetén is működik, mint például `242`, amikor a cél egy időbélyeg. Ha kétségei vannak, adja hozzá a bejegyzést. Nem számít, hogy a tömbben hol adja hozzá: ha egy bejegyzés célhelye még mindig tartalmaz egy sort, amelytől egy másik bejegyzés távolodik (például `237` egy PR sort tart, míg egy régebbi `usage_history_calculated_cost` sor arra vár, hogy `237` be kerüljön), a futó hagyja, hogy a bejegyzés megvárja, amíg a hely szabaddá válik. Csak egy valódi ütközés, például egy sor, amelynél nincs bejegyzés, vagy két bejegyzés, amely helyek cserél, állítja le a rendszerindítást `Cannot reconcile ...`-val.
3. **Tartsa a SQL idempotenst** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), mert a konvertált migráció találkozhat olyan adatbázissal, ahol a séma már létezik.
4. **Verziókulcsos speciális esetek áthelyezése.** Ha a PR kis- és nagybetűt adott hozzá a régi számhoz `isSchemaAlreadyApplied()` ben (`src/lib/db/migrationRunner.ts`) vagy `OPTIONAL_FTS5_MIGRATION_VERSIONS` ben (`src/lib/db/migrationRunner/constants.ts`), módosítsa a kulcsot az új időbélyegzőre.

`tests/unit/db/codex-fence-migration-rename.test.ts` egy működő példa egy átnevezett migráció tesztjére.

### Visszaportálás a váltás előtti ágakba

Soha ne válasszunk `YYYYMMDDHHMMSS_` fájlt egy olyan ágba, amely a váltás előtti ágra (például egy régebbi `release/v*` ágra) kerülne. Az ottani futó a fájlneveket szövegként rendezi, így egy időbélyegzett fájl `201_` és `202_` között futna egy friss adatbázison, és az ottani régi kapu nem érti a 14 számjegyű előtagokat. Egy ilyen ágra írja be a változást az adott ág saját következő `NNN_` fájljaként, idempotent, így ez egy no-op, amikor az időbélyegzett verzió később érkezik.

### Hogyan futnak a migrációk

Indításkor `migrationRunner.ts`:

1. Ha nem létezik, `_omniroute_migrations` táblát hoz létre
2. Lekérdezések a már alkalmazott migrációkhoz
3. Sorrendben alkalmazza az új migrációkat, mindegyiket egy tranzakcióban
4. Minden alkalmazott migrációt időbélyeggel rögzít

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotencia

A migrációnak lennie kell** idempotens** — kétszeri futtatása no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Bőségesen használja `IF NOT EXISTS`, `IF EXISTS` és `OR IGNORE` / `OR REPLACE` tagmondatokat.

### Új migráció hozzáadása

1. **Hozd létre a fájlt a generátorral** : `npm run db:new-migration -- <description>` (például `npm run db:new-migration -- add combo priority`). `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` az aktuális UTC idővel és egy megjegyzés fejléccel írja, egy másodpercet előrelép, ha ezt az időbélyeget veszi, és soha nem ír felül fájlt. Ne válasszon számot kézzel.
2. **Használjon biztonságos DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Gondosan töltse ki az adatokat** : használja `UPDATE ... WHERE ...` a meglévő sorok kezelésére
4. **Ellenőrizze a sorrendet és az elnevezést** : `npm run test:migrations:fresh` (minden migráció üres adatbázison) és `npm run check:migration-numbering`
5. **Teszt egy másolaton** : soha ne futtasson teszteletlen migrációt éles környezetben

Példa:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Visszafelé nem kompatibilis változtatások** (pl. oszlopok ledobása) trükkösek. OmniRoute támogatja-e NOT — visszaminősítését az áttelepítés után, a sémaváltás végleges. Ennek megfelelően tervezzen.

---

## Tárolt adatok titkosítása

Az érzékeny mezőket (API-kulcsok, OAuth-tokenek, kapcsolati karakterláncok) **AES-256-GCM** használatával, titkosítva tárolja a rendszer.

### Működése

```ts
// src/lib/db/encryption.ts (egyszerűsített)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Felhasználási helyei

- `provider_connections.api_key` — alkalmazásszinten titkosítva
- `provider_connections.access_token`, `refresh_token`, `id_token` — alkalmazásszinten titkosítva
- A `key_value` azon bejegyzései, amelyeknél `namespace = "secrets"` — alkalmazásszinten titkosítva
- `proxy_registry.auth` — alkalmazásszinten titkosítva (ha jelen van)

### Titkosítási kulcs

A titkosítási kulcs egy **jelmondatból** (amely a `STORAGE_ENCRYPTION_KEY` környezeti változóval állítható be) és egy **sóból** (amelyet az adatbázis tárol) származik. Az adatok visszafejtéséhez mindkettő szükséges.

```bash
# Biztonságos jelmondat létrehozása
openssl rand -hex 32

# Beállítás az .env fájlban
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritikus fontosságú**: A titkosítási kulcs elvesztése az összes titkosított adathoz való hozzáférés elvesztését jelenti. **A kulcsról az adatbázistól elkülönítve készítsen biztonsági másolatot**.

### Mi NINCS titkosítva

Teljesítménybeli okokból a következő adatok egyszerű szövegként vannak tárolva:

- Szolgáltatók megjelenítési nevei
- Modelldefiníciók (ezek már nyilvánosak)
- Útválasztási szabályok
- Használati rekordok (nem tartalmaznak személyazonosításra alkalmas adatokat)

---

## Titkosítási tudnivalók (v3.8.16+)

Az OmniRoute a **`migrateLegacyEncryptedString()`** függvényt használja két titkosítási séma átlátható kezelésére:

- **Korábbi** (v3.5.0 előtti): XOR-alapú „titkosítás” (nem valódi kriptográfia)
- **Jelenlegi**: AES-256-GCM megfelelő IV-vel és hitelesítési címkével

A migrációs segédfüggvény felismeri a korábbi formátumot, és az első olvasáskor újratitkosítja az adatokat az új sémával. Ez azt jelenti, hogy a hitelesítő adatok elvesztése nélkül frissíthet egy régi adatbázist.

---

## Olvasási gyorsítótár

A gyakran olvasott adatokhoz (modellek, szolgáltatók, beállítások) a `readCache.ts` egy **memórián belüli gyorsítótárat** biztosít:

```ts
// Indításkor gyorsítótárazva, íráskor érvénytelenítve
const providers = await getCachedProviders(); // Gyors, memórián belüli
const fresh = await listProviders(); // Lassú, hozzáfér az adatbázishoz
```

| Gyorsítótárazott entitás | Gyorsítótárkulcs | TTL              |
| ------------------------ | ---------------- | ---------------- |
| `models`                 | `models:v1`      | Következő írásig |
| `provider_connections`   | `providers:v1`   | Következő írásig |
| `settings`               | `settings:v1`    | Következő írásig |
| `combos`                 | `combos:v1`      | Következő írásig |

A gyorsítótár a megfelelő táblába történő minden íráskor érvénytelenítésre kerül.

---

## Biztonsági mentés és helyreállítás

### Manuális biztonsági mentés

```bash
# Helyi biztonsági mentés létrehozása a CLI használatával
omniroute backup create --name pre-migration

# Vagy az API-n keresztül
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

A biztonsági mentési fájl a következőket tartalmazza:

- Az összes adatbázistáblát (JSON formátumba szerializálva)
- A hívásnapló összetevőit (base64-kódolással, opcionálisan)
- Beállításokat és titkos adatokat (titkosítva)
- A bővítmények konfigurációját

### Helyreállítás

```bash
# CLI-n keresztül
omniroute restore pre-migration

# API-n keresztül
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Figyelmeztetés**: A helyreállítás a teljes adatbázist felülírja. Először állítsa le az összes klienst.

### Automatizált biztonsági mentések

```bash
# Automatizált napi biztonsági mentések engedélyezése a CLI-n keresztül
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Az ütemezést szerveroldalon egy háttérfeladat hajtja végre, amely 30 másodpercenként fut le
(alapértelmezés szerint), és a cron-kifejezést a szerver helyi ideje alapján értékeli ki.

| Változó                                     | Alapértelmezett érték | Leírás                                                                                                                                                 |
| ------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`               | Futási időköz ezredmásodpercben (min. `5000`). A cron-feltételnek megfelelő percen belüli megbízható futáshoz 60 másodpercnél rövidebbnek kell lennie. |

### SQLite működés közbeni biztonsági mentés

Egy aktív adatbázis leállás nélküli biztonsági mentéséhez:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ez az SQLite online biztonsági mentési API-ját használja — biztonságosan futtatható az OmniRoute működése közben.

## Teljesítmény hangolás

### WAL mód

WAL alapértelmezés szerint engedélyezve van. Nagy írási terhelés esetén vegye figyelembe:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute nem állítja be `journal_size_limit`. Egy ellenőrzőpont áthelyezi WAL kereteket a főfájlba, de a WAL fájl megtartja a legnagyobb lefoglalt méretét. A `OMNIROUTE_WAL_GUARD_MAX_MB` őr csak figyelmeztet és fut `wal_checkpoint(RESTART)`; ez nem lemez méretű kupak.

### Indexek

A teljesítmény kulcsfontosságú indexei (áttelepítéssel automatikusan létrehozva):

- `idx_models_provider` — modell keresések szolgáltató szerint
- `idx_combo_targets_combo_id` — kombinált célbővítés
- `idx_usage_history_api_key_timestamp` — használati elemzés
- `idx_quota_snapshots_api_key_window` — kvótakövetés
- `idx_call_logs_timestamp` — hívásnapló lekérdezések

Új index hozzáadásához hozzon létre egy áttelepítést:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memóriaképes I/O

Nagyon nagy adatbázisok esetén (> 10GB) a memórialeképezés SQLite pragma segítségével állítható be:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Tömörítés

A régóta futó OmniRoute példányok előnyösek az alkalmi `VACUUM` ből:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Futtassa havonta az alacsony forgalmú ablakok alatt. (WAL mód csökkenti a szükségességet, de nem szünteti meg.)

---

## Állapotellenőrzés

A `src/lib/db/healthCheck.ts` **adatbázisszintű állapotdiagnosztikát** biztosít:

Mindkét HTTP-metódus hitelesítést igényel (ellenkező esetben `401`). A `GET` csak diagnosztikát végez; a `POST` ugyanezt az ellenőrzést futtatja engedélyezett `autoRepair` beállítással.

```bash
GET  /api/db/health   # diagnosztika
POST /api/db/health   # diagnosztika + javítás
```

A válasz a `runDbHealthCheck()` által létrehozott `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "A tartományi költségkeretek már nem létező API-kulcsokra hivatkoztak.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Mező              | Jelentés                                                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Értéke `true`, ha az `issues` üres. A `driver` soha nem befolyásolja.                                                                                                                         |
| `issues[].type`   | Az `integrity_check_failed`, `broken_reference`, `stale_snapshot` vagy `invalid_state` értékek egyike.                                                                                        |
| `repairedCount`   | Az aktuális futtatás során kijavított sorok száma; mindig `0`, ha az `autoRepair` értéke hamis.                                                                                               |
| `backupCreated`   | Jelzi, hogy készült-e biztonsági mentés a javítás előtt.                                                                                                                                      |
| `checkedAt`       | A futtatás és az általa írt esetleges javítási megjegyzés közös ISO-időbélyege.                                                                                                               |
| `driver.name`     | Az ellenőrzött adatbázist kiszolgáló SQLite-illesztőprogram.                                                                                                                                  |
| `driver.degraded` | Értéke `true`, ha az írásokat nem támasztja alá tartósan az adatbázisfájl — ilyen a `sql.js` WASM tartalékmegoldás (teljes fájlos perzisztencia) vagy egy memóriában tárolt adatbázis esetén. |

Ugyanezt az adatszerkezetet adja vissza az `omniroute_db_health_check` MCP-eszköz.

A sérülések észleléséhez futtassa a `PRAGMA integrity_check` parancsot:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ezt kell kiírnia: ok
```

Ha az `ok` értéktől eltérő eredményt ad vissza, **azonnal hagyja abba az adatbázis használatát**, és állítsa vissza egy biztonsági mentésből.

---

## Katasztrófa utáni helyreállítás

### 1. forgatókönyv: A WAL-fájl elveszett

A `-wal` fájl hiányzik, de a `-shm` fájl és a fő adatbázis sértetlen:

```bash
# A következő megnyitáskor automatikusan helyreáll
omniroute
```

Ha az SQLite nem tudja automatikusan helyreállítani:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2. forgatókönyv: A fő adatbázisfájl megsérült

Állítsa helyre biztonsági mentésből:

```bash
omniroute backup restore <backup-id>
```

Az `omniroute sync pull [outPath]` csak egy teljes `.tar.gz` archívumot tölt le egy futó szerverről
(`GET /api/db-backups/exportAll`, operátori hitelesítő adatok szükségesek); nem állít helyre semmit.

### 3. forgatókönyv: A titkosítási kulcs elveszett

A kulcs nélkül **nem lehetséges a helyreállítás**. A titkosított mezők olvashatatlanok. Adja hozzá újra manuálisan az összes szolgáltatót új hitelesítő adatokkal.

> **Kockázatcsökkentés**: Mindig készítsen külön biztonsági mentést a titkosítási kulcsról, lehetőleg egy jelszókezelőben vagy KMS-ben.

### 4. forgatókönyv: Megtelt a lemez

Az SQLite `SQLITE_FULL` hibákat ad vissza. Szabadítson fel lemezterületet, majd futtassa a következőt:

```bash
# WAL-ellenőrzőpont létrehozása a lemezterület felszabadításához
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Gyakori műveletek

### Tábla megtekintése

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Sorok megszámlálása az összes táblában

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Az összes adat visszaállítása (törlése)

```bash
# Először állítsa le az OmniRoute-ot
omniroute stop

# Törölje az adatbázisfájlt
rm ~/.omniroute/storage.sqlite*

# Indítsa újra (új, üres adatbázist hoz létre)
omniroute
```

**Szelektív** visszaállításhoz (a szolgáltatók megtartása, a használati adatok törlése):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Egyetlen tábla exportálása

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Hibaelhárítás

### „Az adatbázis zárolva van”

Egy másik folyamat írási zárolást tart fenn. Lehetőségek:

- Várja meg, amíg a másik folyamat befejeződik (ellenőrzés: `lsof | grep storage.sqlite`)
- Állítsa le a másik folyamatot
- Ha a probléma továbbra is fennáll, indítsa újra az OmniRoute-ot

### „Az idegenkulcs-megkötés megsértése”

Egy tartománymodul megsérti a hivatkozási integritást. Ellenőrizze a következőket:

- Árván maradt sorok a függő táblákban
- Nem továbbterjedt kaszkádolt törlések
- Idegen kulcsot módosító közelmúltbeli migráció

A szabálysértések megkereséséhez futtassa a `PRAGMA foreign_key_check;` parancsot.

### „Nincs elegendő memória”

Az SQLite memóriába leképezett I/O-ja meghaladja az operációs rendszer korlátját. Csökkentse a méretet egy SQLite-pragma segítségével:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB a 256 MB helyett
```

Vagy tiltsa le:

```sql
PRAGMA mmap_size = 0;
```

### „A migráció menet közben meghiúsult”

A migráció tranzakcióban futott, ezért vissza kellett volna görgetni. Ha ez nem történt meg:

1. **Állítsa le az OmniRoute-ot** (akadályozza meg a további próbálkozásokat)
2. **Ellenőrizze az adatbázis állapotát** az `sqlite3` segítségével
3. **Javítsa manuálisan** a részleges migrációt
4. **Indítsa újra** az OmniRoute-ot (a rendszer újra megkísérli a migrációt)

Ennek megelőzéséhez a migrációkat először mindig egy másolaton tesztelje.

---

## Lásd még

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — használati táblák
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — állapotfigyelés
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — kiadási folyamat
- Forrás: `src/lib/db/` (több mint 80 fájl, ~25 ezer kódsor)
