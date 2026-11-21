# Database Schema & Operations Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Trumpai**: „OmniRoute“ kaip pagrindinę duomenų saugyklą naudoja **SQLite su WAL žurnalizavimu**, o konfidencialūs laukai ramybės būsenoje šifruojami naudojant **AES-256-GCM**. Šiame vadove aptariama schema, migracijos, atsarginių kopijų kūrimas ir atkūrimas bei eksploatavimo procedūros.

**Šaltiniai:**

- `src/lib/db/core.ts` — vienetinis objektas + SCHEMA_SQL (17 bazinių lentelių)
- `src/lib/db/migrationRunner.ts` — versijuotos migracijos
- `src/lib/db/migrations/` — 167 versijuoti SQL failai
- `src/lib/db/encryption.ts` — šifravimo pagalbinės funkcijos
- `src/lib/db/backup.ts` — atsarginių kopijų eksportavimas ir importavimas
- `src/lib/db/healthCheck.ts` — būklės diagnostika

---

## Kodėl SQLite?

„OmniRoute“ pasirinko SQLite, o ne PostgreSQL ar MySQL, dėl kelių priežasčių:

| Veiksnys              | SQLite                                    | PostgreSQL                                           |
| --------------------- | ----------------------------------------- | ---------------------------------------------------- |
| **Diegimas**          | Integruota — nereikia atskiro serverio    | Reikia sukonfigūruoti serverį                        |
| **Šifravimas**        | Programos lygmens (AES-256-GCM)           | Integruotas TDE                                      |
| **Našumas**           | Spartesnė mažoms ir vidutinėms apkrovoms  | Geresnė esant daugybei lygiagrečių įrašymo operacijų |
| **Lygiagretumas**     | WAL režimas leidžia skaityti lygiagrečiai | Visavertis MVCC                                      |
| **Atsarginė kopija**  | Vieno failo kopijavimas                   | `pg_dump` arba failų sistemos momentinė kopija       |
| **Naudojimo atvejis** | Diegimas vienam naudotojui, integruota    | Kelių nuomininkų SaaS                                |

**Vieno naudotojo ir vieno egzemplioriaus** diegimams (pagrindiniam „OmniRoute“ naudojimo atvejui) SQLite yra paprastesnė ir spartesnė.

### WAL žurnalizavimas

`core.ts` atveria duomenų bazę **WAL (išankstinio įrašymo žurnalo) režimu**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL leidžia **lygiagrečiai skaityti** vykstant įrašymo operacijoms — tai svarbu valdymo skydeliui, kuris vykdo užklausas tuo metu, kai registruojamos užklausos.

Numatytasis podėlio dydis yra **65 536 KiB (64 MiB)**. Neigiamą
`cache_size` reikšmę SQLite interpretuoja kaip apytikslę viršutinę ribą KiB vienetais ir puslapius paskirsto pagal poreikį.
Skiltyje **Nustatymai > Sistema ir saugykla > Podėlio dydis** priimamos sveikųjų skaičių reikšmės nuo **1 iki
1 000 000 KiB**; išsaugojus nustatymą, jis pritaikomas aktyviam duomenų bazės ryšiui,
o paleidimo metu „OmniRoute“ atkuria išsaugotą reikšmę.

---

## Duomenų bazės vieta

SQLite failas saugomas čia:

| OS      | Kelias                                                           |
| ------- | ---------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                    |
| macOS   | `~/.omniroute/storage.sqlite`                                    |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                        |
| Docker  | `/app/data/storage.sqlite` (konfigūruojama naudojant `DATA_DIR`) |

Papildomi failai:

- `storage.sqlite-wal` — išankstinio įrašymo žurnalas
- `storage.sqlite-shm` — bendrinamosios atminties failas
- `call_logs/` — užklausų naudingosios apkrovos artefaktai (jei įjungta)

**Vietos keitimas:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domenų modulių architektūra

„OmniRoute“ duomenų bazėje yra **110 aukščiausio lygio TypeScript modulių**, esančių `src/lib/db/`. Kiekvienas domeno modulis:

- Valdo vieną ar kelias konkrečias lenteles
- Eksportuoja tipizuotas CRUD funkcijas
- Niekada tiesiogiai nenaudoja kito modulio lentelių
- Duomenų bazei pasiekti naudoja `getDbInstance()` iš `core.ts`

### 110 aukščiausio lygio DB modulių

„OmniRoute“ turi **110 aukščiausio lygio TypeScript failų**, esančių `src/lib/db/`. Toliau pateikiama pagrindinių modulių imtis; visą sąrašą rasite katalogo turinyje:

| Modulis                 | Lentelės                                                       | Paskirtis                                                                                        |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Teikėjų registracija ir kredencialai naudojant OAuth / API raktus                                |
| `models.ts`             | `key_value` (modelių duomenys)                                 | Modelių apibrėžtys, galimybės ir kainodara                                                       |
| `combos.ts`             | `combos`                                                       | Kombinuotojo maršruto parinkimo konfigūracijos ir eiliškumas                                     |
| `apiKeys.ts`            | `api_keys`                                                     | API raktų gyvavimo ciklas, aprėptys ir kvotų stebėjimas                                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistemos konfigūracija ir bendroji KV saugykla                                                   |
| `backup.ts`             | —                                                              | Atsarginių kopijų eksportavimo ir importavimo operacijos                                         |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Tarpinių serverių konfigūracijos ir maršruto parinkimo taisyklės                                 |
| `prompts.ts`            | `prompt_templates`                                             | Pakartotinai naudojami užklausų šablonai ir versijų valdymas                                     |
| `webhooks.ts`           | `webhooks`                                                     | Įvykiais grindžiamos „webhook“ prenumeratos ir žurnalai                                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Kiekvienos užklausos audito registravimas (pasirinktinis, didelės apimties)                      |
| `domainState.ts`        | `domain_*` (5 lentelės)                                        | Domenų biudžetai, grandinės pertraukikliai, blokavimai, atsarginės grandinės ir išlaidų istorija |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Į baltąjį sąrašą įtraukti MCP/A2A API raktai                                                     |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Istorinis kvotų naudojimas                                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modelių susiejimas su numatytosiomis kombinacijomis                                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI skirta išliekamoji būsena                                                                    |
| `encryption.ts`         | —                                                              | Pagalbinės laukų šifravimo ir iššifravimo priemonės                                              |
| `readCache.ts`          | —                                                              | Atmintyje laikoma dažnų skaitymo operacijų podėlio talpykla                                      |
| `secrets.ts`            | `key_value` (užšifruoti įrašai)                                | Užšifruota paslapčių saugykla                                                                    |
| `stateReset.ts`         | —                                                              | DB būsenos išvalymas / atkūrimas testavimui                                                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Seanso kontekstas agento perdavimui                                                              |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Naudojimo stebėjimas                                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Glaudinimo konfigūracija                                                                         |

### Modulių ribos

Pagrindinė architektūros taisyklė: **moduliai tiesiogiai nepasiekia vienas kito lentelių**. Norėdami dirbti su kito modulio duomenimis, importuokite funkciją iš to modulio.

```ts
// ❌ NETEISINGAI: tiesioginė SQL užklausa iš kito modulio
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TEISINGAI: naudokite providers modulio funkciją
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Šios taisyklės laikymasis užtikrinamas atliekant kodo peržiūrą — statinės patikros nėra, tačiau pažeidimai pažymimi.

---

## Bazinė schema (17 lentelių)

`core.ts` apibrėžia 17 bazinių lentelių kintamajame `SCHEMA_SQL`. Jos sukuriamos migracijos `001_initial_schema.sql` metu ir sudaro pagrindinę schemą.

### Pagrindinės lentelės (sukuriamos pradinės migracijos metu)

| Lentelė                    | Paskirtis                                       | Pagrindiniai stulpeliai                                                 |
| -------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Teikėjo prisijungimo duomenys (šifruoti)        | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Teikėjo mazgų maršruto parinkimo informacija    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Bendroji KV saugykla                            | `namespace`, `key`, `value`                                             |
| `combos`                   | Maršruto parinkimo derinių apibrėžimai          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Tinklų sietuvo API raktai                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Duomenų bazės metaduomenys                      | `key`, `value`                                                          |
| `usage_history`            | Užklausų naudojimo įrašai                       | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Užklausų turinys ir atsakymai                   | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Tarpinio serverio užklausų žurnalai             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modelio ir teikėjo grandinės                    | `model`, `chain`                                                        |
| `domain_budgets`           | Kiekvieno domeno išlaidų biudžetai              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Biudžeto nustatymo iš naujo istorija            | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kiekvieno domeno išlaidų stebėjimas             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domeno dažnio ribojimo būsena                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kiekvieno domeno grandinės pertraukiklio būsena | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM atsakymų podėlis                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Istorinės kvotų momentinės kopijos              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Papildomos lentelės (pridėtos vėlesnių migracijų metu)

Vėlesnės migracijos prideda tokias lenteles kaip:

- `cli_tool_state` (migracija 011) — CLI įrankio būsena
- `mcp_*` lentelės — MCP serverio auditas
- `a2a_*` lentelės — A2A užduočių būsena
- `usage_*` lentelės — naudojimo stebėjimas
- `plugin_*` lentelės — papildinių sistema
- `skill_executions` — gebėjimų vykdymo istorija
- `memory_*` lentelės — atminties sistema
- `compression_*` lentelės — glaudinimo sistema
- `webhook_*` lentelės — „webhook“ pristatymo žurnalas
- `acp_*` lentelės — agento kliento protokolas
- `oneproxy_*` lentelės — „1proxy“ prekyvietė
- `proxy_assignments` — tarpinio serverio aprėpties susiejimai
- `detailed_call_artifacts` — išsamūs iškvietimų žurnalo artefaktų metaduomenys
- `quota_alert_history` — kvotų įspėjimų auditas
- `command_code_auth_sessions` — „Command Code“ OAuth seansai

Visas daugiau nei 30 lentelių sąrašas pateiktas `src/lib/db/migrations/`.

---

## Migracijos

OmniRoute naudoja** versijų, idempotentų migracijų** `src/lib/db/migrations/`. Kiekvienas perkėlimas yra vienas SQL failas. Kartu egzistuoja du pavadinimų formatai; `_omniroute_migrations` įrašyta versija yra skaitinis priešdėlis.

### Migracijos įvardijimas

| Formatas                                             | Pavyzdys                             | Naudojamas                                                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (tiksliai 3 skaitmenys)        | `241_seen_models.sql`                | Sena serija `001`–`241`. Sustabdoma, kai atsirado laiko žymos formatas (`240` ir `241` buvo sujungti prieš pat jį): joks naujas failas negauna eilės numerio. |
| `YYYYMMDDHHMMSS_description.sql` (14 skaitmenų, UTC) | `20261113120000_add_usage_index.sql` | Kiekvienas perkėlimas, sukurtas nuo 2026-11-13.                                                                                                               |

Kodėl pakeitimas: naudojant eilės numerius, lygiagrečiai PRs pasirinko tą patį kitą skaičių ir visi, išskyrus vieną, turėjo pernumeruoti prieš sujungimą. UTC laiko žyma suteikia kiekvienam PR savo versiją.

Laiko žymos formato taisyklės (vykdo `npm run check:migration-numbering`, bendrinamos su `scripts/check/lib/migrationNaming.mjs` generatoriumi):

- Laiko žyma yra tikra UTC data ir laikas, ne anksčiau kaip `20261113000000` ir ne daugiau kaip 10 minučių ateityje.
- Aprašymas yra mažosios `snake_case` prasidedančios raide (`a-z`, `0-9`, vienas `_` tarp žodžių), daugiausia 80 simbolių.
- Du failai su ta pačia laiko žyma yra pasikartojantys.
- Tarpų nebuvimo taisyklė galioja tik senoms serijoms: turi egzistuoti kiekvienas skaičius nuo `001` iki `241`, išskyrus žinomus tarpus `026`, `055` ir `121`. Ištrynus `241` (arba bet kurį seną failą), vartai nepavyksta. `001` ir `241` niekada negali būti įtraukti į `KNOWN_GAPS` leidžiamųjų sąrašą. Failai su laiko žyma niekada nesudaro tarpo.
- Kiekvienas `src/lib/db/migrations/` įrašas turi būti įprastas failas su galiojančiu `.sql` pavadinimu mažosiomis raidėmis. Katalogas, simbolinė nuoroda, `.SQL` arba `.sql.bak` failas, paslėptas failas arba pavadinimas su tarpeliu nepažeidžia vartų, nes bėgikas jį praleistų tyliai arba sudužtų paleidžiant.

**Taikyti užsakymą.** Vykdytojas rūšiuoja pagal skaitinę priešdėlio reikšmę, o ne pagal tekstą: pirmiausia seni `001`–`241` failai, tada laiko žymomis pažymėti failai laiko žymų tvarka, tada visi su `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` registruoti katalogai su vardų erdve (versijos, pvz., `ee-001`). Laukiama perkėlimo yra bet koks failas, kurio versija nėra `_omniroute_migrations`, todėl perkėlimas iš senesnės šakos, kuri sujungiama po naujesnio, vis tiek taikoma esamose duomenų bazėse.

**Laiko žyma yra kūrimo tvarka, o ne sujungimo tvarka.** Jei jūsų perkėlimas priklauso nuo lentelės arba stulpelio, sukurto perkėlus su a** naujesni** laiko žyma (pavyzdžiui, viena iš kitos PR, kuri susijungė pirmiausia), nauja duomenų bazė pirmiausia paleistų jūsų ir nepavyktų. Kol jūsų PR vis dar atidarytas, atkurkite failo pavadinimą naudodami `npm run db:new-migration`, kad jis gautų naujesnę laiko žymą, arba padarykite jį nepriklausomą. `npm run test:migrations:fresh` pritaiko kiekvieną perkėlimą į tuščią duomenų bazę ir tai sugauna.

### Sujungtas perkėlimas niekada nėra ištrintas ar pervardytas

Kai perkėlimo failas yra leidimo šakoje arba `main`, jis jau paleistas homologų ir kūrėjų duomenų bazėse, VPS diegimuose ir įmonės sinchronizavimo sistemoje. Nuo tada:

- **Niekada jo neištrinkite.** Nauji diegimai praras savo schemą, o atnaujintos duomenų bazės ją išlaikys.
- **Niekada nepervardykite.** `_omniroute_migrations` versija nebeatitiktų failo, todėl kiekviena duomenų bazė, kuri jau taikė, ją paleis dar kartą. Neidempotentas SQL tada dubliuoja duomenis arba sustabdo įkrovą.
- **Reikia kitokios schemos?** Sukurkite naują perkėlimą naudodami `npm run db:new-migration`.

Pervardinti yra saugu tik tuo atveju, kai failas dar nėra sujungtas, o tai yra vartų užuominos. Išleidimo žyma čia nieko nekeičia: kiekvienas `release/v*` filialo paspaudimas paskelbia Docker `:next` vaizdą ir paleidžiamas naudojant homologą, VPS diegimus ir įmonės sinchronizavimą, todėl sujungtas perkėlimas buvo vykdomas tikrose duomenų bazėse, kol nėra `vX.Y.Z` žymos. Vartai sugenda kiekvieną kartą pašalinus pagrindinį failą, pažymėtą ar ne.

- **Sujungto perkėlimo grąžinimas.** Failą ištrinantis `git revert` sugenda vartus. Išsaugokite failą ir anuliuokite jo schemą naujame perkėlime: `npm run db:new-migration -- <description>`, su `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` ir pan. Tada atnaujintos ir naujos duomenų bazės baigiasi ta pačia schema.
- **Vienintelis priimtas pervadinimas: suderinamumo įrašas ir identiškas turinys.** Jei sujungtas failas turi būti perkeltas (pavyzdžiui, du sujungti failai turi bendrą laiko žymą, o vykdytojas sustoja dėl versijos susidūrimo), pervardykite vėlesnį failą neliesdami jo SQL ir pridėkite `{ fromVersion, fromName, toVersion, toName }` prie `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts`. Duomenų bazėse, kuriose buvo pritaikyta senoji versija, `_omniroute_migrations` eilutė perkeliama, o ne vėl paleista failą. Vartai įspėja apie tokį pervardijimą ir visada atlieka komutavimo patikrą, kad ir kokia būtų nauja laiko žyma: naujai įdiegus failą jis pritaikomas naujoje vietoje, atnaujintose duomenų bazėse – ne, todėl pasirinkite naują laiko žymą šalia senosios. Vartai nepavyksta pervardyti, jei pasikeitė turinys (schemos pakeitimas vis tiek vyksta naujo perkėlimo metu) arba jei įrašo tikslinio failo nėra diske.
- **Niekada nepervardykite per tą pačią laiko žymą.** Pervardijimas, išsaugantis laiko žymą ir pakeičiantis tik aprašą, neveikia vartų su įrašu ar be jo. Su įrašu, kurio `toVersion` yra lygus jo `fromVersion`, vykdytojas ištrina seną `_omniroute_migrations` eilutę ir vėl pritaiko failą kiekvienoje duomenų bazėje, kurioje ji jau buvo paleista. Be įrašo, bėgikas seka tik versiją: jis praleidžia failą tose duomenų bazėse (naujas turinys niekada ten nepaleidžiamas) ir registruoja pernumeravimo klaidą kiekvieną kartą paleidžiant. Naudokite kitą laiko žymą ir suderinamumo įrašą arba pasilikite pavadinimą.
- **Vartai patikrina, ar pervadintas failas vėl nepaleidžiamas.** Kiekvienam apimtam pervadinimui vartai perduoda naują failo pavadinimą komutavimo patikrai su `--must-not-apply`. Patikrinimas paleidžia atnaujintą duomenų bazę su tikruoju bėgiku ir, jei bėgikas vėl pritaiko tą failą (pavyzdžiui, dėl to, kad įrašas turi neteisingą versiją ar pavadinimą arba dėl to, kad vartų teksto analizatorius nuskaito `constants.ts` kitaip nei TypeScript), vartai nepavyksta su `migration renomeada rodaria de novo` ir prašo patikrinti seną ir naują įrašo versijas bei pavadinimus.

### Ką vartai patikrina prieš bazę

Gavus užklausą ir sujungimo eilę, `npm run check:migration-numbering` lygina `src/lib/db/migrations/` diske su tuo pačiu katalogu pagrindinėje šakoje. Pagrindas yra tokia tvarka: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` kintamasis arba, kai `GITHUB_EVENT_NAME` yra `pull_request`, `pull_request_target` arba `merge_group`, pirmasis sujungimo įsipareigojimo tėvas, įvykio naudingosios apkrovos `merge_group.base_sha` arba `git merge-base HEAD origin/$GITHUB_BASE_REF`. Vykdant ištraukimo užklausą arba sujungimo eilę be išsprendžiamos bazės vartai sugenda. Už CI be `--base` jis spausdina `comparação com a base: pulada (sem --base)` ir praleidžia šias taisykles.

`--base-latest-tag` lyginamas su naujausia leidimo žyma (`vX.Y.Z` semver tvarka; priesaginės žymos, pvz., naktinukai nesiskaito), kuri yra `HEAD` istorijoje, su tomis pačiomis taisyklėmis kaip ir `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) paleidžia vartus tokiu būdu, nes stumti ir suplanuoti paleidimai neturi traukimo užklausų bazės, o sujungimas gali būti atliktas be naujo CI vykdymo. Jei istorijoje nėra išleidimo žymos, vartai sugenda; paleiskite `git fetch --tags` (į CI, `actions/checkout` su `fetch-depth: 0` atneša žymas).

| Pakeisti ištraukimo užklausą                                                                                 | Rezultatas                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bazėje esantis failas pervadinamas su `RENAMED_MIGRATION_COMPATIBILITY` įrašu                                | **Įspėjimas** jei turinys yra identiškas, o komutavimo patikra vykdoma nepriklausomai nuo naujos laiko žymos; ji nepavyksta, jei naujoji padėtis pakeičia galutinę schemą (anuliuoja pervardijimą arba pasirenka kitą naują laiko žymą, kur ji važiuoja į darbą ir atgal) arba jei bėgikas dar kartą pritaikytų pervadintą failą atnaujintoje duomenų bazėje.** Nepavyksta** jei pasikeitė turinys. |
| Bazėje esantis failas pervadinamas išlaikant laiko žymą (keičiasi tik aprašymas)                             | **Nepavyksta** , su įrašu arba be jo: bėgikas jį pritaikytų dar kartą (su įrašu) arba praleistų pagal versiją (be jo). Naudokite kitą laiko žymą ir suderinamumo įrašą arba pasilikite pavadinimą.                                                                                                                                                                                                  |
| Bazėje esantis failas ištrinamas arba pervadinamas be įrašo                                                  | **Nepavyksta** , nesvarbu, ar failas yra leidimo žymoje, ar ne. Norėdami tai anuliuoti, atkurkite failą naudodami `git checkout <base> -- src/lib/db/migrations/<file>`; norėdami grąžinti schemą, pridėkite naują perkėlimą naudodami `DROP ... IF EXISTS`.                                                                                                                                        |
| Bazėje esantis failas turi skirtingą turinį                                                                  | **Įspėjimas** ( `::warning` anotacija GitHub veiksmuose), ir komutacijos patikra vykdoma. Tai nepavyksta, jei redaguojant pakeičiama galutinė schema, nes atnaujintos duomenų bazės vėl netaiko redaguoto failo: pakeiskite pakeitimą į naują perkėlimą. Nekenksmingas redagavimas (komentaras, `IF NOT EXISTS`) tik įspėja.                                                                        |
| Failas su laiko žyma pridedamas su ne naujesne laiko žyma nei naujausia bazės žyma                           | Vykdo komutavimo patikrą, aprašytą toliau.                                                                                                                                                                                                                                                                                                                                                          |
| Seno formato `NNN_` failas pridedamas su numeriu po naujausiu seno formato failu                             | **Nepavyksta** , net jei `KNOWN_GAPS` redaguojamas toje pačioje ištraukimo užklausoje: senoji serija užšaldyta, sukurkite perkėlimą naudodami `npm run db:new-migration`. Priimami seno formato failai, viršijantys naujausią bazinį failą (užklausa iš `release/v*` į `main` ).                                                                                                                    |
| Netvarkingame, redaguotame arba pervadintame faile yra `INSERT`, `UPDATE`, `DELETE` arba `REPLACE` teiginiai | **Įspėjimas** : komutavimo patikra nelygina duomenų, todėl patikrinkite, ar tvarka, kuria atnaujintos ir naujos duomenų bazės taiko, keičia rezultatą.                                                                                                                                                                                                                                              |

Viena komutavimo patikros eiga apima netvarkingus, redaguotus ir pervardytus failus kartu.

Komutavimo patikra (`scripts/check/migration-commutation.ts`) sukuria dvi laikinas duomenų bazes su tikruoju diegimo keliu: an** atnaujintas** vienas (paleisti naudojant bazinius perkėlimus, tada vėl paleisti iš to paties failo su ištraukimo užklausos perkėlimu) ir** šviežias** vienas (vienas įkrovimas su ištraukimo užklausos perkėlimu). Jis lygina gautas schemas: lenteles ir stulpelius (nepaisant stulpelių tvarkos), UNIQUE / PRIMARY KEY ir FOREIGN KEY apribojimus, kiekvienos lentelės normalizuotą `CREATE TABLE` tekstą (kuris apima CHECK apribojimus, palyginimus, sugeneruotus stulpelius ir lentelės parinktis), indeksus, trigerius ir rodinius. Eilučių duomenys nelyginami. Jei jie sutampa, vartai išspausdina, kad failas neveikia, bet važiuoja į darbą ir atgal, ir praeina. Jei jie skiriasi, vartai sugenda su skirtumu ir užuomina į atvejį: jei failas yra netvarkingas, atkurkite jo pavadinimą naudodami `npm run db:new-migration`, o tai saugu, nes failas dar nesujungtas; redaguotame baziniame faile atkurkite pagrindinį turinį ir pakeiskite pakeitimą į naują perkėlimą; jei failas yra pervardytas, anuliuokite pervadinimą arba pasirinkite kitą naują laiko žymą, kurioje jis persikelia į darbą ir atgal, niekada nenaudokite tos pačios laiko žymos su kitu pavadinimu. Jei pats patikrinimas negali paleisti, vartai sugenda CI ir įspėja tik vietoje. Redaguotam baziniam failui atnaujinta duomenų bazė sukuriama naudojant bazinį to failo turinį, o antrasis įkrovimas jį praleidžia, nes jo versija jau įrašyta. Pervadinto failo atveju atnaujinta duomenų bazė sukuriama naudojant failą senuoju pavadinimu, o antrasis įkrovimas perkelia savo `_omniroute_migrations` eilutę per suderinamumo įrašą, o ne paleidžia iš naujo; vartai perduoda naują pavadinimą su `--must-not-apply`, todėl patikrinimas nepavyksta, jei jį pritaiko antrasis įkrovimas. Jei ištraukimo užklausos perkėlimas nepavyksta pritaikyti atnaujintame kelyje, t. y. po kiekvieno bazinio perkėlimo (nesvarbu, ar nepavyksta ir naujai diegiant), vartai praneša `migration do PR não aplica` ir prašo pataisyti SQL pagal dabartinę bazės schemą; jei failas priklauso nuo kitos ištraukimo užklausos perkėlimo su vėlesne laiko žyma, iš naujo sukurkite jo pavadinimą naudodami `npm run db:new-migration`.

Norėdami atlikti tą patį palyginimą vietoje, aiškiai perduokite bazę, pvz., `npm run check:migration-numbering -- --base origin/<base-branch>` arba `npm run check:migration-numbering -- --base-latest-tag` kad palygintumėte su naujausiu leidimu.

### Atviro PR `NNN` perkėlimo konvertavimas

Ištraukimo užklausa, atidaryta prieš jungiklį, vis tiek gali turėti nuoseklų failą, pvz., `242_add_widgets.sql`. Seni skaičiai virš `241` atmetami, todėl prieš sujungdami konvertuokite juos:

1. **Pervardykite failą naudodami generatorių, išlaikydami aprašymą.** Paleiskite `npm run db:new-migration -- <same description>`, kad gautumėte naują pavadinimą, perkelkite į jį SQL ir ištrinkite seną `NNN_` failą. Aprašymas turi išlikti identiškas: toliau esantis suderinamumo įrašas atitinka jį.
2. **Pridėkite suderinamumo įrašą, jei nuolatinėje duomenų bazėje buvo paleistas senasis numeris.** Jei kuri nors saugoma duomenų bazė (homologas, VPS, paties bendraautorio įdiegimas) paleido PR kūrimą su `NNN_` failu, pridėkite `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` prie `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts`. Tai yra** reikalingas nuo `237` iki `241`** : tuose lizduose dabar yra kanoniniai `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` ir `241_seen_models.sql`, o be įrašo tokia duomenų bazė kanoninį perkėlimą praleidžia visiems laikams ir vėl paleidžia konvertuotą. Jis taip pat tinka lizdui, kuris lieka tuščias, pvz., `242`, kai paskirties vieta yra laiko žyma. Jei abejojate, pridėkite įrašą. Nesvarbu, kur jį įtrauksite į masyvą: kai įrašo tikslinėje srityje vis dar yra eilutė, nuo kurios kitas įrašas nutolsta (pavyzdžiui, `237` turi PR eilutę, o senesnė `usage_history_calculated_cost` eilutė laukia, kol bus perkelta į `237`), bėgikas leidžia šiam įrašui palaukti, kol lizdas bus laisvas. Tik tikras konfliktas, pvz., lizdas, esantis eilutėje, kurioje įrašas nejuda, arba du įrašai, kurie sukeičia lizdus, sustabdo įkrovą naudojant `Cannot reconcile ...`.
3. **Laikykite SQL idempotentą** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), nes konvertuotas perkėlimas gali susidurti su duomenų baze, kurioje jos schema jau yra.
4. **Perkelkite specialius atvejus pagal versiją.** Jei PR senajam numeriui pridėjo didžiąją raidę `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) arba `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), pakeiskite raktą į naują laiko žymą.

`tests/unit/db/codex-fence-migration-rename.test.ts` yra veikiantis pervadinto perkėlimo testo pavyzdys.

### Grįžta į filialus prieš perjungimą

Niekada neperkelkite arba neperkelkite `YYYYMMDDHHMMSS_` failo į šaką, kuri buvo ankstesnė nei perjungimas (pvz., senesnė `release/v*` šaka). Ten esantis bėgikas failų pavadinimus rūšiuoja kaip tekstą, todėl failas su laiko žyma būtų paleistas tarp `201_` ir `202_` naujoje duomenų bazėje, o ten esantys vartai nesupranta 14 skaitmenų priešdėlių. Tokioje šakoje pakeitimą parašykite kaip tos šakos kitą `NNN_` failą, idempotent, taigi, kai laiko žyma pažymėta versija gaunama vėliau, tai yra no-op.

### Kaip vyksta migracijos

Paleidžiant `migrationRunner.ts`:

1. Sukuria `_omniroute_migrations` lentelę, jei jos nėra
2. Jau pritaikytų perkėlimų užklausos
3. Taiko bet kokius naujus perkėlimus eilės tvarka, kiekvieną operaciją
4. Įrašo kiekvieną pritaikytą perkėlimą su laiko žyma

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

### Idempotencija

Migracijos turi būti** idempotentas** — paleisti juos du kartus turėtų būti neveiksminga:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Drąsiai naudokite sakinius `IF NOT EXISTS`, `IF EXISTS` ir `OR IGNORE` / `OR REPLACE`.

### Naujo perkėlimo pridėjimas

1. **Sukurkite failą naudodami generatorių** : `npm run db:new-migration -- <description>` (pavyzdžiui, `npm run db:new-migration -- add combo priority`). Jis įrašo `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` su dabartiniu UTC laiku ir komentaro antrašte, pasislenka viena sekunde į priekį, jei paimama ta laiko žyma, ir niekada neperrašo failo. Nesirinkite numerio ranka.
2. **Naudokite saugų DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Atidžiai užpildykite duomenis** : naudokite `UPDATE ... WHERE ...` esamoms eilutėms tvarkyti
4. **Patikrinkite užsakymą ir pavadinimą** : `npm run test:migrations:fresh` (visos migracijos tuščioje duomenų bazėje) ir `npm run check:migration-numbering`
5. **Bandymas ant kopijos** : niekada nevykdykite neišbandytų perkėlimo gamyboje
6. **Iš kodo sukurtą lentelę taip pat reikia perkelti** : jei modulis taip pat tingiai sukuria lentelę (`CREATE TABLE IF NOT EXISTS`, saugomas kaip savaiminio gydymo kelias), perkėlimas turi sukurti ją su tuo pačiu DDL. Priešingu atveju švarus diegimas ir atnaujintas diegimas baigiasi skirtingomis schemomis, atsižvelgiant į tai, ar tas kodo kelias buvo paleistas. `tests/unit/db/lazy-table-migration-guard.test.ts` nuskaito `src/` ir `open-sse/` ir nepavyksta naudojant tingų `CREATE` be perkėlimo (#20557). Pavyzdys: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Pavyzdys:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Su atgal nesuderinami pakeitimai** (pvz., nuleisti stulpelius) yra sudėtinga. OmniRoute ar NOT palaiko — pažeminimą, kai taikomas perkėlimas, schemos pakeitimas yra nuolatinis. Atitinkamai planuokite.

---

## Duomenų šifravimas saugykloje

Neskelbtini laukai (API raktai, OAuth prieigos raktai, prisijungimo eilutės) saugykloje šifruojami naudojant **AES-256-GCM**.

### Kaip tai veikia

```ts
// src/lib/db/encryption.ts (supaprastinta)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kur tai naudojama

- `provider_connections.api_key` — šifruojama programos lygmeniu
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifruojama programos lygmeniu
- `key_value` įrašai, kurių `namespace = "secrets"` — šifruojami programos lygmeniu
- `proxy_registry.auth` — šifruojama programos lygmeniu (jei yra)

### Šifravimo raktas

Šifravimo raktas išvedamas iš **slaptafrazės** (nustatomos naudojant aplinkos kintamąjį `STORAGE_ENCRYPTION_KEY`) ir **druskos** (saugomos DB). Duomenims iššifruoti reikia abiejų.

```bash
# Sugeneruokite saugią slaptafrazę
openssl rand -hex 32

# Nustatykite .env faile
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiškai svarbu**: praradus šifravimo raktą, bus prarasta prieiga prie visų užšifruotų duomenų. **Sukurkite atskirą rakto atsarginę kopiją, nesaugodami jos kartu su duomenų baze**.

### Kas NEŠIFRUOJAMA

Siekiant geresnio našumo, toliau nurodyti duomenys saugomi atviruoju tekstu:

- Teikėjų rodomi pavadinimai
- Modelių apibrėžtys (jos jau viešos)
- Maršruto parinkimo taisyklės
- Naudojimo įrašai (be asmens identifikavimo informacijos)

---

## Šifravimo ypatumai (v3.8.16+)

OmniRoute naudoja **`migrateLegacyEncryptedString()`**, kad skaidriai palaikytų dvi šifravimo schemas:

- **Senoji** (iki v3.5.0): XOR pagrįstas „šifravimas“ (ne tikra kriptografija)
- **Dabartinė**: AES-256-GCM su tinkamu IV ir autentifikavimo žyma

Perkėlimo pagalbinė funkcija aptinka senąjį formatą ir pirmą kartą nuskaičius iš naujo užšifruoja duomenis naudodama naująją schemą. Tai reiškia, kad galite atnaujinti seną duomenų bazę neprarasdami prisijungimo duomenų.

---

## Skaitymo podėlis

Dažnai skaitomiems duomenims (modeliams, teikėjams, nustatymams) `readCache.ts` suteikia **atmintyje laikomą podėlį**:

```ts
// Paleidžiant įrašoma į podėlį, rašant podėlio įrašas panaikinamas
const providers = await getCachedProviders(); // Greita, iš atminties
const fresh = await listProviders(); // Lėta, kreipiamasi į DB
```

| Podėlyje laikomas objektas | Podėlio raktas | TTL         |
| -------------------------- | -------------- | ----------- |
| `models`                   | `models:v1`    | Iki įrašymo |
| `provider_connections`     | `providers:v1` | Iki įrašymo |
| `settings`                 | `settings:v1`  | Iki įrašymo |
| `combos`                   | `combos:v1`    | Iki įrašymo |

Podėlis panaikinamas po kiekvieno įrašymo į atitinkamą lentelę.

---

## Atsarginės kopijos ir atkūrimas

### Rankinis atsarginės kopijos kūrimas

```bash
# Naudokite CLI vietinei atsarginei kopijai sukurti
omniroute backup create --name pre-migration

# Arba per API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Atsarginės kopijos faile yra:

- Visos DB lentelės (serializuotos į JSON)
- Iškvietimų žurnalo artefaktai (užkoduoti base64, neprivalomi)
- Nustatymai ir paslaptys (užšifruoti)
- Papildinių konfigūracija

### Atkūrimas

```bash
# Per CLI
omniroute restore pre-migration

# Per API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Įspėjimas**: atkuriant perrašoma visa DB. Pirmiausia sustabdykite visus klientus.

### Automatinės atsarginės kopijos

```bash
# Įjunkite automatinį kasdienį atsarginių kopijų kūrimą per CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Tvarkaraštį serverio pusėje vykdo foninė užduotis, kuri suaktyvinama kas 30 sekundžių
(numatytoji reikšmė) ir įvertina cron išraišką pagal vietinį serverio laiką.

| Kintamasis                                  | Numatytoji reikšmė | Aprašymas                                                                                                                                      |
| ------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`            | Suaktyvinimo intervalas milisekundėmis (min. `5000`). Kad patikimai pataikytų į atitinkančią cron minutę, jis turi būti trumpesnis nei 60 sek. |

### Operatyvusis SQLite atsarginės kopijos kūrimas

Veikiančios DB atsarginei kopijai sukurti be prastovos:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tam naudojama SQLite internetinio atsarginių kopijų kūrimo API — komandą saugu vykdyti, kol veikia OmniRoute.

---

## Našumo derinimas

### WAL režimas

WAL įjungtas pagal numatytuosius nustatymus. Jei darbo krūvis yra didelis, apsvarstykite:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute nenustato `journal_size_limit`. Kontrolinis taškas perkelia WAL kadrus į pagrindinį failą, tačiau WAL failas išlaiko didžiausią skirtą dydį. `OMNIROUTE_WAL_GUARD_MAX_MB` apsauga tik perspėja ir paleidžia `wal_checkpoint(RESTART)`; tai nėra disko dydžio dangtelis.

### Indeksai

Pagrindiniai našumo indeksai (automatiškai sukuriami perkėlus):

- `idx_models_provider` — modelio paieškos pagal teikėją
- `idx_combo_targets_combo_id` — kombinuotas taikinio išplėtimas
- `idx_usage_history_api_key_timestamp` — naudojimo analitika
- `idx_quota_snapshots_api_key_window` — kvotos stebėjimas
- `idx_call_logs_timestamp` — skambučių žurnalo užklausos

Norėdami pridėti naują indeksą, sukurkite perkėlimą:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Atminties žemėlapis I/O

Labai didelėms duomenų bazėms (> 10GB) atminties atvaizdavimą galima reguliuoti naudojant SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sutankinimas

Ilgai veikiantiems OmniRoute egzemplioriams kartais naudingas `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Mažo srauto langais paleiskite kas mėnesį. (WAL režimas sumažina poreikį, bet jo nepanaikina.)

---

## Būklės patikra

`src/lib/db/healthCheck.ts` teikia **duomenų bazės lygmens būklės diagnostiką**:

Abiem metodams būtinas autentifikavimas (kitu atveju grąžinama `401`). `GET` tik atlieka diagnostiką, o `POST` vykdo tą pačią patikrą su įjungtu `autoRepair`.

```bash
GET  /api/db/health   # diagnostika
POST /api/db/health   # diagnostika + taisymas
```

Atsakyme pateikiamas `DbHealthCheckResult`, kurį sugeneruoja `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domenų biudžetuose buvo nurodyti API raktai, kurie nebeegzistuoja.",
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

| Laukas            | Reikšmė                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, kai `issues` yra tuščias. `driver` niekada neturi tam įtakos.                                                                                                |
| `issues[].type`   | Viena iš šių reikšmių: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                              |
| `repairedCount`   | Šio vykdymo metu pataisytos eilutės; visada `0`, kai `autoRepair` yra false.                                                                                         |
| `backupCreated`   | Ar prieš taisymą buvo sukurta atsarginė kopija.                                                                                                                      |
| `checkedAt`       | ISO laiko žyma, bendra vykdymui ir bet kokiai jo įrašytai taisymo pastabai.                                                                                          |
| `driver.name`     | Patikrintą duomenų bazę aptarnaujanti SQLite tvarkyklė.                                                                                                              |
| `driver.degraded` | `true`, kai įrašymai nėra patikimai išsaugomi duomenų bazės faile — naudojant `sql.js` WASM atsarginį variantą (viso failo išsaugojimą) arba atmintinę duomenų bazę. |

Tą patį naudingosios apkrovos objektą grąžina MCP įrankis `omniroute_db_health_check`.

Norėdami aptikti pažeidimus, vykdykite `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Turėtų išvesti: ok
```

Jei grąžinama bet kokia kita reikšmė nei `ok`, **nedelsdami nustokite naudoti duomenų bazę** ir atkurkite ją iš atsarginės kopijos.

---

## Atkūrimas po gedimo

### 1 scenarijus: prarastas WAL failas

`-wal` failo nėra, tačiau `-shm` failas ir pagrindinė DB nepažeisti:

```bash
# Automatiškai atkuriama kitą kartą atidarius
omniroute
```

Jei SQLite negali automatiškai atkurti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2 scenarijus: sugadintas pagrindinis DB failas

Atkurkite iš atsarginės kopijos:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` tik atsisiunčia visą `.tar.gz` archyvą iš veikiančio serverio
(`GET /api/db-backups/exportAll`, reikalingi operatoriaus prisijungimo duomenys); ši komanda nieko neatkuria.

### 3 scenarijus: prarastas šifravimo raktas

Be rakto **atkurti neįmanoma**. Užšifruotų laukų perskaityti negalima. Rankiniu būdu iš naujo pridėkite visus teikėjus naudodami naujus prisijungimo duomenis.

> **Rizikos mažinimas**: visada atskirai kurkite atsarginę šifravimo rakto kopiją, geriausia – slaptažodžių tvarkytuvėje arba KMS.

### 4 scenarijus: pilnas diskas

SQLite grąžins `SQLITE_FULL` klaidas. Atlaisvinkite vietos diske, tada vykdykite:

```bash
# Sukurkite WAL kontrolinį tašką, kad atlaisvintumėte vietos
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Dažnos operacijos

### Lentelės peržiūra

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Eilučių skaičiavimas visose lentelėse

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Visų duomenų nustatymas iš naujo (ištrynimas)

```bash
# Pirmiausia sustabdykite OmniRoute
omniroute stop

# Ištrinkite DB failą
rm ~/.omniroute/storage.sqlite*

# Paleiskite iš naujo (bus iš naujo sukurta tuščia DB)
omniroute
```

Norėdami atlikti **pasirinktinį** nustatymą iš naujo (išsaugoti teikėjus, ištrinti naudojimo duomenis):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Vienos lentelės eksportavimas

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Trikčių šalinimas

### „Duomenų bazė užrakinta“

Kitas procesas laiko rašymo užraktą. Galite:

- Palaukti, kol kitas procesas bus baigtas (patikrinkite naudodami `lsof | grep storage.sqlite`)
- Priverstinai nutraukti kitą procesą
- Jei problema išlieka, paleisti OmniRoute iš naujo

### „Pažeistas išorinio rakto apribojimas“

Domeno modulis pažeidžia nuorodų vientisumą. Patikrinkite:

- Nesusietas eilutes priklausomose lentelėse
- Pakopinius trynimus, kurie nebuvo perduoti
- Naujausią migraciją, kuri pakeitė išorinį raktą

Paleiskite `PRAGMA foreign_key_check;`, kad rastumėte pažeidimus.

### „Trūksta atminties“

SQLite į atmintį susietos įvesties / išvesties naudojimas viršija OS ribą. Sumažinkite ją naudodami SQLite pragmą:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB vietoje 256MB
```

Arba išjunkite:

```sql
PRAGMA mmap_size = 0;
```

### „Migracija nutrūko nebaigta“

Migracija buvo vykdoma operacijoje, todėl pakeitimai turėjo būti atšaukti. Jei taip neįvyko:

1. **Sustabdykite OmniRoute** (kad išvengtumėte tolesnių bandymų)
2. **Patikrinkite DB būseną** naudodami `sqlite3`
3. **Rankiniu būdu pataisykite** dalinę migraciją
4. **Iš naujo paleiskite** OmniRoute (migracija bus bandoma dar kartą)

Kad to išvengtumėte, migracijas visada pirmiausia išbandykite kopijoje.

---

## Taip pat žr.

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — naudojimo lentelės
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — būklės stebėjimas
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — leidimo procesas
- Šaltinis: `src/lib/db/` (daugiau nei 80 failų, ~25 tūkst. kodo eilučių)
