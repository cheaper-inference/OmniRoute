# Database Schema & Operations Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute používa ako primárne úložisko **SQLite so žurnálovaním WAL** a pre citlivé polia používa **AES-256-GCM** šifrovanie uložených údajov. Táto príručka sa zaoberá schémou, migráciami, zálohovaním/obnovou a prevádzkovými postupmi.

**Zdroje:**

- `src/lib/db/core.ts` — jediná inštancia + SCHEMA_SQL (17 základných tabuliek)
- `src/lib/db/migrationRunner.ts` — verzované migrácie
- `src/lib/db/migrations/` — 167 verzovaných súborov SQL
- `src/lib/db/encryption.ts` — pomocné funkcie na šifrovanie
- `src/lib/db/backup.ts` — export/import záloh
- `src/lib/db/healthCheck.ts` — diagnostika stavu

---

## Prečo SQLite?

OmniRoute si namiesto PostgreSQL/MySQL zvolil SQLite z niekoľkých dôvodov:

| Faktor              | SQLite                                                | PostgreSQL                                      |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| **Nasadenie**       | Vstavané — bez samostatného servera                   | Vyžaduje nastavenie servera                     |
| **Šifrovanie**      | Na aplikačnej vrstve (AES-256-GCM)                    | Vstavané TDE                                    |
| **Výkon**           | Rýchlejšie pri malých/stredných pracovných záťažiach  | Lepšie pri obrovskom množstve súbežných zápisov |
| **Súbežnosť**       | Režim WAL umožňuje súbežné čítanie                    | Plné MVCC                                       |
| **Zálohovanie**     | Kopírovanie jedného súboru                            | `pg_dump` alebo snímka súborového systému       |
| **Prípad použitia** | Inštalácia pre jedného používateľa, vstavané použitie | SaaS s viacerými nájomníkmi                     |

Pre nasadenia s **jedným používateľom a jednou inštanciou** (primárny prípad použitia OmniRoute) je SQLite jednoduchšie a rýchlejšie.

### Žurnálovanie WAL

`core.ts` otvára databázu v **režime WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL umožňuje **súbežné čítanie** počas zápisov — čo je dôležité pre ovládací panel, ktorý vykonáva dotazy počas zaznamenávania požiadaviek.

Predvolená veľkosť vyrovnávacej pamäte je **65 536 KiB (64 MiB)**. SQLite interpretuje zápornú hodnotu
`cache_size` ako približnú hornú hranicu v KiB a stránky prideľuje podľa potreby.
Nastavenie **Nastavenia > Systém a úložisko > Veľkosť vyrovnávacej pamäte** prijíma celé čísla od **1 do
1 000 000 KiB**; uložením nastavenia sa táto hodnota použije pre aktívne databázové pripojenie
a OmniRoute pri spustení obnoví uloženú hodnotu.

---

## Umiestnenie databázy

Súbor SQLite je uložený na tomto mieste:

| OS      | Cesta                                                                    |
| ------- | ------------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                            |
| macOS   | `~/.omniroute/storage.sqlite`                                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                |
| Docker  | `/app/data/storage.sqlite` (konfigurovateľné prostredníctvom `DATA_DIR`) |

Sprievodné súbory:

- `storage.sqlite-wal` — denník predbežného zápisu
- `storage.sqlite-shm` — súbor zdieľanej pamäte
- `call_logs/` — artefakty dát požiadaviek (ak sú povolené)

**Zmena umiestnenia:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektúra doménových modulov

Databáza OmniRoute má v adresári `src/lib/db/` **110 TypeScript modulov najvyššej úrovne**. Každý doménový modul:

- Spravuje jednu alebo viac konkrétnych tabuliek
- Exportuje typované CRUD funkcie
- Nikdy nepristupuje k tabuľkám iného modulu
- Používa `getDbInstance()` z `core.ts` na prístup k DB

### 110 DB modulov najvyššej úrovne

OmniRoute má v adresári `src/lib/db/` **110 TypeScript súborov najvyššej úrovne**. Nižšie je uvedená ukážka základných modulov; úplný zoznam nájdete vo výpise adresára:

| Modul                   | Tabuľky                                                        | Zodpovednosť                                                                          |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrácia poskytovateľov prostredníctvom OAuth/API kľúča a prihlasovacie údaje      |
| `models.ts`             | `key_value` (údaje modelov)                                    | Definície modelov, možnosti, ceny                                                     |
| `combos.ts`             | `combos`                                                       | Konfigurácie kombinovaného smerovania a poradie                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Životný cyklus API kľúčov, rozsahy oprávnení, sledovanie kvót                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurácia systému a zdieľané úložisko KV                                           |
| `backup.ts`             | —                                                              | Operácie exportu/importu záloh                                                        |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurácie proxy serverov a pravidlá smerovania                                     |
| `prompts.ts`            | `prompt_templates`                                             | Opakovane použiteľné šablóny promptov, správa verzií                                  |
| `webhooks.ts`           | `webhooks`                                                     | Odbery webhookov riadené udalosťami a protokoly                                       |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Protokolovanie auditu jednotlivých požiadaviek (voliteľné, veľký objem)               |
| `domainState.ts`        | `domain_*` (5 tabuliek)                                        | Doménové rozpočty, ističe, blokovania, reťazce náhradných možností, história nákladov |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Povolené API kľúče pre MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historické využitie kvót                                                              |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapovanie modelov na predvolené kombinácie                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trvalý stav špecifický pre CLI                                                        |
| `encryption.ts`         | —                                                              | Pomocné funkcie na šifrovanie/dešifrovanie polí                                       |
| `readCache.ts`          | —                                                              | Vyrovnávacia pamäť v pamäti pre operácie s častým čítaním                             |
| `secrets.ts`            | `key_value` (šifrované záznamy)                                | Úložisko šifrovaných tajných údajov                                                   |
| `stateReset.ts`         | —                                                              | Vymazanie/resetovanie stavu DB na testovanie                                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontext relácie na odovzdanie medzi agentmi                                           |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Sledovanie využitia                                                                   |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurácia kompresie                                                                |

### Hranice modulov

Základné architektonické pravidlo: **moduly nepristupujú priamo k tabuľkám iných modulov**. Ak chcete pracovať s údajmi iného modulu, importujte funkciu z daného modulu.

```ts
// ❌ NESPRÁVNE: priamy SQL prístup z iného modulu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ SPRÁVNE: použite funkciu modulu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Dodržiavanie tohto pravidla sa kontroluje pri revízii kódu — neexistuje žiadna statická kontrola, no porušenia sú označené.

---

## Základná schéma (17 tabuliek)

`core.ts` definuje 17 základných tabuliek v `SCHEMA_SQL`. Vytvára ich migrácia `001_initial_schema.sql` a tvoria jadro schémy.

### Základné tabuľky (vytvorené v úvodnej migrácii)

| Tabuľka                    | Účel                                          | Kľúčové stĺpce                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Prihlasovacie údaje poskytovateľa (šifrované) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informácie o smerovaní uzlov poskytovateľa    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Všeobecné úložisko KV                         | `namespace`, `key`, `value`                                             |
| `combos`                   | Definície kombinácií smerovania               | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Kľúče API pre bránu                           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadáta databázy                             | `key`, `value`                                                          |
| `usage_history`            | Záznamy o využití požiadaviek                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Dáta požiadaviek a odpovede                   | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Záznamy požiadaviek proxy                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Reťazce modelov a poskytovateľov              | `model`, `chain`                                                        |
| `domain_budgets`           | Rozpočty výdavkov pre jednotlivé domény       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | História obnovení rozpočtov                   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Sledovanie nákladov podľa domény              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stav obmedzenia frekvencie pre doménu         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stav ističa pre jednotlivé domény             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Vyrovnávacia pamäť odpovedí LLM               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historické snímky kvót                        | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ďalšie tabuľky (pridané neskoršími migráciami)

Nasledujúce migrácie pridávajú tabuľky, ako napríklad:

- `cli_tool_state` (migrácia 011) — stav nástroja CLI
- tabuľky `mcp_*` — audit servera MCP
- tabuľky `a2a_*` — stav úloh A2A
- tabuľky `usage_*` — sledovanie využitia
- tabuľky `plugin_*` — systém doplnkov
- `skill_executions` — história vykonávania zručností
- tabuľky `memory_*` — pamäťový systém
- tabuľky `compression_*` — systém kompresie
- tabuľky `webhook_*` — záznam doručovania webhookov
- tabuľky `acp_*` — Agent Client Protocol
- tabuľky `oneproxy_*` — trhovisko 1proxy
- `proxy_assignments` — väzby rozsahov proxy
- `detailed_call_artifacts` — metadáta artefaktov záznamov volaní
- `quota_alert_history` — audit upozornení na kvóty
- `command_code_auth_sessions` — relácie OAuth pre Command Code

Úplný zoznam viac ako 30 tabuliek sa nachádza v `src/lib/db/migrations/`.

---

## Migrácie

OmniRoute používa** verzované, idempotentné migrácie** v `src/lib/db/migrations/`. Každá migrácia je jeden súbor SQL. Existujú dva formáty názvov; verzia zaznamenaná v `_omniroute_migrations` je číselná predpona.

### Pomenovanie migrácie

| Formátovať                                        | Príklad                              | Používa sa na                                                                                                                                                    |
| ------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (presne 3 číslice)          | `241_seen_models.sql`                | Stará séria `001`–`241`. Zamrznuté, keď formát časovej pečiatky pristál (`240` a `241` boli zlúčené tesne pred ním): žiadny nový súbor nedostane poradové číslo. |
| `YYYYMMDDHHMMSS_description.sql` (14 číslic, UTC) | `20261113120000_add_usage_index.sql` | Každá migrácia vytvorená od 13. 11. 2026.                                                                                                                        |

Prečo tá zmena: pri sekvenčných číslach paralelné PRs vybralo rovnaké ďalšie číslo a všetky okrem jedného sa museli pred zlúčením prečíslovať. Časová pečiatka UTC dáva každému PR vlastnú verziu.

Pravidlá pre formát časovej pečiatky (vynútené `npm run check:migration-numbering`, zdieľané s generátorom v `scripts/check/lib/migrationNaming.mjs`):

- Časová pečiatka je skutočný dátum a čas UTC, nie skôr ako `20261113000000` a nie viac ako 10 minút v budúcnosti.
- Popis je malým písmenom `snake_case` začínajúcim písmenom (`a-z`, `0-9`, jedno `_` medzi slovami), maximálne 80 znakov.
- Dva súbory s rovnakou časovou pečiatkou sú duplikáty.
- Pravidlo bez medzier platí len pre starú sériu: musí existovať každé číslo od `001` po `241`, okrem známych medzier `026`, `055` a `121`. Odstránenie `241` (alebo akéhokoľvek starého súboru) zlyhá. `001` a `241` nemožno nikdy pridať do zoznamu povolených `KNOWN_GAPS`. Súbory s časovou pečiatkou nikdy nevytvárajú medzeru.
- Každá položka v `src/lib/db/migrations/` musí byť bežný súbor s platným názvom `.sql` malými písmenami. Adresár, symbolický odkaz, súbor `.SQL` alebo `.sql.bak`, skrytý súbor alebo názov s medzerou zlyhá bránou, pretože bežec by ho ticho preskočil alebo by sa zrútil pri štarte.

**Použiť objednávku.** Bežec triedi podľa číselnej hodnoty predpony, nie podľa textu: najprv staré súbory `001`–`241`, potom súbory s časovou pečiatkou v poradí podľa časových pečiatok, potom ľubovoľné adresáre s menným priestorom registrované pod `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (verzie ako `ee-001`). Čakajúca migrácia je akýkoľvek súbor, ktorého verzia nie je v `_omniroute_migrations`, takže migrácia zo staršej vetvy, ktorá sa zlúči po novšej, stále platí pre existujúce databázy.

**Časová pečiatka je poradie vytvorenia, nie poradie zlúčenia.** Ak vaša migrácia závisí od tabuľky alebo stĺpca vytvorenej migráciou s a** novšie** časovej pečiatky (napríklad z inej PR, ktorá sa zlúčila ako prvá), nová databáza by najprv spustila vašu a zlyhala. Kým je váš PR stále otvorený, vygenerujte názov súboru pomocou `npm run db:new-migration`, aby získal novšiu časovú pečiatku, alebo ho urobte nezávislým. `npm run test:migrations:fresh` aplikuje každú migráciu na prázdnu databázu a zachytí ju.

### Zlúčená migrácia sa nikdy neodstráni ani nepremenuje

Keď je súbor migrácie vo vetve vydania alebo `main`, už bežal na homologických a vývojárskych databázach, na inštaláciách VPS a v podnikovej synchronizácii. Odvtedy:

- **Nikdy ho nemažte.** Čerstvé inštalácie by stratili svoju schému, zatiaľ čo inovované databázy si ju ponechajú.
- **Nikdy to nepremenujte.** Verzia v `_omniroute_migrations` by sa už nezhodovala so súborom, takže každá databáza, ktorá ju už použila, by ju spustila znova. Neidempotentný SQL potom duplikuje dáta alebo zastaví bootovanie.
- **Potrebujete inú schému?** Vytvorte novú migráciu pomocou `npm run db:new-migration`.

Premenovanie je bezpečné iba pre súbor, ktorý ešte nie je zlúčený, čo je prípad, na ktorý odkazujú rady brány. Značka vydania tu nič nezmení: každé zatlačenie do vetvy `release/v*` publikuje obraz Docker `:next` a beží na homológu, inštalácii VPS a synchronizácii Enterprise, takže zlúčená migrácia prebehla v skutočných databázach skôr, ako existuje značka `vX.Y.Z`. Brána zlyhá pri každom odstránení základného súboru, či už označeného alebo nie.

- **Vrátenie zlúčenej migrácie.** `git revert`, ktorý vymaže súbor, zlyhá pri bráne. Ponechajte súbor a zrušte jeho schému pri novej migrácii: `npm run db:new-migration -- <description>`, s `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` atď. Aktualizované a čerstvé databázy potom končia s rovnakou schémou.
- **Akceptované premenovanie: záznam kompatibility a rovnaký obsah.** Ak sa zlúčený súbor musí presunúť (napríklad dva zlúčené súbory zdieľajú časovú pečiatku a bežec sa zastaví s kolíziou verzie), premenujte neskorší súbor bez toho, aby ste sa dotkli jeho SQL a pridajte `{ fromVersion, fromName, toVersion, toName }` k `RENAMED_MIGRATION_COMPATIBILITY` v `src/lib/db/migrationRunner/constants.ts`. Databázy, ktoré použili starú verziu, presunú svoj riadok `_omniroute_migrations` namiesto opätovného spustenia súboru. Brána upozorní na takéto premenovanie a vždy na ňom spustí kontrolu komutácie, bez ohľadu na novú časovú pečiatku: čerstvé inštalácie použijú súbor na jeho novej pozícii, inovované databázy nie, takže vyberte novú časovú pečiatku blízko starej. Premenovanie brány zlyhá, ak sa obsah zmenil (zmena schémy stále prebieha pri novej migrácii), alebo ak cieľový súbor položky nie je na disku.
- **Nikdy nepremenovávajte v rámci rovnakej časovej pečiatky.** Premenovanie, ktoré zachová časovú pečiatku a zmení iba popis, zlyhá, či už so záznamom alebo bez neho. Pri položke, ktorej `toVersion` sa rovná jej `fromVersion`, bežec vymaže starý riadok `_omniroute_migrations` a použije súbor znova na každú databázu, ktorá ho už spustila. Bez zadania bežec sleduje iba verziu: preskočí súbor v týchto databázach (nový obsah sa tam nikdy nespustí) a pri každom spustení zaznamená chybu prečíslovania. Použite inú časovú pečiatku plus záznam kompatibility alebo ponechajte názov.
- **Brána skontroluje, či sa premenovaný súbor znova nespustí.** Pre každé zakryté premenovanie odovzdá brána nový názov súboru kontrole komutácie pomocou `--must-not-apply`. Kontrola spustí aktualizovanú databázu so skutočným bežcom a ak runner použije tento súbor znova (napríklad preto, že záznam má nesprávnu verziu alebo názov, alebo preto, že analyzátor textu brány číta `constants.ts` inak ako TypeScript), brána zlyhá so `migration renomeada rodaria de novo` a požiada vás, aby ste skontrolovali staré a nové verzie a názvy záznamu.

### Čo Brána kontroluje proti základni

Pri žiadosti o stiahnutie a spustení zlučovacieho frontu `npm run check:migration-numbering` porovnáva `src/lib/db/migrations/` na disku s rovnakým adresárom v základnej vetve. Základom je v tomto poradí: `--base-latest-tag`, `--base <ref>`, premenná `MIGRATION_BASE_REF`, alebo, keď `GITHUB_EVENT_NAME` je `pull_request`, `pull_request_target` alebo `merge_group`, prvý rodič zlučovacieho odovzdania, `merge_group.base_sha` užitočného zaťaženia udalosti alebo `git merge-base HEAD origin/$GITHUB_BASE_REF`. Pri požiadavke na stiahnutie alebo spustení zlučovacieho frontu bez rozlíšiteľného základu brána zlyhá. Mimo CI bez `--base` vytlačí `comparação com a base: pulada (sem --base)` a preskočí tieto pravidlá.

`--base-latest-tag` sa porovnáva s najnovšou značkou vydania (`vX.Y.Z` v poradí semver; značky s príponou, ako napríklad nočné sa nepočítajú), ktorá je v histórii `HEAD`, s rovnakými pravidlami ako `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) spúšťa bránu týmto spôsobom, pretože push a plánované spustenia nemajú žiadnu základňu požiadaviek na stiahnutie a zlúčenie môže dopadnúť bez nového spustenia CI. Bez uvoľnenia v histórii brána zlyhá; spustiť `git fetch --tags` (v CI, `actions/checkout` so `fetch-depth: 0` prinesie značky).

| Zmena na žiadosť o stiahnutie                                                                             | Výsledok                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Súbor, ktorý existuje na základni, sa premenuje so záznamom `RENAMED_MIGRATION_COMPATIBILITY`             | **POZOR** ak je obsah identický a kontrola komutácie prebieha bez ohľadu na novú časovú pečiatku; zlyhá, ak nová pozícia zmení konečnú schému (zrušte premenovanie alebo vyberiete inú novú časovú pečiatku, kde dochádza k dochádzke), alebo ak by bežec znova použil premenovaný súbor na inovovanú databázu.** Zlyhá** ak sa obsah zmenil. |
| Súbor, ktorý existuje na základni, sa premenuje so zachovaním jeho časovej pečiatky (zmení sa iba popis)  | **Zlyhá** , so záznamom alebo bez neho: bežec ho použije znova (so záznamom) alebo ho preskočí podľa verzie (bez záznamu). Použite inú časovú pečiatku plus záznam kompatibility alebo ponechajte názov.                                                                                                                                      |
| Súbor, ktorý existuje na základni, sa vymaže alebo premenuje bez záznamu                                  | **Zlyhá** bez ohľadu na to, či súbor je alebo nie je v značke vydania. Ak to chcete vrátiť späť, obnovte súbor pomocou `git checkout <base> -- src/lib/db/migrations/<file>`; ak chcete vrátiť jej schému, pridajte novú migráciu pomocou `DROP ... IF EXISTS`.                                                                               |
| Súbor, ktorý existuje na základni, má iný obsah                                                           | **POZOR** (anotácia `::warning` v akciách GitHub ) a spustí sa kontrola komutácie. Zlyhá, ak úprava zmení konečnú schému, pretože inovované databázy znova nepoužijú upravený súbor: vložte zmenu do novej migrácie. Neškodná úprava (komentár, `IF NOT EXISTS`) iba varuje.                                                                  |
| Súbor s časovou pečiatkou sa pridá s časovou pečiatkou, ktorá nie je novšia ako najnovšia základňa        | Spustí kontrolu komutácie popísanú nižšie.                                                                                                                                                                                                                                                                                                    |
| Pridá sa súbor `NNN_` v starom formáte s číslom pod najnovším súborom starého formátu základne            | **Zlyhá** , aj keď je `KNOWN_GAPS` upravený v rovnakej požiadavke na stiahnutie: stará séria je zmrazená, vytvorte migráciu pomocou `npm run db:new-migration`. Súbory starého formátu nad najnovším súborom základne (požiadavka na stiahnutie `release/v*` na `main` ) sú akceptované.                                                      |
| Nefunkčný, upravený alebo premenovaný súbor obsahuje príkazy `INSERT`, `UPDATE`, `DELETE` alebo `REPLACE` | **POZOR** : kontrola komutácie neporovnáva údaje, preto skontrolujte, či poradie, v ktorom sa použijú aktualizované a nové databázy, nezmení výsledok.                                                                                                                                                                                        |

Jedno spustenie kontroly komutácie zahŕňa spolu nefunkčné, upravené a premenované súbory.

Kontrola komutácie (`scripts/check/migration-commutation.ts`) vytvorí dve dočasné databázy so skutočnou inštalačnou cestou: an** inovované** jeden (zaviesť pomocou základných migrácií, potom znova spustiť na rovnakom súbore s migráciami požiadavky na stiahnutie) a** čerstvé** jeden (jedno zavedenie s migráciami požiadavky na stiahnutie). Porovnáva výsledné schémy: tabuľky a stĺpce (ignoruje poradie stĺpcov), obmedzenia UNIQUE / PRIMARY KEY a FOREIGN KEY, normalizovaný text `CREATE TABLE` každej tabuľky (ktorý pokrýva obmedzenia CHECK, zoradenia, generované stĺpce a možnosti tabuliek), indexy, spúšťače a zobrazenia. Údaje riadkov sa neporovnávajú. Ak sa zhodujú, brána vypíše, že súbor je mimo prevádzky, ale dochádza k nemu a prejde. Ak sa líšia, brána zlyhá s rozdielom a tipom pre prípad: pre súbor mimo poradia vygenerujte jeho názov pomocou `npm run db:new-migration`, čo je bezpečné, pretože súbor ešte nie je zlúčený; v prípade upraveného základného súboru obnovte základný obsah a vložte zmenu do novej migrácie; v prípade premenovaného súboru zrušte premenovanie alebo vyberte inú novú časovú pečiatku, kde bude dochádzať, nikdy nie rovnakú časovú pečiatku s iným názvom. Ak samotná kontrola nemôže spustiť, brána zlyhá v CI a varuje iba lokálne. V prípade upraveného základného súboru sa aktualizovaná databáza vytvorí so základným obsahom tohto súboru a druhé spustenie ho preskočí, pretože jeho verzia je už zaznamenaná. V prípade premenovaného súboru sa aktualizovaná databáza vytvorí so súborom pod jeho starým názvom a druhé zavedenie presunie svoj riadok `_omniroute_migrations` cez položku kompatibility namiesto opätovného spustenia; brána odovzdá nový názov s `--must-not-apply`, takže kontrola zlyhá, ak ho použije druhé zavedenie. Ak sa migrácia žiadosti o stiahnutie nepodarí aplikovať na aktualizovanej ceste, to znamená po každej migrácii základne (bez ohľadu na to, či zlyhá aj pri novej inštalácii), brána ohlási `migration do PR não aplica` a požiada vás o opravu SQL oproti aktuálnej schéme základne; ak súbor závisí od ďalšej migrácie žiadosti o stiahnutie s neskoršou časovou pečiatkou, vygenerujte jeho názov pomocou `npm run db:new-migration`.

Ak chcete spustiť rovnaké porovnanie lokálne, odovzdajte základ explicitne, napríklad `npm run check:migration-numbering -- --base origin/<base-branch>` alebo `npm run check:migration-numbering -- --base-latest-tag` na porovnanie s najnovším vydaním.

### Konverzia migrácie `NNN` Open PR

Požiadavka na stiahnutie otvorená pred prepínačom môže stále niesť sekvenčný súbor, ako napríklad `242_add_widgets.sql`. Staré čísla nad `241` sú odmietnuté, preto ich pred zlúčením preveďte:

1. **Premenujte súbor s generátorom, ponechajte popis.** Spustite `npm run db:new-migration -- <same description>`, aby ste získali nový názov, presuňte doň SQL a odstráňte starý súbor `NNN_`. Popis musí zostať rovnaký: zhoduje sa s ním nižšie uvedená položka o kompatibilite.
2. **Pridajte položku kompatibility, ak trvalá databáza spustila staré číslo.** Ak akákoľvek uchovávaná databáza (homológ, VPS, vlastná inštalácia prispievateľa) spustila zostavenie PR so súborom `NNN_`, pridajte `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` k `RENAMED_MIGRATION_COMPATIBILITY` v `src/lib/db/migrationRunner/constants.ts`. Toto je** potrebné pre `237` až `241`** : tieto sloty teraz obsahujú kanonické `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` a `241_seen_models.sql` a bez tohto záznamu takáto databáza navždy preskočí kanonickú migráciu a znova spustí konvertovanú. Funguje to aj pre slot, ktorý zostane prázdny, ako napríklad `242`, keď je cieľom časová pečiatka. Ak máte pochybnosti, pridajte záznam. Nezáleží na tom, kde ho pridáte do poľa: keď cieľový slot položky stále obsahuje riadok, ktorý iná položka posúva preč (napríklad `237` drží riadok PR zatiaľ čo starší riadok `usage_history_calculated_cost` čaká na presun do `237`), runner nechá tento záznam počkať, kým sa slot neuvoľní. Iba skutočný konflikt, ako napríklad slot držaný riadkom bez pohybu, alebo dva záznamy, ktoré si vymenia sloty, zastaví bootovanie pomocou `Cannot reconcile ...`.
3. **Udržujte SQL idempotentné** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), pretože konvertovaná migrácia sa môže stretnúť s databázou, v ktorej už existuje jej schéma.
4. **Presuňte špeciálne prípady s kľúčom verzie.** Ak PR pridal malé a veľké písmená pre svoje staré číslo v `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) alebo v `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), zmeňte kľúč na novú časovú pečiatku.

`tests/unit/db/codex-fence-migration-rename.test.ts` je pracovným príkladom testu premenovanej migrácie.

### Backporty do pobočiek pred prepnutím

Nikdy nevyberajte ani neportujte súbor `YYYYMMDDHHMMSS_` do vetvy, ktorá predchádza prepínaču (napríklad staršia vetva `release/v*` ). Bežec tam triedi názvy súborov ako text, takže súbor s časovou pečiatkou by bežal medzi `201_` a `202_` na novej databáze a stará brána tam nerozumie 14-miestnym prefixom. Na takejto vetve zapíšte zmenu ako ďalší vlastný `NNN_` súbor tejto vetvy, idempotent, takže keď verzia s časovou pečiatkou príde neskôr, nebude to možné.

### Ako prebiehajú migrácie

Pri spustení `migrationRunner.ts`:

1. Vytvorí tabuľku `_omniroute_migrations`, ak neexistuje
2. Dotazy na už aplikované migrácie
3. Aplikuje všetky nové migrácie v poradí, každú v transakcii
4. Zaznamenáva každú použitú migráciu s časovou pečiatkou

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

Migrácia musí byť** idempotentný** — ich spustenie dvakrát by malo byť nefunkčné:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Voľne používajte klauzuly `IF NOT EXISTS`, `IF EXISTS` a `OR IGNORE` / `OR REPLACE`.

### Pridanie novej migrácie

1. **Vytvorte súbor pomocou generátora** : `npm run db:new-migration -- <description>` (napríklad `npm run db:new-migration -- add combo priority`). Zapíše `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` s aktuálnym časom UTC a hlavičkou komentára, posunie sa o jednu sekundu dopredu, ak sa táto časová pečiatka použije, a nikdy neprepíše súbor. Nevyberajte číslo ručne.
2. **Použite bezpečné DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Údaje doplňte opatrne** : použite `UPDATE ... WHERE ...` na spracovanie existujúcich riadkov
4. **Skontrolujte poradie a pomenovanie** : `npm run test:migrations:fresh` (všetky migrácie na prázdnu databázu) a `npm run check:migration-numbering`
5. **Test na kópii** : nikdy nespúšťajte netestované migrácie na produkciu
6. **Tabuľka vytvorená z kódu tiež potrebuje migráciu** : ak modul tiež vytvorí tabuľku lenivo (`CREATE TABLE IF NOT EXISTS`, udržiavaná ako cesta samoliečenia), migrácia ju musí vytvoriť s rovnakým DDL. V opačnom prípade čistá inštalácia a inovovaná inštalácia skončia s rôznymi schémami v závislosti od toho, či cesta kódu prebehla. `tests/unit/db/lazy-table-migration-guard.test.ts` skenuje `src/` a `open-sse/` a zlyhá na lenivom `CREATE` bez migrácie (#20557). Príklad: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Príklad:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Spätne nekompatibilné zmeny** (napr. vypustenie stĺpcov) sú zložité. OmniRoute podporuje NOT downgrade — akonáhle je aplikovaná migrácia, zmena schémy je trvalá. Podľa toho plánujte.

---

## Šifrovanie uložených údajov

Citlivé polia (API kľúče, OAuth tokeny, reťazce pripojenia) sú pri uložení šifrované pomocou **AES-256-GCM**.

### Ako to funguje

```ts
// src/lib/db/encryption.ts (zjednodušené)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kde sa používa

- `provider_connections.api_key` — šifrované na aplikačnej úrovni
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrované na aplikačnej úrovni
- Položky `key_value` s `namespace = "secrets"` — šifrované na aplikačnej úrovni
- `proxy_registry.auth` — šifrované na aplikačnej úrovni (ak je prítomné)

### Šifrovací kľúč

Šifrovací kľúč sa odvodzuje z **prístupovej frázy** (nastavenej prostredníctvom premennej prostredia `STORAGE_ENCRYPTION_KEY`) a **soli** (uloženej v databáze). Na dešifrovanie údajov sú potrebné obe.

```bash
# Vygenerovanie bezpečnej prístupovej frázy
openssl rand -hex 32

# Nastavenie v .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritické**: Strata šifrovacieho kľúča znamená stratu prístupu ku všetkým zašifrovaným údajom. **Kľúč zálohujte oddelene od databázy**.

### Čo NIE JE šifrované

Z dôvodu výkonu sa nasledujúce údaje ukladajú ako obyčajný text:

- Zobrazované názvy poskytovateľov
- Definície modelov (už sú verejné)
- Pravidlá smerovania
- Záznamy o používaní (bez osobných identifikačných údajov)

---

## Upozornenia k šifrovaniu (v3.8.16+)

OmniRoute používa **`migrateLegacyEncryptedString()`** na transparentné spracovanie dvoch schém šifrovania:

- **Pôvodná** (pred v3.5.0): „šifrovanie“ založené na XOR (nejde o skutočnú kryptografiu)
- **Aktuálna**: AES-256-GCM so správnym IV a autentifikačným tagom

Pomocná funkcia migrácie rozpozná pôvodný formát a pri prvom načítaní údaje znova zašifruje pomocou novej schémy. To znamená, že môžete aktualizovať starú databázu bez straty prihlasovacích údajov.

---

## Vyrovnávacia pamäť na čítanie

Pre často načítavané údaje (modely, poskytovateľov, nastavenia) poskytuje `readCache.ts` **vyrovnávaciu pamäť v operačnej pamäti**:

```ts
// Uložené do vyrovnávacej pamäte pri spustení, zneplatnené pri zápise
const providers = await getCachedProviders(); // Rýchle, z operačnej pamäte
const fresh = await listProviders(); // Pomalé, pristupuje k DB
```

| Entita vo vyrovnávacej pamäti | Kľúč vyrovnávacej pamäte | TTL       |
| ----------------------------- | ------------------------ | --------- |
| `models`                      | `models:v1`              | Do zápisu |
| `provider_connections`        | `providers:v1`           | Do zápisu |
| `settings`                    | `settings:v1`            | Do zápisu |
| `combos`                      | `combos:v1`              | Do zápisu |

Vyrovnávacia pamäť sa zneplatní pri každom zápise do príslušnej tabuľky.

---

## Zálohovanie a obnova

### Manuálne zálohovanie

```bash
# Na vytvorenie lokálnej zálohy použite CLI
omniroute backup create --name pre-migration

# Alebo prostredníctvom API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Súbor zálohy obsahuje:

- Všetky tabuľky DB (serializované do formátu JSON)
- Artefakty protokolov volaní (kódované pomocou base64, voliteľné)
- Nastavenia + tajné údaje (šifrované)
- Konfiguráciu doplnkov

### Obnova

```bash
# Prostredníctvom CLI
omniroute restore pre-migration

# Prostredníctvom API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Upozornenie**: Obnova prepíše celú DB. Najskôr zastavte všetkých klientov.

### Automatizované zálohy

```bash
# Povoľte automatizované denné zálohy prostredníctvom CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Plán vykonáva na strane servera úloha na pozadí, ktorá sa spúšťa každých 30 sekúnd
(predvolene) a vyhodnocuje výraz cron podľa lokálneho času servera.

| Premenná                                    | Predvolená hodnota | Popis                                                                                                                 |
| ------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`            | Interval spúšťania v ms (min. `5000`). Musí byť kratší ako 60 s, aby spoľahlivo spadal do zodpovedajúcej minúty cron. |

### Aktívna záloha SQLite

Na vytvorenie zálohy aktívnej DB bez odstávky:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Používa sa rozhranie API SQLite na online zálohovanie — príkaz je bezpečné spustiť aj počas prevádzky OmniRoute.

---

## Ladenie výkonu

### Režim WAL

WAL je predvolene povolené. Pre veľké pracovné zaťaženie pri zápise zvážte:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute nenastavuje `journal_size_limit`. Kontrolný bod presúva snímky WAL do hlavného súboru, ale súbor WAL si zachováva svoju najväčšiu pridelenú veľkosť. Strážca `OMNIROUTE_WAL_GUARD_MAX_MB` iba varuje a spúšťa `wal_checkpoint(RESTART)`; nie je to obmedzenie veľkosti disku.

### Indexy

Kľúčové indexy pre výkon (automaticky vytvorené migráciami):

- `idx_models_provider` — vyhľadávanie modelov podľa poskytovateľa
- `idx_combo_targets_combo_id` — combo target expanzia
- analýza používania `idx_usage_history_api_key_timestamp` —
- sledovanie kvót `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — otázky denníka hovorov

Ak chcete pridať nový index, vytvorte migráciu:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Pre veľmi veľké databázy (> 10GB) je možné mapovanie pamäte upraviť pomocou SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Zhutňovanie

Dlhodobé inštancie OmniRoute ťažia z príležitostných `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Spúšťajte mesačne počas okien s nízkou návštevnosťou. (Režim WAL znižuje potrebu, ale neodstraňuje ju.)

---

## Kontrola stavu

`src/lib/db/healthCheck.ts` poskytuje **diagnostiku stavu na úrovni databázy**:

Obe metódy vyžadujú autentifikáciu (inak sa vráti `401`). `GET` vykonáva iba diagnostiku; `POST` spustí
rovnakú kontrolu s povolenou možnosťou `autoRepair`.

```bash
GET  /api/db/health   # diagnostika
POST /api/db/health   # diagnostika + oprava
```

Odpoveďou je `DbHealthCheckResult` vytvorený funkciou `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Rozpočty domén odkazovali na kľúče API, ktoré už neexistujú.",
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

| Pole              | Význam                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Má hodnotu `true`, keď je `issues` prázdne. `driver` túto hodnotu nikdy neovplyvňuje.                                                                            |
| `issues[].type`   | Jedna z hodnôt `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                  |
| `repairedCount`   | Počet riadkov opravených počas tohto spustenia; vždy `0`, keď má `autoRepair` hodnotu false.                                                                     |
| `backupCreated`   | Určuje, či bola pred opravou vytvorená záloha.                                                                                                                   |
| `checkedAt`       | Časová pečiatka ISO spoločná pre spustenie a všetky poznámky o oprave, ktoré sa pri ňom zapíšu.                                                                  |
| `driver.name`     | Ovládač SQLite obsluhujúci kontrolovanú databázu.                                                                                                                |
| `driver.degraded` | Má hodnotu `true`, keď zápisy nie sú trvalo zálohované databázovým súborom — záložný ovládač `sql.js` WASM (perzistencia celého súboru) alebo databáza v pamäti. |

Rovnakú dátovú štruktúru vracia nástroj MCP `omniroute_db_health_check`.

Spustením `PRAGMA integrity_check` zistíte poškodenie:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Výstup by mal byť: ok
```

Ak príkaz vráti čokoľvek iné ako `ok`, **okamžite prestaňte databázu používať** a obnovte ju zo zálohy.

---

## Obnova po havárii

### Scenár 1: Strata súboru WAL

Súbor `-wal` chýba, ale súbor `-shm` a hlavná databáza sú neporušené:

```bash
# Automaticky sa obnoví pri ďalšom otvorení
omniroute
```

Ak SQLite nedokáže vykonať automatickú obnovu:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenár 2: Poškodenie súboru hlavnej databázy

Obnovte ju zo zálohy:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` iba stiahne úplný archív `.tar.gz` zo spusteného servera
(`GET /api/db-backups/exportAll`, vyžadujú sa prihlasovacie údaje operátora); nevykoná žiadnu obnovu.

### Scenár 3: Strata šifrovacieho kľúča

Bez kľúča **nie je možná žiadna obnova**. Zašifrované polia sú nečitateľné. Znova manuálne pridajte všetkých poskytovateľov s novými prihlasovacími údajmi.

> **Preventívne opatrenie**: Šifrovací kľúč vždy zálohujte samostatne, ideálne v správcovi hesiel alebo v KMS.

### Scenár 4: Plný disk

SQLite bude vracať chyby `SQLITE_FULL`. Uvoľnite miesto na disku a potom vykonajte:

```bash
# Vykonajte kontrolný bod WAL na uvoľnenie miesta
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Bežné operácie

### Kontrola tabuľky

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Spočítanie riadkov vo všetkých tabuľkách

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Obnovenie (vymazanie) všetkých údajov

```bash
# Najprv zastavte OmniRoute
omniroute stop

# Odstráňte súbor databázy
rm ~/.omniroute/storage.sqlite*

# Reštartujte aplikáciu (znova vytvorí prázdnu databázu)
omniroute
```

Pre **selektívne** obnovenie (zachovanie poskytovateľov, vymazanie údajov o používaní):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Export jednej tabuľky

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Riešenie problémov

### „Databáza je uzamknutá“

Iný proces drží zámok na zápis. Môžete:

- Počkať, kým sa druhý proces dokončí (skontrolujte pomocou `lsof | grep storage.sqlite`)
- Ukončiť druhý proces
- Ak problém pretrváva, reštartovať OmniRoute

### „Obmedzenie cudzieho kľúča zlyhalo“

Doménový modul porušuje referenčnú integritu. Skontrolujte:

- Osirelé riadky v závislých tabuľkách
- Kaskádové odstránenia, ktoré sa nepropagovali
- Nedávnu migráciu, ktorá zmenila cudzí kľúč

Spustením `PRAGMA foreign_key_check;` vyhľadajte porušenia.

### „Nedostatok pamäte“

Pamäťovo mapované I/O databázy SQLite prekračuje limit operačného systému. Znížte ho pomocou príkazu pragma databázy SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB namiesto 256MB
```

Alebo ho zakážte:

```sql
PRAGMA mmap_size = 0;
```

### „Migrácia zlyhala v priebehu vykonávania“

Migrácia prebehla v transakcii, preto by sa mala vrátiť späť. Ak sa tak nestalo:

1. **Zastavte OmniRoute** (zabránite ďalším pokusom)
2. **Skontrolujte stav databázy** pomocou `sqlite3`
3. **Manuálne opravte** čiastočne vykonanú migráciu
4. **Znova spustite** OmniRoute (migrácia sa zopakuje)

Aby ste tomu predišli, migrácie vždy najprv otestujte na kópii.

---

## Pozrite tiež

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabuľky používania
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorovanie stavu
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces vydania
- Zdroj: `src/lib/db/` (viac ako 80 súborov, približne 25-tisíc riadkov kódu)
