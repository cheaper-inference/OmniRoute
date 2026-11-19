# Database Schema & Operations Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute používá jako primární úložiště **SQLite s žurnálováním WAL** a pro citlivá pole používá **AES-256-GCM** šifrování uložených dat. Tato příručka se zabývá schématem, migracemi, zálohováním/obnovou a provozními postupy.

**Zdroje:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 základních tabulek)
- `src/lib/db/migrationRunner.ts` — verzované migrace
- `src/lib/db/migrations/` — 167 verzovaných souborů SQL
- `src/lib/db/encryption.ts` — pomocné funkce pro šifrování
- `src/lib/db/backup.ts` — export/import záloh
- `src/lib/db/healthCheck.ts` — diagnostika stavu

---

## Proč SQLite?

OmniRoute zvolil SQLite namísto PostgreSQL/MySQL z několika důvodů:

| Faktor         | SQLite                                     | PostgreSQL                                    |
| -------------- | ------------------------------------------ | --------------------------------------------- |
| **Nasazení**   | Vestavěné — není potřeba samostatný server | Vyžaduje nastavení serveru                    |
| **Šifrování**  | Na aplikační vrstvě (AES-256-GCM)          | Vestavěné TDE                                 |
| **Výkon**      | Rychlejší pro malé/střední zátěže          | Lepší pro obrovské množství souběžných zápisů |
| **Souběžnost** | Režim WAL umožňuje souběžná čtení          | Plné MVCC                                     |
| **Zálohování** | Kopie jediného souboru                     | `pg_dump` nebo snímek souborového systému     |
| **Použití**    | Instalace pro jednoho uživatele, vestavěné | SaaS s více tenanty                           |

Pro nasazení s **jedním uživatelem a jednou instancí** (primární případ použití OmniRoute) je SQLite jednodušší a rychlejší.

### Žurnálování WAL

`core.ts` otevírá databázi v **režimu WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL umožňuje **souběžná čtení** během zápisů — což je důležité pro řídicí panel, který provádí dotazy během zaznamenávání požadavků.

Výchozí velikost mezipaměti je **65 536 KiB (64 MiB)**. SQLite interpretuje zápornou
hodnotu `cache_size` jako přibližnou horní mez v KiB a stránky přiděluje podle potřeby.
Nastavení **Nastavení > Systém a úložiště > Velikost mezipaměti** přijímá celočíselné hodnoty od **1 do
1 000 000 KiB**; uložením nastavení se hodnota použije pro aktivní databázové připojení
a OmniRoute při spuštění obnoví uloženou hodnotu.

---

## Umístění databáze

Soubor SQLite je uložen zde:

| OS      | Cesta                                                           |
| ------- | --------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                   |
| macOS   | `~/.omniroute/storage.sqlite`                                   |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                       |
| Docker  | `/app/data/storage.sqlite` (lze konfigurovat pomocí `DATA_DIR`) |

Doprovodné soubory:

- `storage.sqlite-wal` — žurnál zápisů s předstihem
- `storage.sqlite-shm` — soubor sdílené paměti
- `call_logs/` — artefakty dat požadavků (pokud jsou povoleny)

**Změna umístění:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektura doménových modulů

Databáze OmniRoute obsahuje **110 TypeScriptových modulů nejvyšší úrovně** v `src/lib/db/`. Každý doménový modul:

- Spravuje jednu nebo více konkrétních tabulek
- Exportuje typované funkce CRUD
- Nikdy nepřistupuje k tabulkám jiného modulu
- Používá `getDbInstance()` z `core.ts` pro přístup k databázi

### 110 databázových modulů nejvyšší úrovně

OmniRoute obsahuje **110 TypeScriptových souborů nejvyšší úrovně** v `src/lib/db/`. Níže je uveden výběr základních modulů; úplný seznam najdete ve výpisu adresáře:

| Modul                   | Tabulky                                                        | Odpovědnost                                                             |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrace poskytovatelů a přihlašovací údaje pomocí OAuth/API klíčů    |
| `models.ts`             | `key_value` (data modelů)                                      | Definice modelů, schopnosti, ceny                                       |
| `combos.ts`             | `combos`                                                       | Konfigurace a pořadí kombinovaného směrování                            |
| `apiKeys.ts`            | `api_keys`                                                     | Životní cyklus API klíčů, rozsahy oprávnění, sledování kvót             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurace systému a sdílené úložiště klíč–hodnota                     |
| `backup.ts`             | —                                                              | Operace exportu/importu záloh                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurace proxy serverů a pravidla směrování                          |
| `prompts.ts`            | `prompt_templates`                                             | Opakovaně použitelné šablony promptů, verzování                         |
| `webhooks.ts`           | `webhooks`                                                     | Odběry webhooků řízené událostmi a protokoly                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Auditní protokolování jednotlivých požadavků (volitelné, velký objem)   |
| `domainState.ts`        | `domain_*` (5 tabulek)                                         | Doménové rozpočty, jističe, uzamčení, záložní řetězce, historie nákladů |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API klíče na seznamu povolených klíčů pro MCP/A2A                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historické využití kvót                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapování modelů na výchozí kombinace                                    |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trvalý stav specifický pro CLI                                          |
| `encryption.ts`         | —                                                              | Pomocné funkce pro šifrování/dešifrování polí                           |
| `readCache.ts`          | —                                                              | Mezipaměť v paměti pro operace s častým čtením                          |
| `secrets.ts`            | `key_value` (šifrované záznamy)                                | Úložiště šifrovaných tajných údajů                                      |
| `stateReset.ts`         | —                                                              | Vymazání/resetování stavu databáze pro testování                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontext relace pro předání mezi agenty                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Sledování využití                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurace komprese                                                    |

### Hranice modulů

Základní architektonické pravidlo: **moduly nepřistupují přímo k tabulkám jiných modulů**. Chcete-li pracovat s daty jiného modulu, importujte funkci z daného modulu.

```ts
// ❌ ŠPATNĚ: přímý SQL dotaz z jiného modulu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ SPRÁVNĚ: použijte funkci modulu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Toto pravidlo je vynucováno kontrolou kódu — neexistuje žádná statická kontrola, ale porušení jsou označována.

---

## Základní schéma (17 tabulek)

Soubor `core.ts` definuje 17 základních tabulek v `SCHEMA_SQL`. Tyto tabulky jsou vytvořeny migrací `001_initial_schema.sql` a tvoří jádro schématu.

### Základní tabulky (vytvořené počáteční migrací)

| Tabulka                    | Účel                                         | Klíčové sloupce                                                         |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Přihlašovací údaje poskytovatele (šifrované) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informace o směrování uzlů poskytovatele     | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Obecné úložiště KV                           | `namespace`, `key`, `value`                                             |
| `combos`                   | Definice kombinací směrování                 | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Klíče API pro bránu                          | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata databáze                            | `key`, `value`                                                          |
| `usage_history`            | Záznamy o využití požadavků                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Datové části požadavků a odpovědi            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Protokoly požadavků proxy                    | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Řetězce směrování modelů na poskytovatele    | `model`, `chain`                                                        |
| `domain_budgets`           | Rozpočty výdajů pro jednotlivé domény        | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historie resetování rozpočtů                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Sledování nákladů jednotlivých domén         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stav omezení rychlosti domény                | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stav jističe pro jednotlivé domény           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Mezipaměť odpovědí LLM                       | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historické snímky kvót                       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Další tabulky (přidané pozdějšími migracemi)

Následné migrace přidávají tabulky, jako jsou:

- `cli_tool_state` (migrace 011) — stav nástroje CLI
- tabulky `mcp_*` — audit serveru MCP
- tabulky `a2a_*` — stav úloh A2A
- tabulky `usage_*` — sledování využití
- tabulky `plugin_*` — systém pluginů
- `skill_executions` — historie provádění dovedností
- tabulky `memory_*` — paměťový systém
- tabulky `compression_*` — kompresní systém
- tabulky `webhook_*` — protokol doručování webhooků
- tabulky `acp_*` — Agent Client Protocol
- tabulky `oneproxy_*` — tržiště 1proxy
- `proxy_assignments` — vazby rozsahu proxy
- `detailed_call_artifacts` — metadata artefaktů protokolu volání
- `quota_alert_history` — audit upozornění na kvóty
- `command_code_auth_sessions` — relace OAuth pro Command Code

Úplný seznam více než 30 tabulek se nachází v `src/lib/db/migrations/`.

---

## Migrace

OmniRoute používá** verzované, idempotentní migrace** v `src/lib/db/migrations/`. Každá migrace je jeden soubor SQL. Existují dva formáty pojmenování; verze zaznamenaná v `_omniroute_migrations` je číselná předpona.

### Pojmenování migrace

| Formát                                            | Příklad                              | Používá se pro                                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (přesně 3 číslice)          | `241_seen_models.sql`                | Stará řada `001`–`241`. Zmrazeno, když formát časového razítka přistál (`240` a `241` byly sloučeny těsně před ním): žádný nový soubor nedostane pořadové číslo. |
| `YYYYMMDDHHMMSS_description.sql` (14 číslic, UTC) | `20261113120000_add_usage_index.sql` | Každá migrace vytvořená od 2026-11-13 dále.                                                                                                                      |

Proč ta změna: u sekvenčních čísel paralelní PRs vybralo stejné další číslo a všichni kromě jednoho se museli před sloučením přečíslovat. Časové razítko UTC dává každému PR jeho vlastní verzi.

Pravidla pro formát časového razítka (vynucená `npm run check:migration-numbering`, sdílená s generátorem v `scripts/check/lib/migrationNaming.mjs`):

- Časové razítko je skutečné datum a čas UTC, ne dříve než `20261113000000` a ne více než 10 minut v budoucnosti.
- Popis je malými písmeny `snake_case` začínajícími písmenem (`a-z`, `0-9`, jedno `_` mezi slovy), maximálně 80 znaků.
- Dva soubory se stejným časovým razítkem jsou duplicitní.
- Pravidlo bez mezer platí pouze pro starou řadu: každé číslo od `001` do `241` musí existovat, kromě známých mezer `026`, `055` a `121`. Odstranění `241` (nebo jakéhokoli starého souboru) selže. `001` a `241` nelze nikdy přidat do seznamu povolených `KNOWN_GAPS`. Soubory s časovým razítkem nikdy nevytvářejí mezeru.
- Každý záznam v `src/lib/db/migrations/` musí být běžný soubor s platným názvem `.sql` malými písmeny. Adresář, symbolický odkaz, soubor `.SQL` nebo `.sql.bak`, skrytý soubor nebo název s mezerou selžou bránu, protože by je běžec tiše přeskočil nebo spadl při bootování.

**Použít objednávku.** Běžec třídí podle číselné hodnoty předpony, nikoli podle textu: nejprve staré soubory `001`–`241`, poté soubory s časovým razítkem v pořadí podle časových razítek a poté libovolné adresáře s prostorem názvů registrované u `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (verze jako `ee-001`). Nevyřízená migrace je jakýkoli soubor, jehož verze není v `_omniroute_migrations`, takže migrace ze starší větve, která se sloučí za novější, stále platí pro existující databáze.

**Časové razítko je pořadí vytvoření, nikoli pořadí sloučení.** Pokud vaše migrace závisí na tabulce nebo sloupci vytvořené migrací pomocí a** novější** časové razítko (například jeden z jiného PR, který se sloučil jako první), nová databáze by nejprve spustila vaši a selhala. Zatímco je váš PR stále otevřený, přegenerujte název souboru pomocí `npm run db:new-migration`, aby získal novější časové razítko, nebo jej udělejte nezávislým. `npm run test:migrations:fresh` aplikuje každou migraci na prázdnou databázi a zachytí ji.

### Sloučená migrace se nikdy neodstraní ani nepřejmenuje

Jakmile je soubor migrace ve větvi vydání nebo `main`, již běží na homologních a vývojářských databázích, na instalacích VPS a v podnikové synchronizaci. Od té doby:

- **Nikdy to nemažte.** Čerstvé instalace by ztratily své schéma, zatímco upgradované databáze si je ponechají.
- **Nikdy to nepřejmenovávejte.** Verze v `_omniroute_migrations` by již neodpovídala souboru, takže každá databáze, která ji již použila, by ji spustila znovu. Neidempotentní SQL pak duplikuje data nebo zastaví bootování.
- **Potřebujete jiné schéma?** Vytvořte novou migraci pomocí `npm run db:new-migration`.

Přejmenování je bezpečné pouze pro soubor, který ještě není sloučen, což je případ, na který odkazují rady brány. Značka vydání zde nic nemění: každý přesun do větve `release/v*` publikuje obraz Docker `:next` a běží na homologu, instalaci VPS a synchronizaci Enterprise, takže sloučená migrace proběhla na skutečných databázích dříve, než existuje jakákoli značka `vX.Y.Z`. Brána selže při každém odstranění základního souboru, ať už označeného nebo ne.

- **Vrácení sloučené migrace.** `git revert`, která odstraní soubor, selže bránu. Ponechte soubor a zrušte jeho schéma při nové migraci: `npm run db:new-migration -- <description>`, s `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` atd. Upgradované a čerstvé databáze pak končí stejným schématem.
- **Jedno přijaté přejmenování: záznam kompatibility a identický obsah.** Pokud se sloučený soubor musí přesunout (například dva sloučené soubory sdílejí časové razítko a běžec se zastaví s kolizí verzí), přejmenujte pozdější soubor, aniž byste se dotkli jeho SQL a přidejte `{ fromVersion, fromName, toVersion, toName }` k `RENAMED_MIGRATION_COMPATIBILITY` v `src/lib/db/migrationRunner/constants.ts`. Databáze, které aplikovaly starou verzi, místo opětovného spuštění souboru přesunou svůj řádek `_omniroute_migrations`. Brána na takové přejmenování upozorní a vždy na něm spustí kontrolu komutace bez ohledu na nové časové razítko: čerstvé instalace aplikují soubor na jeho novou pozici, upgradované databáze nikoli, takže vyberte nové časové razítko poblíž starého. Přejmenování brány se nezdaří, pokud se obsah změnil (změna schématu stále probíhá při nové migraci) nebo pokud cílový soubor položky není na disku.
- **Nikdy nepřejmenovávejte v rámci stejného časového razítka.** Přejmenování, které zachová časové razítko a změní pouze popis, neprojde bránou, se záznamem nebo bez něj. Se záznamem, jehož `toVersion` se rovná jeho `fromVersion`, běžec odstraní starý řádek `_omniroute_migrations` a použije soubor znovu na každou databázi, která jej již spustila. Bez zadání sleduje běžec pouze verzi: přeskočí soubor v těchto databázích (nový obsah se tam nikdy nespustí) a při každém spuštění zaznamená chybu přečíslování. Použijte jiné časové razítko a záznam kompatibility nebo ponechte název.
- **Brána zkontroluje, zda se přejmenovaný soubor znovu nespustí.** Pro každé zakryté přejmenování předá brána nový název souboru kontrole komutace pomocí `--must-not-apply`. Kontrola zavede upgradovanou databázi se skutečným běžcem, a pokud běžec znovu použije tento soubor (například proto, že záznam má špatnou verzi nebo jméno, nebo protože textový analyzátor brány četl `constants.ts` jinak než TypeScript), brána selže s `migration renomeada rodaria de novo` a požádá vás, abyste zkontrolovali staré a nové verze a názvy záznamu.

### Co brána kontroluje proti základně

Při požadavku na stažení a spuštění slučovací fronty `npm run check:migration-numbering` porovnává `src/lib/db/migrations/` na disku se stejným adresářem v základní větvi. Základem je v tomto pořadí: `--base-latest-tag`, `--base <ref>`, proměnná `MIGRATION_BASE_REF`, nebo, když `GITHUB_EVENT_NAME` je `pull_request`, `pull_request_target` nebo `merge_group`, první rodič slučovacího commitu, `merge_group.base_sha` datové části události nebo `git merge-base HEAD origin/$GITHUB_BASE_REF`. Při požadavku na stažení nebo při spuštění fronty sloučení bez řešitelného základu brána selže. Mimo CI bez `--base` vytiskne `comparação com a base: pulada (sem --base)` a tato pravidla přeskočí.

`--base-latest-tag` se porovnává s nejnovějším tagem vydání (`vX.Y.Z` v pořadí semver; tagy s příponou jako nightlies se nepočítají), který je v historii `HEAD`, se stejnými pravidly jako `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) spouští bránu tímto způsobem, protože push a plánované běhy nemají žádnou základnu požadavků na stažení a sloučení může dopadnout bez nového spuštění CI. Bez známek uvolnění v historii brána selže; spustit `git fetch --tags` (v CI, `actions/checkout` s `fetch-depth: 0` přinese značky).

| Změňte požadavek na stažení                                                                               | Výsledek                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Soubor, který existuje na základně, je přejmenován se záznamem `RENAMED_MIGRATION_COMPATIBILITY`          | **Varování** pokud je obsah identický a kontrola komutace probíhá bez ohledu na nové časové razítko; selže, pokud nová pozice změní konečné schéma (zruší přejmenování nebo vybere jiné nové časové razítko, kde dojíždí) nebo pokud by běžec znovu použil přejmenovaný soubor na upgradovanou databázi.** Selže** pokud se obsah změnil. |
| Soubor, který existuje na základně, se přejmenuje a zachová se jeho časové razítko (změní se pouze popis) | **Selže** , se záznamem nebo bez něj: běžec by jej použil znovu (se záznamem) nebo by jej přeskočil podle verze (bez záznamu). Použijte jiné časové razítko a záznam kompatibility nebo ponechte název.                                                                                                                                   |
| Soubor, který existuje na základně, je odstraněn nebo přejmenován bez záznamu                             | **Selže** , zda soubor je či není ve značce vydání. Chcete-li to vrátit zpět, obnovte soubor pomocí `git checkout <base> -- src/lib/db/migrations/<file>`; chcete-li vrátit jeho schéma, přidejte novou migraci pomocí `DROP ... IF EXISTS`.                                                                                              |
| Soubor, který existuje na základně, má jiný obsah                                                         | **Varování** (anotace `::warning` v akcích GitHub ) a spustí se kontrola komutace. Selže, pokud úprava změní konečné schéma, protože upgradované databáze znovu nepoužijí upravený soubor: vložte změnu do nové migrace. Neškodná úprava (komentář, `IF NOT EXISTS`) pouze varuje.                                                        |
| Je přidán soubor s časovým razítkem s časovým razítkem, který není novější než nejnovější na základně     | Spustí kontrolu komutace, popsanou níže.                                                                                                                                                                                                                                                                                                  |
| Je přidán soubor `NNN_` ve starém formátu s číslem pod nejnovějším souborem starého formátu základny      | **Selže** , i když je `KNOWN_GAPS` upraveno ve stejném požadavku na stažení: stará řada je zmrazena, vytvořte migraci pomocí `npm run db:new-migration`. Soubory starého formátu nad nejnovějším souborem základny (žádost o stažení `release/v*` na `main` ) jsou přijímány.                                                             |
| Nefunkční, upravený nebo přejmenovaný soubor obsahuje příkazy `INSERT`, `UPDATE`, `DELETE` nebo `REPLACE` | **Varování** : kontrola komutace neporovnává data, proto zkontrolujte, zda pořadí, ve kterém se použijí upgradované a nové databáze, nemění výsledek.                                                                                                                                                                                     |

Jedno spuštění kontroly komutace pokryje společně neuspořádané, upravené a přejmenované soubory.

Kontrola komutace (`scripts/check/migration-commutation.ts`) vytvoří dvě dočasné databáze se skutečnou instalační cestou: an** upgradován** jeden (zavést se základními migracemi a poté znovu spustit ze stejného souboru s migracemi požadavku na stažení) a** čerstvý** jeden (jedno zavedení s migrací požadavku na stažení). Porovnává výsledná schémata: tabulky a sloupce (ignoruje pořadí sloupců), omezení UNIQUE / PRIMARY KEY a FOREIGN KEY, normalizovaný text `CREATE TABLE` každé tabulky (který pokrývá omezení CHECK, kolace, generované sloupce a možnosti tabulky), indexy, spouštěče a pohledy. Data řádku se neporovnávají. Pokud se shodují, brána vytiskne, že soubor je mimo provoz, ale dojíždí a projde. Pokud se liší, brána selže s rozdílem a nápovědou pro případ: u souboru mimo pořadí přegenerujte jeho název pomocí `npm run db:new-migration`, což je bezpečné, protože soubor ještě není sloučen; pro upravený základní soubor obnovte základní obsah a vložte změnu do nové migrace; u přejmenovaného souboru vraťte přejmenování zpět nebo vyberte jiné nové časové razítko, kde bude dojíždět, nikdy stejné časové razítko s jiným názvem. Pokud samotná kontrola nemůže spustit, brána selže v CI a varuje pouze lokálně. U upraveného základního souboru je upgradovaná databáze sestavena s obsahem základního souboru a druhé spuštění jej přeskočí, protože jeho verze je již zaznamenána. U přejmenovaného souboru je upgradovaná databáze vytvořena se souborem pod jeho starým názvem a druhé zavádění přesune svůj řádek `_omniroute_migrations` přes položku kompatibility místo toho, aby jej znovu spustilo; brána předá nové jméno pomocí `--must-not-apply`, takže kontrola selže, pokud ji použije druhé spuštění. Pokud se migrace požadavku na stažení nepodaří použít na upgradované cestě, to znamená po každé migraci základny (bez ohledu na to, zda selže i při nové instalaci), brána ohlásí `migration do PR não aplica` a požádá vás o opravu SQL proti aktuálnímu schématu základny; pokud soubor závisí na další migraci požadavku na stažení s pozdějším časovým razítkem, vygenerujte jeho název pomocí `npm run db:new-migration`.

Chcete-li provést stejné porovnání lokálně, předejte základ explicitně, například `npm run check:migration-numbering -- --base origin/<base-branch>` nebo `npm run check:migration-numbering -- --base-latest-tag` pro porovnání s nejnovější verzí.

### Konverze migrace PR Open `NNN`

Požadavek na stažení otevřený před přepínačem může stále nést sekvenční soubor, jako je `242_add_widgets.sql`. Stará čísla nad `241` jsou odmítnuta, proto je před sloučením převeďte:

1. **Přejmenujte soubor pomocí generátoru a zachovejte popis.** Spusťte `npm run db:new-migration -- <same description>`, abyste získali nový název, přesuňte do něj SQL a odstraňte starý soubor `NNN_`. Popis musí zůstat identický: níže uvedený záznam o kompatibilitě se s ním shoduje.
2. **Přidejte položku kompatibility, pokud trvalá databáze provozovala staré číslo.** Pokud nějaká uchovávaná databáze (homolog, VPS, vlastní instalace přispěvatele) spustila sestavení PR se souborem `NNN_`, přidejte `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` k `RENAMED_MIGRATION_COMPATIBILITY` v `src/lib/db/migrationRunner/constants.ts`. Tohle je** požadované pro `237` až `241`** : tyto sloty nyní obsahují kanonické `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` a `241_seen_models.sql` a bez tohoto záznamu taková databáze navždy přeskočí kanonickou migraci a znovu spustí převedenou. Funguje také pro slot, který zůstává prázdný, jako je `242`, když je cílem časové razítko. V případě pochybností přidejte záznam. Nezáleží na tom, kde jej přidáte do pole: když cílový slot položky stále obsahuje řádek, který jiný záznam odsune (například `237` drží řádek PR zatímco starší řádek `usage_history_calculated_cost` čeká na přesun do `237`), runner nechá tento záznam počkat, dokud se slot neuvolní. Pouze skutečný konflikt, jako je slot držený řádkem bez pohybu, nebo dva záznamy, které prohodí sloty, zastaví zavádění pomocí `Cannot reconcile ...`.
3. **Udržujte idempotentní SQL** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), protože převedená migrace se může setkat s databází, kde její schéma již existuje.
4. **Přesunout speciální případy označené verzí.** Pokud PR přidal případ pro své staré číslo v `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) nebo v `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), změňte klíč na nové časové razítko.

`tests/unit/db/codex-fence-migration-rename.test.ts` je funkční příklad testu pro přejmenovanou migraci.

### Backporty do poboček před přepnutím

Nikdy nevybírejte ani neportujte soubor `YYYYMMDDHHMMSS_` do větve, která předchází přechodu (například starší větev `release/v*` ). Běžec tam třídí názvy souborů jako text, takže soubor s časovým razítkem by běžel mezi `201_` a `202_` na čerstvé databázi a stará brána tam nerozumí 14místným prefixům. Na takové větvi zapište změnu jako vlastní další `NNN_` soubor dané větve, idempotent, takže když verze s časovým razítkem dorazí později, nebude to fungovat.

### Jak migrace běží

Při spuštění `migrationRunner.ts`:

1. Vytvoří tabulku `_omniroute_migrations`, pokud neexistuje
2. Dotazy na již použité migrace
3. Použije všechny nové migrace v pořadí, každou v transakci
4. Zaznamenává každou použitou migraci s časovým razítkem

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

### Idempotence

Migrace musí být** idempotentní** — když je spustíte dvakrát, by to nemělo být:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Volně používejte klauzule `IF NOT EXISTS`, `IF EXISTS` a `OR IGNORE` / `OR REPLACE`.

### Přidání nové migrace

1. **Vytvořte soubor pomocí generátoru** : `npm run db:new-migration -- <description>` (například `npm run db:new-migration -- add combo priority`). Zapíše `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` s aktuálním časem UTC a záhlavím komentáře, posune se o jednu sekundu vpřed, pokud je toto časové razítko přijato, a nikdy nepřepíše soubor. Nevybírejte číslo ručně.
2. **Použijte bezpečné DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Pečlivě doplňte data** : použijte `UPDATE ... WHERE ...` ke zpracování existujících řádků
4. **Zkontrolujte pořadí a pojmenování** : `npm run test:migrations:fresh` (všechny migrace na prázdnou databázi) a `npm run check:migration-numbering`
5. **Test na kopii** : nikdy nespouštějte netestované migrace na produkci

Příklad:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Zpětně nekompatibilní změny** (např. vypuštění sloupců) jsou složité. OmniRoute podporuje NOT downgrade —, jakmile je použita migrace, změna schématu je trvalá. Podle toho plánujte.

---

## Šifrování uložených dat

Citlivá pole (API klíče, tokeny OAuth, připojovací řetězce) jsou při uložení šifrována pomocí algoritmu **AES-256-GCM**.

### Jak to funguje

```ts
// src/lib/db/encryption.ts (zjednodušeno)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kde se používá

- `provider_connections.api_key` — šifrováno na úrovni aplikace
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrováno na úrovni aplikace
- Položky `key_value` s `namespace = "secrets"` — šifrováno na úrovni aplikace
- `proxy_registry.auth` — šifrováno na úrovni aplikace (pokud je přítomno)

### Šifrovací klíč

Šifrovací klíč je odvozen z **přístupové fráze** (nastavené prostřednictvím proměnné prostředí `STORAGE_ENCRYPTION_KEY`) a **soli** (uložené v databázi). K dešifrování dat jsou vyžadovány oba údaje.

```bash
# Vygenerování bezpečné přístupové fráze
openssl rand -hex 32

# Nastavení v .env
STORAGE_ENCRYPTION_KEY=<váš-klíč>
```

> **Důležité**: Ztráta šifrovacího klíče znamená ztrátu přístupu ke všem šifrovaným datům. **Zálohujte klíč odděleně od databáze**.

### Co NENÍ šifrováno

Z výkonnostních důvodů jsou následující údaje ukládány jako prostý text:

- Zobrazované názvy poskytovatelů
- Definice modelů (již jsou veřejné)
- Pravidla směrování
- Záznamy o využití (bez PII)

---

## Omezení šifrování (v3.8.16+)

OmniRoute používá **`migrateLegacyEncryptedString()`** k transparentní práci se dvěma schématy šifrování:

- **Starší** (před v3.5.0): „šifrování“ založené na XOR (nejde o skutečnou kryptografii)
- **Aktuální**: AES-256-GCM s řádným inicializačním vektorem a autentizačním tagem

Pomocná migrační funkce rozpozná starší formát a při prvním načtení data znovu zašifruje pomocí nového schématu. Díky tomu můžete upgradovat starou databázi bez ztráty přihlašovacích údajů.

---

## Mezipaměť pro čtení

Pro často načítaná data (modely, poskytovatele, nastavení) poskytuje `readCache.ts` **mezipaměť v operační paměti**:

```ts
// Uloženo do mezipaměti při spuštění, zneplatněno při zápisu
const providers = await getCachedProviders(); // Rychlé, z operační paměti
const fresh = await listProviders(); // Pomalé, přistupuje k DB
```

| Entita v mezipaměti    | Klíč mezipaměti | TTL       |
| ---------------------- | --------------- | --------- |
| `models`               | `models:v1`     | Do zápisu |
| `provider_connections` | `providers:v1`  | Do zápisu |
| `settings`             | `settings:v1`   | Do zápisu |
| `combos`               | `combos:v1`     | Do zápisu |

Mezipaměť se zneplatní při každém zápisu do odpovídající tabulky.

---

## Zálohování a obnovení

### Ruční zálohování

```bash
# Použijte CLI k vytvoření místní zálohy
omniroute backup create --name pre-migration

# Nebo prostřednictvím API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Soubor zálohy obsahuje:

- Všechny tabulky DB (serializované do formátu JSON)
- Artefakty protokolu volání (kódované pomocí base64, volitelné)
- Nastavení a tajné údaje (šifrované)
- Konfiguraci pluginů

### Obnovení

```bash
# Prostřednictvím CLI
omniroute restore pre-migration

# Prostřednictvím API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Varování**: Obnovení přepíše celou DB. Nejprve zastavte všechny klienty.

### Automatizované zálohování

```bash
# Povolte automatické denní zálohování prostřednictvím CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Plán se provádí na straně serveru pomocí úlohy na pozadí, která se spouští každých 30 sekund
(ve výchozím nastavení) a vyhodnocuje výraz cron podle místního času serveru.

| Proměnná                                    | Výchozí hodnota | Popis                                                                                                                  |
| ------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`         | Interval spouštění v ms (min. `5000`). Aby se spolehlivě trefil do odpovídající minuty cron, musí být kratší než 60 s. |

### Aktivní záloha SQLite

Pro zálohování běžící DB bez odstávky:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tento příkaz používá online zálohovací API SQLite — lze jej bezpečně spustit, i když je OmniRoute v provozu.

---

## Ladění výkonu

### Režim WAL

WAL je ve výchozím nastavení povoleno. Pro velké pracovní zatížení zápisu zvažte:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute nenastavuje `journal_size_limit`. Kontrolní bod přesune snímky WAL do hlavního souboru, ale soubor WAL si zachová největší přidělenou velikost. Strážce `OMNIROUTE_WAL_GUARD_MAX_MB` pouze varuje a spustí `wal_checkpoint(RESTART)`; není to omezení velikosti disku.

### Indexy

Klíčové indexy pro výkon (automaticky vytvořené migrací):

- `idx_models_provider` — vyhledávání modelů podle poskytovatele
- `idx_combo_targets_combo_id` — combo target expanze
- analýza využití `idx_usage_history_api_key_timestamp` —
- sledování kvót `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — dotazy na protokol hovorů

Chcete-li přidat nový index, vytvořte migraci:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Paměťově mapovaná I/O

U velmi velkých databází (> 10GB) lze mapování paměti upravit pomocí SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Zhutňování

Dlouhotrvající instance OmniRoute těží z příležitostných `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Spouštět měsíčně během oken s nízkou návštěvností. (režim WAL snižuje potřebu, ale neeliminuje ji.)

---

## Kontrola stavu

`src/lib/db/healthCheck.ts` poskytuje **diagnostiku stavu na úrovni databáze**:

Obě metody vyžadují ověření (`401` v opačném případě). `GET` pouze diagnostikuje; `POST` spustí
stejnou kontrolu s povolenou možností `autoRepair`.

```bash
GET  /api/db/health   # diagnostika
POST /api/db/health   # diagnostika + oprava
```

Odpovědí je objekt `DbHealthCheckResult` vytvořený funkcí `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Rozpočty domén odkazovaly na klíče API, které již neexistují.",
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

| Pole              | Význam                                                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Hodnota `true`, když je `issues` prázdné. `driver` ji nikdy neovlivňuje.                                                                                        |
| `issues[].type`   | Jedna z hodnot `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                 |
| `repairedCount`   | Počet řádků opravených během tohoto spuštění; pokud je `autoRepair` nastaveno na false, hodnota je vždy `0`.                                                    |
| `backupCreated`   | Zda byla před opravou vytvořena záloha.                                                                                                                         |
| `checkedAt`       | Časové razítko ISO sdílené spuštěním a případnou poznámkou o opravě, kterou zapíše.                                                                             |
| `driver.name`     | Ovladač SQLite obsluhující kontrolovanou databázi.                                                                                                              |
| `driver.degraded` | Hodnota `true`, když zápisy nejsou trvale zálohovány databázovým souborem — záložní varianta `sql.js` WASM (perzistence celého souboru) nebo databáze v paměti. |

Stejná datová část je vrácena nástrojem MCP `omniroute_db_health_check`.

Spuštěním příkazu `PRAGMA integrity_check` zjistíte případné poškození:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Mělo by se vypsat: ok
```

Pokud příkaz vrátí cokoli jiného než `ok`, **okamžitě přestaňte databázi používat** a obnovte ji ze zálohy.

---

## Obnova po havárii

### Scénář 1: Soubor WAL byl ztracen

Soubor `-wal` chybí, ale soubor `-shm` a hlavní databáze jsou neporušené:

```bash
# Automaticky se obnoví při příštím otevření
omniroute
```

Pokud SQLite nedokáže provést automatickou obnovu:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scénář 2: Hlavní databázový soubor je poškozen

Obnovte jej ze zálohy:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` pouze stáhne úplný archiv `.tar.gz` ze spuštěného serveru
(`GET /api/db-backups/exportAll`, vyžadováno oprávnění operátora); žádnou obnovu neprovede.

### Scénář 3: Šifrovací klíč byl ztracen

Bez klíče **není obnova možná**. Zašifrovaná pole nelze přečíst. Znovu ručně přidejte všechny poskytovatele s novými přihlašovacími údaji.

> **Zmírnění rizika**: Šifrovací klíč vždy zálohujte samostatně, ideálně ve správci hesel nebo systému KMS.

### Scénář 4: Plný disk

SQLite bude vracet chyby `SQLITE_FULL`. Uvolněte místo na disku a poté spusťte:

```bash
# Proveďte kontrolní bod WAL a uvolněte místo
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Běžné operace

### Kontrola tabulky

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Spočítání řádků ve všech tabulkách

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetování (vymazání) všech dat

```bash
# Nejprve zastavte OmniRoute
omniroute stop

# Odstraňte databázový soubor
rm ~/.omniroute/storage.sqlite*

# Restartujte aplikaci (znovu vytvoří prázdnou databázi)
omniroute
```

Pro **selektivní** resetování (zachování poskytovatelů, vymazání údajů o využití):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Export jedné tabulky

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Řešení problémů

### „Databáze je uzamčena“

Jiný proces drží zámek pro zápis. Proveďte jednu z následujících akcí:

- Počkejte, až druhý proces skončí (zkontrolujte pomocí `lsof | grep storage.sqlite`)
- Ukončete druhý proces
- Pokud problém přetrvává, restartujte OmniRoute

### „Omezení cizího klíče selhalo“

Doménový modul porušuje referenční integritu. Zkontrolujte:

- Osiřelé řádky v závislých tabulkách
- Kaskádová odstranění, která se nepropagovala
- Nedávnou migraci, která změnila cizí klíč

Porušení vyhledejte spuštěním `PRAGMA foreign_key_check;`.

### „Nedostatek paměti“

Paměťově mapované I/O systému SQLite překračuje limit operačního systému. Snižte jej pomocí pragmatu SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB namísto 256MB
```

Nebo jej zakažte:

```sql
PRAGMA mmap_size = 0;
```

### „Migrace selhala v průběhu“

Migrace proběhla v transakci, takže by měla být vrácena zpět. Pokud se tak nestalo:

1. **Zastavte OmniRoute** (zabraňte dalším pokusům)
2. **Zkontrolujte stav databáze** pomocí `sqlite3`
3. **Ručně opravte** částečně provedenou migraci
4. **Znovu spusťte** OmniRoute (migrace se zopakuje)

Abyste tomu předešli, vždy migrace nejprve otestujte na kopii.

---

## Viz také

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabulky využití
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorování stavu
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces vydání
- Zdroj: `src/lib/db/` (více než 80 souborů, přibližně 25 tisíc řádků kódu)
