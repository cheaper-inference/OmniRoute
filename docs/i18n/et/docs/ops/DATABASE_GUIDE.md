# Database Schema & Operations Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Lühidalt**: OmniRoute kasutab oma peamise andmehoidlana **SQLite'i koos WAL-logimisega** ning tundlikud väljad on puhkeolekus kaitstud **AES-256-GCM**-krüpteeringuga. See juhend käsitleb skeemi, migratsioone, varundamist/taastamist ja operatiivseid tegevusjuhiseid.

**Allikad:**

- `src/lib/db/core.ts` — üksikeksemplar + SCHEMA_SQL (17 põhitabelit)
- `src/lib/db/migrationRunner.ts` — versioonitud migratsioonid
- `src/lib/db/migrations/` — 167 versioonitud SQL-faili
- `src/lib/db/encryption.ts` — krüpteerimise abifunktsioonid
- `src/lib/db/backup.ts` — varukoopia eksport/import
- `src/lib/db/healthCheck.ts` — seisundi diagnostika

---

## Miks SQLite?

OmniRoute valis PostgreSQL-i/MySQL-i asemel SQLite'i mitmel põhjusel:

| Tegur             | SQLite                                   | PostgreSQL                                           |
| ----------------- | ---------------------------------------- | ---------------------------------------------------- |
| **Juurutamine**   | Sisseehitatud — eraldi serverit pole     | Vajab serveri seadistamist                           |
| **Krüpteerimine** | Rakenduse tasemel (AES-256-GCM)          | Sisseehitatud TDE                                    |
| **Jõudlus**       | Kiirem väikese/keskmise koormuse korral  | Parem väga suure hulga samaaegsete kirjutuste korral |
| **Samaaegsus**    | WAL-režiim võimaldab samaaegset lugemist | Täielik MVCC                                         |
| **Varundamine**   | Ühe faili kopeerimine                    | `pg_dump` või failisüsteemi hetktõmmis               |
| **Kasutusjuht**   | Kasutajapõhine paigaldus, sisseehitatud  | Mitme rentnikuga SaaS                                |

**Ühe kasutaja ja ühe eksemplariga** juurutuste puhul (OmniRoute'i peamine kasutusjuht) on SQLite lihtsam ja kiirem.

### WAL-logimine

`core.ts` avab andmebaasi **WAL-režiimis (Write-Ahead Logging ehk ette kirjutav logimine)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL võimaldab kirjutamise ajal **samaaegset lugemist** — see on oluline töölaua jaoks, mis teeb päringuid samal ajal, kui taotlusi salvestatakse.

Vaikimisi vahemälu suurus on **65,536 KiB (64 MiB)**. SQLite tõlgendab negatiivset
`cache_size` väärtust ligikaudse ülempiirina KiB-des ja eraldab lehti vastavalt vajadusele.
**Seaded > Süsteem ja salvestusruum > Vahemälu suurus** aktsepteerib täisarve vahemikus **1 kuni
1,000,000 KiB**; sätte salvestamisel rakendatakse see aktiivsele andmebaasiühendusele
ning OmniRoute taastab püsivalt salvestatud väärtuse käivitamisel.

---

## Andmebaasi asukoht

SQLite'i fail asub järgmises kohas:

| OS      | Tee                                                       |
| ------- | --------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                             |
| macOS   | `~/.omniroute/storage.sqlite`                             |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                 |
| Docker  | `/app/data/storage.sqlite` (seadistatav `DATA_DIR` kaudu) |

Kaasnevad failid:

- `storage.sqlite-wal` — ette kirjutav logi
- `storage.sqlite-shm` — ühismälu fail
- `call_logs/` — päringute sisu artefaktid (kui lubatud)

**Asukoha alistamine:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domeenimoodulite arhitektuur

OmniRoute'i andmebaasis on **110 ülataseme TypeScripti moodulit** kataloogis `src/lib/db/`. Iga domeenimoodul:

- Haldab üht või mitut konkreetset tabelit
- Ekspordib tüübitud CRUD-funktsioone
- Ei kasuta kunagi teise mooduli tabeleid
- Kasutab andmebaasile juurdepääsuks faili `core.ts` funktsiooni `getDbInstance()`

### 110 ülataseme andmebaasimoodulit

OmniRoute'il on kataloogis `src/lib/db/` **110 ülataseme TypeScripti faili**. Allpool on valik põhimooduleid; täieliku loendi leiate kataloogi sisust:

| Moodul                  | Tabelid                                                        | Vastutus                                                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuthi/API-võtme pakkujate registreerimine ja autentimisandmed           |
| `models.ts`             | `key_value` (mudeliandmed)                                     | Mudelite määratlused, võimekused ja hinnastus                            |
| `combos.ts`             | `combos`                                                       | Kombineeritud marsruutimise konfiguratsioonid ja järjestus               |
| `apiKeys.ts`            | `api_keys`                                                     | API-võtmete elutsükkel, ulatused ja kvoodi jälgimine                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Süsteemi konfiguratsioon ja jagatud võtme-väärtuse hoidla                |
| `backup.ts`             | —                                                              | Varukoopiate eksportimise/importimise toimingud                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Puhverserverite konfiguratsioonid ja marsruutimisreeglid                 |
| `prompts.ts`            | `prompt_templates`                                             | Korduskasutatavad viibamallid ja versioonihaldus                         |
| `webhooks.ts`           | `webhooks`                                                     | Sündmuspõhised veebihaagi tellimused ja logid                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Päringupõhine auditlogimine (valikuline, suure mahuga)                   |
| `domainState.ts`        | `domain_*` (5 tabelit)                                         | Domeenide eelarved, kaitselülitid, lukustused, varuahelad ja kuluajalugu |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A lubatud API-võtmed                                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Kvoodikasutuse ajalugu                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mudelite vastendamine vaikimisi kombinatsioonidega                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-spetsiifiline püsiolek                                               |
| `encryption.ts`         | —                                                              | Abifunktsioonid väljade krüptimiseks/dekrüptimiseks                      |
| `readCache.ts`          | —                                                              | Mälusisene vahemälu lugemismahukate toimingute jaoks                     |
| `secrets.ts`            | `key_value` (krüptitud kirjed)                                 | Krüptitud saladuste talletamine                                          |
| `stateReset.ts`         | —                                                              | Andmebaasi oleku kustutamine/lähtestamine testimiseks                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Seansi kontekst agendi üleandmiseks                                      |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Kasutuse jälgimine                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Tihendamise konfiguratsioon                                              |

### Moodulite piirid

Arhitektuuri põhireegel: **moodulid ei kasuta üksteise tabeleid otse**. Teise mooduli andmetega töötamiseks importige funktsioon sellest moodulist.

```ts
// ❌ VALE: otsene SQL teisest moodulist
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ÕIGE: kasutage providers-mooduli funktsiooni
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Selle reegli järgimist kontrollitakse koodi ülevaatuse käigus — staatilist kontrolli pole, kuid rikkumised märgistatakse.

---

## Baasskeem (17 tabelit)

`core.ts` määratleb 17 baastabelit muutujas `SCHEMA_SQL`. Need luuakse migratsiooniga `001_initial_schema.sql` ja moodustavad põhiskeemi.

### Põhitabelid (loodud algses migratsioonis)

| Tabel                      | Otstarve                                  | Põhiveerud                                                              |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Teenusepakkuja pääsuandmed (krüpteeritud) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Teenusepakkuja sõlme marsruutimisteave    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Üldine võtme-väärtuse hoidla              | `namespace`, `key`, `value`                                             |
| `combos`                   | Marsruutimiskombinatsioonide määratlused  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Lüüsile mõeldud API-võtmed                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Andmebaasi metaandmed                     | `key`, `value`                                                          |
| `usage_history`            | Päringute kasutuskirjed                   | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Päringute sisu ja vastused                | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Puhverserveri päringulogid                | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Mudeli ja teenusepakkuja ahelad           | `model`, `chain`                                                        |
| `domain_budgets`           | Domeenipõhised kululimiidid               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Eelarve lähtestamise ajalugu              | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Domeenipõhine kulude jälgimine            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domeeni päringusageduse piirangu olek     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Domeenipõhine kaitselüliti olek           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM-i vastuste vahemälu                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Kvoodi ajaloolised hetktõmmised           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Lisatabelid (lisatud hilisemate migratsioonidega)

Järgnevad migratsioonid lisavad muu hulgas järgmised tabelid:

- `cli_tool_state` (migratsioon 011) — CLI-tööriista olek
- `mcp_*` tabelid — MCP-serveri audit
- `a2a_*` tabelid — A2A-ülesannete olek
- `usage_*` tabelid — kasutuse jälgimine
- `plugin_*` tabelid — pistikprogrammisüsteem
- `skill_executions` — oskuste täitmise ajalugu
- `memory_*` tabelid — mälusüsteem
- `compression_*` tabelid — tihendussüsteem
- `webhook_*` tabelid — veebihaakide edastuslogi
- `acp_*` tabelid — agendikliendi protokoll
- `oneproxy_*` tabelid — 1proxy turuplats
- `proxy_assignments` — puhverserveri ulatuse seosed
- `detailed_call_artifacts` — kutselogi artefaktide metaandmed
- `quota_alert_history` — kvoodihoiatuste audit
- `command_code_auth_sessions` — Command Code OAuthi seansid

Ligikaudu 30+ tabeli täielik loend asub kataloogis `src/lib/db/migrations/`.

---

## Ränded

OmniRoute kasutab** versioonidega, idempotentsed migratsioonid** `src/lib/db/migrations/`. Iga migratsioon on üks SQL fail. Kaks nimevormingut eksisteerivad koos; `_omniroute_migrations` s salvestatud versioon on numbriline eesliide.

### Migratsiooni nimetamine

| Vorming                                            | Näide                                | Kasutatud                                                                                                                                                |
| -------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (täpselt 3 numbrit)          | `241_seen_models.sql`                | Vana seeria `001`–`241`. Külmutatud ajatempli vormingu maandumisel (`240` ja `241` liideti vahetult enne seda): ükski uus fail ei saa järjekorranumbrit. |
| `YYYYMMDDHHMMSS_description.sql` (14 numbrit, UTC) | `20261113120000_add_usage_index.sql` | Iga migratsioon, mis on loodud alates 2026-11-13.                                                                                                        |

Miks muutus: järjestikuste numbritega valis paralleelne PRs sama järgmise numbri ja kõik peale ühe pidid enne ühendamist ümber nummerdama. UTC ajatempel annab igale PR oma versiooni.

Ajatempli vormingu reeglid (jõustab `npm run check:migration-numbering`, jagab `scripts/check/lib/migrationNaming.mjs` generaatoriga):

- Ajatempel on tõeline UTC kuupäev ja kellaaeg, mitte varem kui `20261113000000` ja mitte rohkem kui 10 minutit tulevikus.
- Kirjeldus on väiketähtedega `snake_case` mis algab tähega (`a-z`, `0-9`, üksik `_` sõnade vahel), maksimaalselt 80 tähemärki.
- Kaks sama ajatempliga faili on duplikaat.
- Vahede puudumise reegel kehtib ainult vanade seeriate puhul: kõik numbrid alates `001` kuni `241` peavad olemas olema, välja arvatud teadaolevad lüngad `026`, `055` ja `121`. `241` (või mis tahes vana faili) kustutamine ebaõnnestub. `001` ja `241` ei saa kunagi lisada `KNOWN_GAPS` lubatud loendisse. Ajatempliga failid ei tekita kunagi tühimikku.
- Iga `src/lib/db/migrations/` kirje peab olema tavaline fail, millel on kehtiv väiketähtedega `.sql` nimi. Kataloog, sümlink, `.SQL` või `.sql.bak` -fail, peidetud fail või tühikuga nimi rikub väravat, sest jooksja jätab selle vaikselt vahele või jookseb alglaadimisel kokku.

**Rakenda tellimus.** Jooksja sorteerib eesliite arvväärtuse, mitte teksti järgi: kõigepealt vanad `001`–`241` failid, seejärel ajatempliga failid ajatempli järjekorras, seejärel kõik `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` -ga registreeritud nimeruumiga kataloogid (versioonid nagu `ee-001`). Ootel migreerumine on mis tahes fail, mille versioon ei ole `_omniroute_migrations`, nii et migratsioon vanemast harust, mis liidetakse uuema järel, kehtib ka olemasolevates andmebaasides.

**Ajatempel on loomise järjekord, mitte liitmisjärjekord.** Kui teie üleviimine sõltub tabelist või veerust, mis on loodud migratsiooniga koos a** uuem** ajatempel (nt üks teisest PR, mis esimesena liideti), käivitaks värske andmebaas kõigepealt teie oma ja see ebaõnnestub. Kui teie PR on endiselt avatud, taastage failinimi `npm run db:new-migration`, et see saaks uuema ajatempli, või muutke see iseseisvaks. `npm run test:migrations:fresh` rakendab iga migratsiooni tühjale andmebaasile ja püüab selle kinni.

### Ühendatud migratsiooni ei kustutata ega nimetata ümber

Kui migratsioonifail on väljalaskeharus või `main`, on see juba homoloogide ja arendajate andmebaasides, VPS installides ja ettevõtte sünkroonimises jooksnud. Sellest ajast alates:

- **Ärge kunagi kustutage seda.** Värsked installid kaotaksid oma skeemi, samas kui täiendatud andmebaasid säilitavad selle.
- **Ärge kunagi nimetage seda ümber.** `_omniroute_migrations` versioon ei vastaks enam failile, nii et iga andmebaas, mis seda juba rakendas, käivitaks selle uuesti. Mitte-idempotentne SQL dubleerib seejärel andmed või peatab alglaadimise.
- **Kas vajate teistsugust skeemi?** Looge `npm run db:new-migration` abil uus migratsioon.

Ümbernimetamine on ohutu ainult faili puhul, mis pole veel ühendatud, millele viitavad värava vihjed. Väljalaskemärgend ei muuda siin midagi: iga tõuge `release/v*` harule avaldab Docker `:next` kujutise ja töötab homoloogil, VPS installidel ja ettevõtte sünkroonimisel, nii et liidetud migratsioon on käivitatud tõelistes andmebaasides enne `vX.Y.Z` märgendi olemasolu. Värav ebaõnnestub iga põhifaili eemaldamisel, olenemata sellest, kas see on märgistatud või mitte.

- **Ühendatud migratsiooni ennistamine.** Faili kustutav `git revert` rikub väravat. Hoidke faili alles ja tühistage selle skeem uues migratsioonis: `npm run db:new-migration -- <description>`, koos `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` ja nii edasi. Täiendatud ja värsked andmebaasid lõpevad seejärel sama skeemiga.
- **Üks aktsepteeritud ümbernimetamine: ühilduvuskirje ja identne sisu.** Kui liidetud fail peab liikuma (näiteks kahel liidetud failil on ajatempel ja jooksja peatub versiooni kokkupõrkega), nimetage hilisem fail ümber ilma selle SQL puudutamata ja lisage `{ fromVersion, fromName, toVersion, toName }` `RENAMED_MIGRATION_COMPATIBILITY` -le `src/lib/db/migrationRunner/constants.ts`. Vana versiooni rakendanud andmebaaside `_omniroute_migrations` rida teisaldatakse selle asemel, et faili uuesti käivitada. Värav hoiatab sellise ümbernimetamise eest ja käivitab selle alati kommutatsioonikontrolli, olenemata uuest ajatemplist: värsked installid rakendavad faili uude asukohta, täiendatud andmebaasid mitte, seega valige uus ajatempel vana lähedal. Värava ümbernimetamine ebaõnnestub, kui sisu muudetakse (skeemi muudatus toimub ikka uuel migreerimisel) või kui kirje sihtfail pole kettal.
- **Ärge kunagi nimetage ümber sama ajatempli jooksul.** Ümbernimetamine, mis säilitab ajatempli ja muudab ainult kirjeldust, ei toimi, kas sisestusega või ilma. Kirjega, mille `toVersion` võrdub selle `fromVersion`, kustutab jooksja vana `_omniroute_migrations` rea ja rakendab faili uuesti igas andmebaasis, mis seda juba käivitas. Ilma kirjeta jälgib jooksja ainult versiooni: see jätab nendes andmebaasides faili vahele (uut sisu seal kunagi ei käivitata) ja logib igal alglaadimisel ümber nummerdamisvea. Kasutage teist ajatemplit ja ühilduvuskirjet või jätke nimi alles.
- **Värav kontrollib, et ümbernimetatud fail ei töötaks uuesti.** Iga hõlmatud ümbernimetamise korral edastab värav kommutatsioonikontrollile uue failinime `--must-not-apply` abil. Kontroll käivitab uuendatud andmebaasi tõelise jooksjaga ja kui jooksja rakendab selle faili uuesti (näiteks seetõttu, et kirjel on vale versioon või nimi või kuna värava tekstiparser luges `constants.ts` erinevalt TypeScript), siis värav `migration renomeada rodaria de novo` ebaõnnestub ja palub teil kontrollida kirje vana ja uut versiooni ja nimesid.

### Mida värav baasi vastu kontrollib

Tõmbepäringu ja ühendamisjärjekorra käitamisel võrdleb `npm run check:migration-numbering` kettal olevat `src/lib/db/migrations/` sama kataloogiga põhiharus. Alus on järgmises järjekorras: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` muutuja või kui `GITHUB_EVENT_NAME` on `pull_request`, `pull_request_target` või `merge_group`, ühendamise kohustuse esimene ülem, sündmuse kasuliku koormuse `merge_group.base_sha` või `git merge-base HEAD origin/$GITHUB_BASE_REF`. Tõmbepäringu või ühendamisjärjekorra käivitamisel ilma lahendatava aluseta värav ebaõnnestub. Väljaspool CI ilma `--base` prindib see `comparação com a base: pulada (sem --base)` ja jätab need reeglid vahele.

`--base-latest-tag` võrdleb uusima väljalaskesildiga (`vX.Y.Z` semveri järjekorras; sufikseeritud silte , nagu ööbrändid , ei arvestata ), mis on `HEAD` ajaloos samade reeglitega kui `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) käivitab värava sel viisil, kuna tõuke- ja ajastatud käitamistel pole tõmbetaotluste baasi ja liitmine võib maanduda ilma värske CI käitamiseta. Kui ajaloos pole vabastamise silti, värav ebaõnnestub; käivitage `git fetch --tags` (in CI, `actions/checkout` koos `fetch-depth: 0` -ga toob sildid).

| Tõmbetaotluse muutmine                                                                                   | Tulemus                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alusel olev fail nimetatakse ümber `RENAMED_MIGRATION_COMPATIBILITY` kirjega                             | **Hoiatus** kui sisu on identne ja kommutatsioonikontroll käitatakse olenemata uuest ajatemplist; see nurjub, kui uus asukoht muudab lõplikku skeemi (võta ümbernimetamine tagasi või vali teine uus ajatempel, kus see pendeldab) või kui jooksja rakendab ümbernimetatud faili uuesti täiendatud andmebaasis.** Ebaõnnestunud** kui sisu muutub. |
| Alusel olev fail nimetatakse ümber, säilitades selle ajatempli (muutub ainult kirjeldus)                 | **Ebaõnnestunud** , kirjega või ilma: jooksja rakendab selle uuesti (koos kirjega) või jätab selle versiooni järgi vahele (ilma üheta). Kasutage teist ajatemplit ja ühilduvuskirjet või jätke nimi alles.                                                                                                                                         |
| Aluses olev fail kustutatakse või nimetatakse ümber ilma kirjeta                                         | **Ebaõnnestunud** , olenemata sellest, kas fail on väljalaskesildis või mitte. Selle tagasivõtmiseks taastage fail käsuga `git checkout <base> -- src/lib/db/migrations/<file>`; selle skeemi ennistamiseks lisage `DROP ... IF EXISTS`-ga uus migratsioon.                                                                                        |
| Alusel oleval failil on erinev sisu                                                                      | **Hoiatus** ( `::warning` -märkus GitHub toimingutes) ja kommutatsioonikontroll käivitub. See nurjub, kui redigeerimine muudab lõplikku skeemi, kuna täiendatud andmebaasid ei rakenda redigeeritud faili uuesti: pange muudatus uude migratsiooni. Kahjutu muudatus (kommentaar, `IF NOT EXISTS`) ainult hoiatab.                                 |
| Ajatempliga fail lisatakse ajatempliga, mis ei ole uuem kui baasi uusim                                  | Käivitab kommutatsioonikontrolli, mida kirjeldatakse allpool.                                                                                                                                                                                                                                                                                      |
| Vanas vormingus `NNN_` fail lisatakse numbriga baasi uusima vanas vormingus faili alla                   | **Ebaõnnestunud** , isegi kui `KNOWN_GAPS` on redigeeritud samas tõmbetaotluses: vana seeria on külmutatud, looge migratsioon käsuga `npm run db:new-migration`. Aktsepteeritakse vanas vormingus faile, mis on kõrgemad kui baasi uusim fail ( `release/v*` kuni `main` tõmbamistaotlus).                                                         |
| Ebasoodne, muudetud või ümbernimetatud fail sisaldab `INSERT`, `UPDATE`, `DELETE` või `REPLACE` avaldusi | **Hoiatus** : kommutatsioonikontroll ei võrdle andmeid, seega vaadake, kas uuendatud ja värskete andmebaaside rakendamise järjekord muudab tulemust.                                                                                                                                                                                               |

Kommutatsioonikontrolli üks käitamine hõlmab korrast ära, redigeeritud ja ümbernimetatud failid koos.

Kommutatsioonikontroll (`scripts/check/migration-commutation.ts`) loob kaks ajutist andmebaasi tegeliku installiteega: an** täiendatud** üks (käivitage põhimigratsioonidega, seejärel käivitage uuesti samast failist koos tõmbepäringu migreerimisega) ja** värske** üks (üks buut koos tõmbepäringu migreerimisega). See võrdleb saadud skeeme: tabeleid ja veerge (eirates veergude järjekorda), UNIQUE / PRIMARY KEY ja FOREIGN KEY piiranguid, iga tabeli normaliseeritud `CREATE TABLE` teksti (mis hõlmab CHECK piiranguid, võrdlusi, genereeritud veerge ja tabelivalikuid), indekseid, päästikuid ja vaateid. Rea andmeid ei võrrelda. Kui need ühtivad, prindib värav, et fail on korrast ära, kuid liigub tööle ja läheb mööda. Kui need erinevad, siis värav ebaõnnestub koos erinevuse ja vihjega: korrast ära faili puhul genereerige selle nimi `npm run db:new-migration` abil, mis on ohutu, kuna fail pole veel ühendatud; redigeeritud põhifaili puhul taastage põhisisu ja asetage muudatus uude migratsiooni; ümbernimetatud faili puhul võtke ümbernimetamine tagasi või valige selle edasi-tagasi liikumise kohta uus ajatempel, mitte kunagi sama ajatempel teise nimega. Kui kontroll ise ei käivitu, siis värav CI ebaõnnestub ja hoiatab ainult lokaalselt. Redigeeritud baasfaili puhul koostatakse täiendatud andmebaas selle faili baasi sisuga ja teine alglaadimine jätab selle vahele, kuna selle versioon on juba salvestatud. Ümbernimetatud faili puhul luuakse täiendatud andmebaas failiga selle vana nime all ja teine alglaadimine liigutab selle uuesti käivitamise asemel selle `_omniroute_migrations` rea läbi ühilduvuskirje; värav edastab uue nime koodiga `--must-not-apply`, nii et kontroll nurjub, kui teine alglaadimine seda rakendab. Kui tõmbepäringu migreerimine ei rakendu uuendatud teele, st pärast iga baasmigreerimist (olenemata sellest, kas see ka uuel installimisel ebaõnnestub või mitte), teatab värav `migration do PR não aplica` ja palub teil SQL baasi praeguse skeemi alusel parandada; kui fail sõltub teisest hilisema ajatempliga tõmbepäringu migratsioonist, genereerige selle nimi käsuga `npm run db:new-migration`.

Sama võrdluse lokaalseks käivitamiseks edastage otse põhi, näiteks `npm run check:migration-numbering -- --base origin/<base-branch>` või `npm run check:migration-numbering -- --base-latest-tag` et võrrelda uusima versiooniga.

### Avatud PR `NNN` migratsiooni teisendamine

Enne lülitit avatud tõmbamistaotlus võib siiski sisaldada järjestikust faili, näiteks `242_add_widgets.sql`. Vanad numbrid `241` kohal lükatakse tagasi, seega teisendage see enne ühendamist:

1. **Nimetage fail ümber generaatoriga, säilitades kirjelduse.** Uue nime saamiseks käivitage `npm run db:new-migration -- <same description>`, teisaldage SQL sellesse ja kustutage vana `NNN_` fail. Kirjeldus peab jääma identseks: allolev ühilduvuskirje vastab sellele.
2. **Add a compatibility entry if a persistent database ran the old number.** If any database that is kept (homolog, a VPS, a contributor's own install) ran a build of the PR with the `NNN_` file, add `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` to `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. This is **required for `237` to `241`**: those slots now hold the canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` and `241_seen_models.sql`, and without the entry such a database skips the canonical migration forever and runs the converted one again. It also works for a slot that stays empty, such as `242`, when the destination is a timestamp. When in doubt, add the entry. Where you add it in the array does not matter: when an entry's target slot still holds a row that another entry moves away (for example `237` holding a PR row while an older `usage_history_calculated_cost` row waits to move into `237`), the runner lets that entry wait until the slot is free. Only a real conflict, such as a slot held by a row no entry moves, or two entries that swap slots, stops the boot with `Cannot reconcile ...`.
3. **Hoidke SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), sest teisendatud migratsioon võib kohtuda andmebaasiga, kus selle skeem on juba olemas.
4. **Teisaldage versioonivõtmega erijuhtumeid.** Kui PR lisas oma vanale numbrile tähtede `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) või `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), muutke võti uue ajatempli vastu.

`tests/unit/db/codex-fence-migration-rename.test.ts` on toimiv näide ümbernimetatud migratsiooni testist.

### Tagasiportides filiaalidesse enne vahetust

Ärge kunagi valige või teisaldage `YYYYMMDDHHMMSS_` faili harusse, mis on varasem lülitile (nt vanem `release/v*` haru). Sealne jooksja sorteerib failinimed tekstina, nii et ajatempliga fail jookseks värskes andmebaasis `201_` ja `202_` vahel ning sealne vana värav ei mõista 14-kohalisi eesliiteid. Kirjutage sellisele harule muudatus selle haru järgmise `NNN_` failina idempotent, nii et ajatempliga versiooni saabumisel on see no-op.

### Kuidas migratsioonid kulgevad

Käivitamisel `migrationRunner.ts`:

1. Loob `_omniroute_migrations` tabeli, kui seda pole olemas
2. Päringud juba rakendatud migratsioonide kohta
3. Rakendab kõik uued migratsioonid järjekorras, igaüks tehingus
4. Salvestab iga rakendatud migratsiooni ajatempliga

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

### Idempotentsus

Ränded peavad olema** idempotentne** — nende kaks korda käivitamine peaks olema no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Kasutage `IF NOT EXISTS`, `IF EXISTS` ja `OR IGNORE` / `OR REPLACE` klausleid.

### Uue migratsiooni lisamine

1. **Looge fail generaatoriga** : `npm run db:new-migration -- <description>` (näiteks `npm run db:new-migration -- add combo priority`). See kirjutab `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` praeguse UTC ajaga ja kommentaari päisega, liigub ühe sekundi edasi, kui see ajatempel võetakse, ega kirjuta kunagi faili üle. Ära vali numbrit käsitsi.
2. **Kasutage turvalist DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Täitke andmed hoolikalt** : kasutage `UPDATE ... WHERE ...` olemasolevate ridade käsitlemiseks
4. **Kontrolli järjekorda ja nimesid** : `npm run test:migrations:fresh` (kõik migratsioonid tühjas andmebaasis) ja `npm run check:migration-numbering`. Husky pre-commit hook käivitab `check:migration-numbering` iseseisvalt, kui sisseviimine etapib faili `src/lib/db/migrations/` all, nii et käsitsi valitud või halvasti moodustatud nimi (näiteks `242_x.sql`) nurjub kohapeal kinnistamine sama sõnumiga, mille CI prindib. Konks kontrollib ainult nimesid, duplikaate ja külmutatud `001`–`241` seeriaid; võrdlus PR baasiga (eemaldatud, ümbernimetatud või korrast ära migratsioonid) käib endiselt CI
5. **Test koopia peal** : ärge kunagi käivitage tootmises testimata migratsioone
6. **Ka koodist loodud tabel vajab migreerimist** : kui moodul loob tabeli ka laisalt (`CREATE TABLE IF NOT EXISTS`, hoitakse eneseparandusteena), peab migratsioon selle looma sama DDL. Vastasel juhul lõpeb puhas installimine ja täiendatud installimine erinevate skeemidega, olenevalt sellest, kas see kooditee jooksis. `tests/unit/db/lazy-table-migration-guard.test.ts` skannib `src/` ja `open-sse/` ning ebaõnnestub laisal `CREATE` ilma migratsioonita (#20557). Näide: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Näide:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Tagasiühildumatud muudatused** (nt veergude kukutamine) on keerulised. OmniRoute kas NOT toetab — alandamist, kui migratsioon on rakendatud, on skeemi muudatus püsiv. Planeerige vastavalt.

---

## Puhkeolekus andmete krüpteerimine

Tundlikud väljad (API-võtmed, OAuthi pääsutõendid, ühendusstringid) krüpteeritakse puhkeolekus algoritmiga **AES-256-GCM**.

### Kuidas see toimib

```ts
// src/lib/db/encryption.ts (lihtsustatud)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kus seda kasutatakse

- `provider_connections.api_key` — krüpteeritud rakenduse tasemel
- `provider_connections.access_token`, `refresh_token`, `id_token` — krüpteeritud rakenduse tasemel
- `key_value` kirjed, mille puhul `namespace = "secrets"` — krüpteeritud rakenduse tasemel
- `proxy_registry.auth` — krüpteeritud rakenduse tasemel (kui see on olemas)

### Krüpteerimisvõti

Krüpteerimisvõti tuletatakse **paroolifraasist** (määratakse keskkonnamuutuja `STORAGE_ENCRYPTION_KEY` kaudu) ja **soolast** (salvestatakse andmebaasi). Andmete dekrüpteerimiseks on vaja mõlemat.

```bash
# Genereerige turvaline paroolifraas
openssl rand -hex 32

# Määrake failis .env
STORAGE_ENCRYPTION_KEY=<teie-võti>
```

> **Kriitiline**: krüpteerimisvõtme kaotamine tähendab juurdepääsu kaotamist kõigile krüpteeritud andmetele. **Varundage võti andmebaasist eraldi**.

### Mida EI krüpteerita

Jõudluse huvides salvestatakse järgmine teave avatekstina:

- Teenusepakkujate kuvatavad nimed
- Mudelite definitsioonid (juba avalikud)
- Marsruutimisreeglid
- Kasutusandmed (isikuandmed puuduvad)

---

## Krüptimise eripärad (v3.8.16+)

OmniRoute kasutab funktsiooni **`migrateLegacyEncryptedString()`**, et käsitleda läbipaistvalt kahte krüptimisskeemi:

- **Pärandvorming** (enne versiooni v3.5.0): XOR-põhine „krüptimine” (pole tegelik krüptograafia)
- **Praegune**: AES-256-GCM koos korrektse IV ja autentimismärgendiga

Migreerimisabiline tuvastab pärandvormingu ja krüptib andmed esimesel lugemisel uue skeemiga uuesti. See tähendab, et saate vana andmebaasi täiendada ilma autentimisandmeid kaotamata.

---

## Lugemisvahemälu

Sageli loetavate andmete (mudelid, pakkujad, sätted) jaoks pakub `readCache.ts` **mälusisest vahemälu**:

```ts
// Käivitamisel vahemällu salvestatud, kirjutamisel kehtetuks muudetud
const providers = await getCachedProviders(); // Kiire, mälusisene
const fresh = await listProviders(); // Aeglane, pöördub andmebaasi poole
```

| Vahemällu salvestatud olem | Vahemälu võti  | TTL                |
| -------------------------- | -------------- | ------------------ |
| `models`                   | `models:v1`    | Kuni kirjutamiseni |
| `provider_connections`     | `providers:v1` | Kuni kirjutamiseni |
| `settings`                 | `settings:v1`  | Kuni kirjutamiseni |
| `combos`                   | `combos:v1`    | Kuni kirjutamiseni |

Vahemälu muudetakse kehtetuks iga vastavasse tabelisse kirjutamise korral.

---

## Varundamine ja taastamine

### Käsitsi varundamine

```bash
# Kasutage kohaliku varukoopia loomiseks CLI-d
omniroute backup create --name pre-migration

# Või API kaudu
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Varukoopiafail sisaldab järgmist:

- Kõik andmebaasitabelid (JSON-iks serialiseeritud)
- Kõnelogi artefaktid (base64-kodeeringus, valikuline)
- Sätted ja saladused (krüptitud)
- Pistikprogrammi konfiguratsioon

### Taastamine

```bash
# CLI kaudu
omniroute restore pre-migration

# API kaudu
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Hoiatus**: taastamine kirjutab kogu andmebaasi üle. Esmalt peatage kõik kliendid.

### Automaatsed varukoopiad

```bash
# Lubage CLI kaudu automaatsed igapäevased varukoopiad
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ajastust käitab serveris tausttöö, mis käivitub iga 30 sekundi järel
(vaikimisi) ja võrdleb cron-avaldist serveri kohaliku ajaga.

| Muutuja                                     | Vaikeväärtus | Kirjeldus                                                                                                                        |
| ------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | Käivitumisintervall millisekundites (min `5000`). Sobivasse cron-minutisse usaldusväärselt jõudmiseks peab olema lühem kui 60 s. |

### SQLite'i töötava andmebaasi varundamine

Töötava andmebaasi katkestusteta varundamiseks:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

See kasutab SQLite'i veebipõhist varundus-API-t, mistõttu on käsku ohutu käitada ka OmniRoute'i töötamise ajal.

---

## Jõudluse häälestamine

### WAL režiim

WAL on vaikimisi lubatud. Suure kirjutamiskoormuse korral kaaluge järgmist.

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ei määra `journal_size_limit`. Kontrollpunkt teisaldab WAL raamid põhifaili, kuid WAL fail säilitab oma suurima eraldatud suuruse. `OMNIROUTE_WAL_GUARD_MAX_MB` valvur ainult hoiatab ja käivitab `wal_checkpoint(RESTART)`; see ei ole kettasuurune kork.

### Indeksid

Peamised jõudluse indeksid (migreerimisega automaatselt loodud):

- `idx_models_provider` — mudeli otsingud pakkuja järgi
- `idx_combo_targets_combo_id` — kombineeritud sihtmärgi laiendus
- `idx_usage_history_api_key_timestamp` — kasutusanalüüs
- `idx_quota_snapshots_api_key_window` — kvoodi jälgimine
- `idx_call_logs_timestamp` — kõnelogi päringud

Uue indeksi lisamiseks looge migratsioon.

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Mälukaardistatud I/O

Väga suurte andmebaaside (> 10GB) puhul saab mälu kaardistamist reguleerida SQLite pragma kaudu:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Tihendamine

Pikaajalised OmniRoute eksemplarid saavad aeg-ajalt `VACUUM` kasu:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Käivitage igakuiselt vähese liiklusega akende ajal. (WAL režiim vähendab vajadust, kuid ei kõrvalda seda.)

---

## Tervisekontroll

`src/lib/db/healthCheck.ts` pakub **andmebaasitaseme tervisediagnostikat**:

Mõlemad meetodid nõuavad autentimist (muidu tagastatakse `401`). `GET` ainult diagnoosib; `POST` käivitab
sama kontrolli lubatud suvandiga `autoRepair`.

```bash
GET  /api/db/health   # diagnoosimine
POST /api/db/health   # diagnoosimine + parandamine
```

Vastus on funktsiooni `runDbHealthCheck()` loodud `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domeenide eelarved viitasid API-võtmetele, mida enam ei eksisteeri.",
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

| Väli              | Tähendus                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, kui `issues` on tühi. `driver` ei mõjuta seda kunagi.                                                                                                  |
| `issues[].type`   | Üks järgmistest: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                              |
| `repairedCount`   | Selle käituse jooksul parandatud read; alati `0`, kui `autoRepair` on väär.                                                                                    |
| `backupCreated`   | Kas enne parandamist loodi varukoopia.                                                                                                                         |
| `checkedAt`       | ISO ajatempel, mida jagavad käitus ja selle kirjutatud paranduse märkus.                                                                                       |
| `driver.name`     | Kontrollitud andmebaasi teenindav SQLite'i draiver.                                                                                                            |
| `driver.degraded` | `true`, kui kirjutatud andmed pole andmebaasifailis püsivalt talletatud — `sql.js`-i WASM-varuvariant (kogu faili püsiv talletamine) või mälusisene andmebaas. |

Sama andmekoormuse tagastab MCP-tööriist `omniroute_db_health_check`.

Kahjustuste tuvastamiseks käivitage `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Peaks väljastama: ok
```

Kui see tagastab midagi muud kui `ok`, **lõpetage kohe andmebaasi kasutamine** ja taastage see varukoopiast.

---

## Taaste pärast avariid

### Stsenaarium 1: WAL-fail on kadunud

Fail `-wal` puudub, kuid `-shm` ja põhiandmebaas on alles:

```bash
# Taastub järgmisel avamisel automaatselt
omniroute
```

Kui SQLite ei suuda automaatselt taastuda:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Stsenaarium 2: Põhiandmebaasi fail on rikutud

Taastage varukoopiast:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` laadib töötavast serverist alla ainult täieliku `.tar.gz`-arhiivi
(`GET /api/db-backups/exportAll`, nõutav on operaatori autentimisteave); see ei taasta midagi.

### Stsenaarium 3: Krüpteerimisvõti on kadunud

Ilma võtmeta **pole taastamine võimalik**. Krüpteeritud väljad on loetamatud. Lisage kõik teenusepakkujad uute autentimisandmetega käsitsi uuesti.

> **Leevendus**: Varundage krüpteerimisvõti alati eraldi, eelistatavalt paroolihalduris või KMS-is.

### Stsenaarium 4: Ketas on täis

SQLite tagastab vead `SQLITE_FULL`. Vabastage kettaruumi ja seejärel käivitage:

```bash
# Tehke WAL-i kontrollpunkt, et ruumi vabastada
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Levinud toimingud

### Tabeli vaatamine

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Kõigi tabelite ridade loendamine

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Kõigi andmete lähtestamine (kustutamine)

```bash
# Esmalt peatage OmniRoute
omniroute stop

# Kustutage andmebaasifail
rm ~/.omniroute/storage.sqlite*

# Taaskäivitage (luuakse uus tühi andmebaas)
omniroute
```

**Valikuliseks** lähtestamiseks (säilitage teenusepakkujad, kustutage kasutusandmed):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Ühe tabeli eksportimine

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Tõrkeotsing

### „Andmebaas on lukustatud“

Teine protsess hoiab kirjutuslukku. Tehke üht järgmistest:

- Oodake, kuni teine protsess lõpetab (kontrollige käsuga `lsof | grep storage.sqlite`)
- Lõpetage teine protsess
- Kui probleem püsib, taaskäivitage OmniRoute

### „Välisvõtme piirangu kontroll ebaõnnestus“

Domeenimoodul rikub viiteterviklust. Kontrollige järgmist:

- Sõltuvates tabelites olevad orvuks jäänud read
- Kaskaadkustutused, mis ei levinud edasi
- Hiljutine migratsioon, mis muutis välisvõtit

Rikkumiste leidmiseks käivitage `PRAGMA foreign_key_check;`.

### „Mälu on otsas“

SQLite'i mällu vastendatud sisend/väljund ületab operatsioonisüsteemi piirangut. Vähendage seda SQLite'i pragma abil:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB 256MB asemel
```

Või keelake see:

```sql
PRAGMA mmap_size = 0;
```

### „Migratsioon ebaõnnestus poole pealt“

Migratsioon käivitati transaktsioonis, seega oleks see pidanud tagasi pöörduma. Kui seda ei juhtunud:

1. **Peatage OmniRoute** (et vältida edasisi katseid)
2. **Kontrollige andmebaasi olekut** tööriistaga `sqlite3`
3. **Parandage osaline migratsioon** käsitsi
4. **Käivitage OmniRoute uuesti** (migratsiooni proovitakse uuesti)

Selle vältimiseks testige migratsioone alati esmalt andmebaasi koopial.

---

## Vaadake ka

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kasutustabelid
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — seisundi jälgimine
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — väljalaskeprotsess
- Lähtekood: `src/lib/db/` (üle 80 faili, ~25K koodirida)
