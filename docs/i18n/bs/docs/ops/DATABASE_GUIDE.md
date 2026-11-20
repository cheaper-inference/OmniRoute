# Database Schema & Operations Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

# Vodič kroz šemu baze podataka i operacije

> **TL;DR**: OmniRoute koristi **SQLite sa WAL žurnaliranjem** kao primarnu pohranu, uz **AES-256-GCM** enkripciju u stanju mirovanja za osjetljiva polja. Ovaj vodič pokriva šemu, migracije, sigurnosne kopije/oporavak i operativne priručnike.

**Izvori:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 osnovnih tabela)
- `src/lib/db/migrationRunner.ts` — verzionisane migracije
- `src/lib/db/migrations/` — 167 verzionisanih SQL datoteka
- `src/lib/db/encryption.ts` — pomoćni alati za enkripciju
- `src/lib/db/backup.ts` — izvoz/uvoz sigurnosnih kopija
- `src/lib/db/healthCheck.ts` — dijagnostika stanja

---

## Zašto SQLite?

OmniRoute je odabrao SQLite umjesto PostgreSQL/MySQL iz nekoliko razloga:

| Faktor                | SQLite                                  | PostgreSQL                            |
| --------------------- | --------------------------------------- | ------------------------------------- |
| **Implementacija**    | Ugrađeno — nije potreban poseban server | Zahtijeva postavljanje servera        |
| **Enkripcija**        | Sloj aplikacije (AES-256-GCM)           | Ugrađeni TDE                          |
| **Performanse**       | Brže za mala/srednja opterećenja        | Bolje za ogromne istovremene upise    |
| **Konkurentnost**     | WAL režim omogućava istovremena čitanja | Puni MVCC                             |
| **Sigurnosna kopija** | Kopija jedne datoteke                   | `pg_dump` ili snimak sistema datoteka |
| **Slučaj upotrebe**   | Instalacija po korisniku, ugrađeno      | Multi-tenant SaaS                     |

Za implementacije sa **jednim korisnikom i jednom instancom** (primarni slučaj upotrebe OmniRoute-a), SQLite je jednostavniji i brži.

### WAL žurnaliranje

`core.ts` otvara bazu podataka sa **WAL (Write-Ahead Logging) režimom**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL omogućava **istovremena čitanja** tokom upisa — važno za kontrolnu ploču, koja vrši upite dok se zahtjevi snimaju.

Zadana veličina keša je **65,536 KiB (64 MiB)**. SQLite interpretira negativan `cache_size` kao približnu gornju granicu u KiB i dodjeljuje stranice na zahtjev.
**Settings > System & Storage > Cache Size** prihvata cjelobrojne vrijednosti od **1 do 1,000,000 KiB**; spremanje postavke primjenjuje je na aktivnu konekciju baze podataka, a OmniRoute vraća sačuvanu vrijednost pri pokretanju.

---

## Lokacija baze podataka

SQLite datoteka je pohranjena na:

| OS      | Putanja                                                     |
| ------- | ----------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                               |
| macOS   | `~/.omniroute/storage.sqlite`                               |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker  | `/app/data/storage.sqlite` (konfigurisano putem `DATA_DIR`) |

Prateće datoteke:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — datoteka dijeljene memorije
- `call_logs/` — artefakti sadržaja zahtjeva (ako je omogućeno)

**Nadjačajte lokaciju:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitektura domenskih modula

OmniRoute baza podataka ima **110 TypeScript modula najvišeg nivoa** u `src/lib/db/`. Svaki domenski modul:

- Posjeduje jednu ili više specifičnih tabela
- Eksportuje tipizirane CRUD funkcije
- Nikada ne pristupa tabelama drugog modula
- Koristi `getDbInstance()` iz `core.ts` za pristup bazi podataka

### 110 DB modula najvišeg nivoa

OmniRoute ima **110 TypeScript datoteka najvišeg nivoa** u `src/lib/db/`. Ispod je uzorak osnovnih modula; pogledajte listu direktorija za kompletnu listu:

| Modul                   | Tabele                                                         | Odgovornost                                                                          |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Registracija provajdera OAuth/API ključeva i akreditivi                              |
| `models.ts`             | `key_value` (podaci o modelu)                                  | Definicije modela, mogućnosti, cijene                                                |
| `combos.ts`             | `combos`                                                       | Konfiguracije rutiranja kombinacija i redoslijed                                     |
| `apiKeys.ts`            | `api_keys`                                                     | Životni ciklus API ključeva, opsezi, praćenje kvota                                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistemska konfiguracija i dijeljeno KV skladište                                     |
| `backup.ts`             | —                                                              | Operacije izvoza/uvoza rezervnih kopija                                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy konfiguracije i pravila rutiranja                                              |
| `prompts.ts`            | `prompt_templates`                                             | Višekratni šabloni promptova, verziranje                                             |
| `webhooks.ts`           | `webhooks`                                                     | Pretplate na webhook-ove vođene događajima i logovi                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit logovanje po zahtjevu (opciono, visok volumen)                                 |
| `domainState.ts`        | `domain_*` (5 tabela)                                          | Budžeti domena, circuit breaker-i, zaključavanja, fallback lanci, historija troškova |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API ključevi na bijeloj listi za MCP/A2A                                             |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historijska upotreba kvota                                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapiranje modela na podrazumijevane kombinacije                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | Perzistentno stanje specifično za CLI                                                |
| `encryption.ts`         | —                                                              | Pomoćne funkcije za enkripciju/dekripciju polja                                      |
| `readCache.ts`          | —                                                              | In-memory keš za operacije sa puno čitanja                                           |
| `secrets.ts`            | `key_value` (enkriptovani unosi)                               | Skladište enkriptovanih tajni                                                        |
| `stateReset.ts`         | —                                                              | Brisanje/resetovanje stanja baze podataka za testiranje                              |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesije za primopredaju agenta                                               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Praćenje upotrebe                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracija kompresije                                                             |

### Granice modula

Osnovno arhitektonsko pravilo: **moduli ne pristupaju direktno tabelama drugih modula**. Da biste radili sa podacima drugog modula, importujte funkciju iz tog modula.

```ts
// ❌ POGREŠNO: direktan SQL iz drugog modula
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ISPRAVNO: koristite funkciju modula providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ovo pravilo se provodi putem pregleda koda — ne postoji statička provjera, ali se kršenja označavaju.

---

## Osnovna šema (17 tabela)

`core.ts` definiše 17 osnovnih tabela u `SCHEMA_SQL`. One se kreiraju migracijom `001_initial_schema.sql` i čine osnovnu šemu.

### Osnovne tabele (kreirane u početnoj migraciji)

| Tabela                     | Namjena                                      | Ključne kolone                                                          |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Akreditivi provajdera (enkriptovani)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informacije o rutiranju čvorova provajdera   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Opšta KV (ključ-vrijednost) memorija         | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicije kombinacija rutiranja             | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API ključevi za gateway                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metapodaci baze podataka                     | `key`, `value`                                                          |
| `usage_history`            | Zapisi o korišćenju zahtjeva                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload-ovi i odgovori zahtjeva              | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logovi proxy zahtjeva                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Lanci model-ka-provajderu                    | `model`, `chain`                                                        |
| `domain_budgets`           | Budžeti potrošnje po domenu                  | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Istorija resetovanja budžeta                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Praćenje troškova po domenu                  | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stanje ograničenja stope (rate-limit) domena | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stanje prekidača (circuit breaker) po domenu | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Keš LLM odgovora                             | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Istorijski snimci kvota                      | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatne tabele (dodate kasnijim migracijama)

Naknadne migracije dodaju tabele kao što su:

- `cli_tool_state` (migracija 011) — stanje CLI alata
- `mcp_*` tabele — revizija MCP servera
- `a2a_*` tabele — stanje A2A zadatka
- `usage_*` tabele — praćenje korišćenja
- `plugin_*` tabele — sistem dodataka (plugin sistem)
- `skill_executions` — istorija izvršavanja vještina
- `memory_*` tabele — sistem memorije
- `compression_*` tabele — sistem kompresije
- `webhook_*` tabele — log isporuke webhook-ova
- `acp_*` tabele — Agent Client Protocol
- `oneproxy_*` tabele — 1proxy tržište
- `proxy_assignments` — povezivanja opsega proxy-ja
- `detailed_call_artifacts` — metapodaci artefakata logova poziva
- `quota_alert_history` — revizija upozorenja o kvotama
- `command_code_auth_sessions` — Command Code OAuth sesije

Kompletna lista od ~30+ tabela se nalazi u `src/lib/db/migrations/`.

---

## Migracije

OmniRoute koristi** verzionisane, idempotentne migracije** u `src/lib/db/migrations/`. Svaka migracija je jedna SQL datoteka. Dva formata imenovanja koegzistiraju; verzija snimljena u `_omniroute_migrations` je numerički prefiks.

### Imenovanje migracije

| Format                                            | Primjer                              | Koristi se za                                                                                                                                                              |
| ------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (tačno 3 cifre)             | `241_seen_models.sql`                | Stara serija `001`–`241`. Zamrznuto kada se format vremenske oznake spustio (`240` i `241` su spojeni neposredno prije njega): nijedna nova datoteka ne dobija redni broj. |
| `YYYYMMDDHHMMSS_description.sql` (14 cifara, UTC) | `20261113120000_add_usage_index.sql` | Svaka migracija kreirana od 2026-11-13.                                                                                                                                    |

Zašto promjena: sa sekvencijalnim brojevima, paralelni PRs je odabrao isti sljedeći broj i svi osim jednog morali su prenumerirati prije spajanja. UTC vremenska oznaka daje svakom PR svoju verziju.

Pravila za format vremenske oznake (nametnuta od strane `npm run check:migration-numbering`, dijeljena s generatorom u `scripts/check/lib/migrationNaming.mjs`):

- Vremenska oznaka je pravi UTC datum i vrijeme, ne ranije od `20261113000000` i ne više od 10 minuta u budućnosti.
- Opis je `snake_case` malim slovima koji počinje slovom (`a-z`, `0-9`, jedan `_` između riječi), najviše 80 znakova.
- Dva fajla sa istom vremenskom oznakom su duplikat.
- Pravilo bez razmaka primjenjuje se samo na stari niz: svaki broj od `001` do `241` mora postojati, osim poznatih praznina `026`, `055` i `121`. Brisanje `241` (ili bilo koje stare datoteke) ne uspijeva. `001` i `241` se nikada ne mogu dodati na `KNOWN_GAPS` listu dozvoljenih. Datoteke sa vremenskim žigom nikada ne stvaraju prazninu.
- Svaki unos u `src/lib/db/migrations/` mora biti običan fajl sa važećim malim slovima `.sql` imenom. Direktorij, simbolička veza, `.SQL` ili `.sql.bak` datoteka, skrivena datoteka ili ime sa razmakom ne uspijevaju na kapiji, jer bi ga runner tiho preskočio ili bi se srušio pri pokretanju.

**Primijenite narudžbu.** Runner sortira prema numeričkoj vrijednosti prefiksa, a ne po tekstu: prvo stare datoteke `001`–`241`, zatim datoteke s vremenskim žigom u redoslijedu vremenske oznake, zatim bilo koji imenski direktorij registriran sa `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (verzije kao što je `ee-001`). Migracija na čekanju je svaka datoteka čija verzija nije u `_omniroute_migrations`, tako da se migracija sa starije grane koja se spaja nakon novije i dalje primjenjuje na postojeće baze podataka.

**Vremenska oznaka je redoslijed kreiranja, a ne redoslijed spajanja.** Ako vaša migracija ovisi o tablici ili stupcu kreiranoj migracijom s a** novije** vremenska oznaka (na primjer, jedna iz druge PR koja se prva spojila), nova baza podataka bi prva pokrenula vašu i propala. Dok je vaš PR još uvijek otvoren, regenerirajte ime datoteke pomoću `npm run db:new-migration` tako da dobije noviju vremensku oznaku ili ga učinite neovisnim. `npm run test:migrations:fresh` primjenjuje svaku migraciju na praznu bazu podataka i hvata ovo.

### Spojena migracija se nikada ne briše niti preimenuje

Jednom kada se datoteka za migraciju nađe na grani izdanja ili `main`, već je pokrenuta na homolognim i programerskim bazama podataka, na VPS instalacijama i u Enterprise sync. Od tada pa nadalje:

- **Nikada ga nemojte brisati.** Svježe instalacije bi izgubile svoju šemu dok bi je nadograđene baze podataka zadržale.
- **Nikada ga ne preimenuj.** Verzija u `_omniroute_migrations` više ne bi odgovarala fajlu, tako da bi je svaka baza podataka koja je već primijenila ponovo pokrenula. Ne-idempotentni SQL tada duplicira podatke ili zaustavlja pokretanje.
- **Trebate drugačiju šemu?** Kreirajte novu migraciju sa `npm run db:new-migration`.

Preimenovanje je bezbedno samo za fajl koji još nije spojen, što je slučaj na koji se upućuju nagoveštaji kapije. Oznaka izdanja ovdje ništa ne mijenja: svaki pritisak na `release/v*` granu objavljuje Docker `:next` sliku i radi na homologu, VPS instalacijama i Enterprise sync, tako da je spojena migracija pokrenuta na stvarnim bazama podataka prije nego što postoji bilo koja `vX.Y.Z` oznaka. Kapija ne uspijeva pri svakom uklanjanju osnovne datoteke, označene ili ne.

- **Vraćanje spojene migracije.** `git revert` koji briše datoteku ne uspijeva na kapiji. Zadržite datoteku i poništite njenu šemu u novoj migraciji: `npm run db:new-migration -- <description>`, sa `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` i tako dalje. Nadograđene i svježe baze podataka zatim završavaju istom šemom.
- **Jedno prihvaćeno preimenovanje: unos kompatibilnosti i identičan sadržaj.** Ako se spojena datoteka mora premjestiti (na primjer, dvije spojene datoteke dijele vremensku oznaku i pokretač se zaustavlja sa kolizijom verzije), preimenujte kasniju bez dodirivanja njenog SQL i dodajte `{ fromVersion, fromName, toVersion, toName }` u `RENAMED_MIGRATION_COMPATIBILITY` u `src/lib/db/migrationRunner/constants.ts`. Baze podataka koje su primijenile staru verziju premještaju svoj `_omniroute_migrations` red umjesto da ponovo pokreću datoteku. Gate upozorava na takvo preimenovanje i uvijek pokreće provjeru komutacije na njemu, bez obzira na novu vremensku oznaku: nove instalacije primjenjuju datoteku na novu poziciju, nadograđene baze podataka ne, pa odaberite novu vremensku oznaku blizu stare. Vrata ne uspijeva preimenovati ako se sadržaj promijenio (promjena šeme i dalje ide u novoj migraciji) ili ako ciljna datoteka unosa nije na disku.
- **Nikada nemojte preimenovati unutar iste vremenske oznake.** Preimenovanje koje zadržava vremensku oznaku i mijenja samo opis ne uspijeva na kapiji, sa ili bez unosa. Sa unosom čiji je `toVersion` jednak njegovom `fromVersion`, pokretač briše stari `_omniroute_migrations` red i ponovo primjenjuje datoteku na svaku bazu podataka koja ga je već pokrenula. Bez unosa, pokretač prati samo verziju: preskače datoteku u tim bazama podataka (novi sadržaj se tamo nikada ne pokreće) i bilježi grešku pri ponovnom numeriranju pri svakom pokretanju. Koristite drugu vremensku oznaku plus unos kompatibilnosti ili zadržite ime.
- **Gate provjerava da se preimenovana datoteka ne pokreće ponovo.** Za svako pokriveno preimenovanje, kapija prosljeđuje novo ime datoteke u provjeru komutacije sa `--must-not-apply`. Provjera pokreće nadograđenu bazu podataka sa pravim runnerom, a ako pokretač ponovo primijeni tu datoteku (na primjer, zato što unos ima pogrešnu verziju ili ime, ili zato što parser teksta kapije čita `constants.ts` drugačije od TypeScript), kapija ne uspijeva sa `migration renomeada rodaria de novo` i traži od vas da provjerite staru i novu verziju i nazive unosa.

### Šta kapija provjerava u odnosu na bazu

Prilikom pokretanja zahtjeva za povlačenjem i stapanja u redu, `npm run check:migration-numbering` uspoređuje `src/lib/db/migrations/` na disku sa istim direktorijumom na osnovnoj grani. Baza je, ovim redoslijedom: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` varijabla, ili, kada je `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` ili `merge_group`, prvi roditelj spajanja urezivanja, `merge_group.base_sha` korisnog opterećenja događaja ili `git merge-base HEAD origin/$GITHUB_BASE_REF`. U zahtjevu za povlačenjem ili izvođenju reda stapanja bez razlučive baze, kapija ne uspijeva. Izvan CI bez `--base` ispisuje `comparação com a base: pulada (sem --base)` i preskače ova pravila.

`--base-latest-tag` se upoređuje s najnovijom oznakom izdanja (`vX.Y.Z` u semver redoslijedu; oznake sa sufiksima kao što su nightlies se ne računaju) koja je u povijesti `HEAD`, s istim pravilima kao `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) pokreće kapiju na ovaj način, jer push i zakazana pokretanja nemaju bazu zahtjeva za povlačenjem i spajanje može doći bez novog CI pokretanja. Bez oznake oslobađanja u historiji kapija ne uspijeva; pokrenite `git fetch --tags` (u CI, `actions/checkout` sa `fetch-depth: 0` donosi oznake).

| Promjena na zahtjev za povlačenje                                                                      | Rezultat                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fajl koji postoji na bazi se preimenuje, sa `RENAMED_MIGRATION_COMPATIBILITY` unosom                   | **Upozorenje** ako je sadržaj identičan, a provjera komutacije radi bez obzira na novu vremensku oznaku; ne uspije ako nova pozicija promijeni konačnu šemu (poništi preimenovanje ili odaberete drugu novu vremensku oznaku na kojoj putuje) ili ako bi pokretač ponovo primijenio preimenovanu datoteku na nadograđenu bazu podataka.** Ne uspijeva** ako se sadržaj promijenio. |
| Datoteka koja postoji na bazi se preimenuje zadržavajući svoju vremensku oznaku (mijenja se samo opis) | **Ne uspijeva** , sa ili bez unosa: trkač bi ga ponovo primijenio (sa unosom) ili ga preskočio po verziji (bez njega). Koristite drugu vremensku oznaku plus unos kompatibilnosti ili zadržite ime.                                                                                                                                                                                |
| Datoteka koja postoji na bazi se briše ili preimenuje bez unosa                                        | **Ne uspijeva** , bez obzira da li je datoteka u oznaci izdanja ili ne. Da biste to poništili, vratite datoteku pomoću `git checkout <base> -- src/lib/db/migrations/<file>`; da vratite njegovu šemu, dodajte novu migraciju sa `DROP ... IF EXISTS`.                                                                                                                             |
| Datoteka koja postoji na bazi ima drugačiji sadržaj                                                    | **Upozorenje** ( `::warning` napomena u GitHub akcijama) i provjera komutacije se pokreće. Ne uspijeva ako uređivanje promijeni konačnu šemu, jer nadograđene baze podataka ne primjenjuju ponovo uređenu datoteku: stavite promjenu u novu migraciju. Bezopasna izmjena (komentar, `IF NOT EXISTS`) samo upozorava.                                                               |
| Datoteka sa vremenskom oznakom se dodaje sa vremenskom oznakom koja nije novija od najnovije baze      | Pokreće provjeru komutacije, opisanu u nastavku.                                                                                                                                                                                                                                                                                                                                   |
| `NNN_` fajl starog formata se dodaje sa brojem ispod najnovijeg fajla starog formata baze              | **Ne uspijeva** , čak i ako je `KNOWN_GAPS` uređen u istom zahtjevu za povlačenjem: stara serija je zamrznuta, kreirajte migraciju pomoću `npm run db:new-migration`. Datoteke starog formata iznad najnovije baze (zahtjev za povlačenjem `release/v*` do `main` ) su prihvaćene.                                                                                                 |
| Neuređena, uređena ili preimenovana datoteka sadrži izraze `INSERT`, `UPDATE`, `DELETE` ili `REPLACE`  | **Upozorenje** : provjera komutacije ne uspoređuje podatke, pa provjerite da li redoslijed kojim se nadograđene i svježe baze podataka primjenjuju mijenja rezultat.                                                                                                                                                                                                               |

Jedno pokretanje provjere komutacije pokriva zajedno datoteke koje nisu u redu, uređene i preimenovane datoteke.

Provjera komutacije (`scripts/check/migration-commutation.ts`) gradi dvije privremene baze podataka sa pravom putanjom instalacije:** nadograđen** jedan (pokreni se sa baznim migracijama, a zatim ponovo pokreni na istom fajlu sa migracijama zahteva za povlačenje) i** svježe** jedan (jedno pokretanje s migracijama zahtjeva za povlačenje). Uspoređuje rezultujuće sheme: tablice i kolone (zanemarujući redoslijed kolona), UNIQUE / PRIMARY KEY i FOREIGN KEY ograničenja, normalizirani `CREATE TABLE` tekst svake tablice (koji pokriva CHECK ograničenja, usporedbe, generirane kolone i opcije tablice), indekse, okidače i poglede. Podaci reda se ne porede. Ako se poklapaju, kapija ispisuje da datoteka nije u redu, ali prelazi na posao i prolazi. Ako se razlikuju, kapija ne uspijeva s razlikom i nagovještajem za slučaj: za datoteku koja nije u redu, regenerirajte njeno ime sa `npm run db:new-migration`, što je sigurno jer datoteka još nije spojena; za uređenu osnovnu datoteku, vratite osnovni sadržaj i stavite promjenu u novu migraciju; za preimenovanu datoteku, poništite preimenovanje ili odaberite drugu novu vremensku oznaku na kojoj putuje, nikada istu vremensku oznaku s drugim imenom. Ako se sama provjera ne može pokrenuti, kapija ne uspijeva u CI i upozorava samo lokalno. Za uređenu osnovnu datoteku, nadograđena baza podataka se gradi sa sadržajem baze te datoteke, a drugo pokretanje je preskače jer je njena verzija već snimljena. Za preimenovanu datoteku, nadograđena baza podataka je napravljena sa datotekom pod njenim starim imenom, a drugo pokretanje pomera njen `_omniroute_migrations` red kroz unos kompatibilnosti umesto da ga ponovo pokreće; kapija prosljeđuje novo ime sa `--must-not-apply`, tako da provjera ne uspijeva ako ga drugo pokretanje primijeni. Ako se migracija zahtjeva za povlačenjem ne uspije primijeniti na nadograđenu stazu, to jest, nakon svake migracije baze (bez obzira da li ne uspije i na novoj instalaciji), kapija prijavljuje `migration do PR não aplica` i traži od vas da popravite SQL u odnosu na trenutnu šemu baze; ako datoteka ovisi o drugoj migraciji zahtjeva za povlačenjem s kasnijom vremenskom oznakom, regenerirajte njeno ime sa `npm run db:new-migration`.

Da biste lokalno pokrenuli isto poređenje, eksplicitno proslijedite bazu, na primjer `npm run check:migration-numbering -- --base origin/<base-branch>` ili `npm run check:migration-numbering -- --base-latest-tag` za usporedbu s najnovijim izdanjem.

### Pretvaranje Open PR `NNN` migracije

Zahtjev za povlačenjem otvoren prije prekidača može i dalje nositi sekvencijalni fajl kao što je `242_add_widgets.sql`. Stari brojevi iznad `241` se odbijaju, pa ih konvertujte prije spajanja:

1. **Preimenujte datoteku sa generatorom, zadržavajući opis.** Pokrenite `npm run db:new-migration -- <same description>` da dobijete novo ime, premjestite SQL u njega i izbrišite staru `NNN_` datoteku. Opis mora ostati identičan: unos kompatibilnosti ispod odgovara njemu.
2. **Dodajte unos kompatibilnosti ako je trajna baza podataka pokrenula stari broj.** Ako je bilo koja baza podataka koja se čuva (homolog, VPS, vlastita instalacija suradnika) pokrenula build PR sa `NNN_` datotekom, dodajte `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` u `RENAMED_MIGRATION_COMPATIBILITY` u `src/lib/db/migrationRunner/constants.ts`. Ovo je** potrebno za `237` do `241`** : ti slotovi sada drže kanonske `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` i `241_seen_models.sql`, a bez unosa takva baza podataka zauvijek preskače kanonsku migraciju i ponovo pokreće konvertovanu. Takođe radi za slot koji ostaje prazan, kao što je `242`, kada je odredište vremenska oznaka. Ako ste u nedoumici, dodajte unos. Gdje ga dodate u niz nije važno: kada ciljni slot unosa još uvijek drži red koji se drugi unos pomiče (na primjer `237` drži PR red dok stariji `usage_history_calculated_cost` red čeka da se premjesti u `237`), pokretač dopušta tom unosu da čeka dok se slot ne oslobodi. Samo stvarni sukob, kao što je slot koji drži red bez pomeranja unosa, ili dva unosa koja zamenjuju slotove, zaustavlja pokretanje sa `Cannot reconcile ...`.
3. **Držite SQL idempotentnim** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), jer konvertovana migracija može zadovoljiti bazu podataka u kojoj njena šema već postoji.
4. **Premjestite posebne slučajeve s ključem verzije.** Ako je PR dodala mala i mala slova za svoj stari broj u `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ili u `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), promijenite ključ u novu vremensku oznaku.

`tests/unit/db/codex-fence-migration-rename.test.ts` je radni primjer testa za preimenovanu migraciju.

### Povratni portovi na grane prije prebacivanja

Nikada nemojte birati ili prenositi `YYYYMMDDHHMMSS_` datoteku u granu koja je prethodila prebacivanju (na primjer starija `release/v*` grana). Runner tamo sortira imena datoteka kao tekst, tako da bi datoteka s vremenskim žigom radila između `201_` i `202_` na novoj bazi podataka, a stara kapija ne razumije 14-cifrene prefikse. Na takvoj grani, napišite promjenu kao vlastiti sljedeći `NNN_` fajl te grane, idempotent, tako da je ne-op kada verzija s vremenskim žigom stigne kasnije.

### Kako se odvijaju migracije

Prilikom pokretanja, `migrationRunner.ts`:

1. Kreira `_omniroute_migrations` tabelu ako ne postoji
2. Upiti za već primijenjene migracije
3. Primjenjuje sve nove migracije po redoslijedu, svaku u transakciji
4. Bilježi svaku primijenjenu migraciju s vremenskom oznakom

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

Migracije moraju biti** idempotentan** — ih izvodi dvaput bi trebao biti bez operacije:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Slobodno koristite klauzule `IF NOT EXISTS`, `IF EXISTS` i `OR IGNORE` / `OR REPLACE`.

### Dodavanje nove migracije

1. **Kreirajte datoteku sa generatorom** : `npm run db:new-migration -- <description>` (na primjer `npm run db:new-migration -- add combo priority`). Zapisuje `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` sa trenutnim UTC vremenom i zaglavljem komentara, pomiče se za jednu sekundu naprijed ako se uzme ta vremenska oznaka i nikada ne prepisuje datoteku. Nemojte birati broj ručno.
2. **Koristite sigurnu DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Pažljivo popunite podatke** : koristite `UPDATE ... WHERE ...` za rukovanje postojećim redovima
4. **Provjerite redoslijed i imenovanje** : `npm run test:migrations:fresh` (sve migracije na praznu bazu podataka) i `npm run check:migration-numbering`
5. **Testirajte na kopiji** : nikada ne izvodite neprovjerene migracije u proizvodnji
6. **Tabela kreirana iz koda također treba migraciju** : ako modul također kreira tabelu lijeno (`CREATE TABLE IF NOT EXISTS`, čuva se kao staza samoizlječenja), migracija je mora kreirati sa istim DDL. U suprotnom čista instalacija i nadograđena instalacija završavaju s različitim shemama, ovisno o tome da li je ta kodna putanja pokrenuta. `tests/unit/db/lazy-table-migration-guard.test.ts` skenira `src/` i `open-sse/` i ne uspijeva na lijenom `CREATE` bez migracije (#20557). Primjer: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

primjer:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Promjene koje nisu kompatibilne unatrag** (npr. ispuštanje kolona) su nezgodne. OmniRoute podržava li NOT downgrade — nakon što se primijeni migracija, promjena šeme je trajna. Planirajte u skladu s tim.

---

## Enkripcija u mirovanju

Osjetljiva polja (API ključevi, OAuth tokeni, stringovi za povezivanje) su šifrovana u mirovanju koristeći **AES-256-GCM**.

### Kako to funkcioniše

```ts
// src/lib/db/encryption.ts (pojednostavljeno)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Gdje se koristi

- `provider_connections.api_key` — šifrovano na nivou aplikacije
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrovano na nivou aplikacije
- `key_value` unosi sa `namespace = "secrets"` — šifrovano na nivou aplikacije
- `proxy_registry.auth` — šifrovano na nivou aplikacije (ako postoji)

### Ključ za enkripciju

Ključ za enkripciju se izvodi iz **lozinke** (postavljene putem `STORAGE_ENCRYPTION_KEY` varijable okruženja) i **soli** (sačuvane u bazi podataka). Oboje je potrebno za dešifrovanje podataka.

```bash
# Generišite sigurnu lozinku
openssl rand -hex 32

# Postavite u .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritično**: Gubitak ključa za enkripciju znači gubitak pristupa svim šifrovanim podacima. **Napravite rezervnu kopiju ključa odvojeno od baze podataka**.

### Šta NIJE šifrovano

Iz razloga performansi, sljedeće se čuva u čistom tekstu (plaintext):

- Prikazana imena provajdera
- Definicije modela (već javne)
- Pravila rutiranja
- Zapisi o korišćenju (bez PII)

---

## Upozorenja o enkripciji (v3.8.16+)

OmniRoute koristi **`migrateLegacyEncryptedString()`** za transparentno rukovanje dvjema šemama enkripcije:

- **Naslijeđeno** (prije v3.5.0): XOR-bazirana "enkripcija" (nije prava kriptografija)
- **Trenutno**: AES-256-GCM sa odgovarajućim IV i auth tagom

Pomoćni alat za migraciju detektuje naslijeđeni format i ponovo vrši enkripciju novom šemom pri prvom čitanju. To znači da možete nadograditi staru bazu podataka bez gubitka vjerodajnica.

---

## Keš čitanja

Za podatke koji se često čitaju (modeli, provajderi, postavke), `readCache.ts` pruža **in-memory keš**:

```ts
// Keširano pri pokretanju, poništeno pri pisanju
const providers = await getCachedProviders(); // Brzo, in-memory
const fresh = await listProviders(); // Sporo, pristupa bazi podataka
```

| Keširani entitet       | Ključ keša     | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | Do pisanja |
| `provider_connections` | `providers:v1` | Do pisanja |
| `settings`             | `settings:v1`  | Do pisanja |
| `combos`               | `combos:v1`    | Do pisanja |

Keš se poništava pri svakom pisanju u odgovarajuću tabelu.

---

## Sigurnosna kopija i oporavak

### Ručna sigurnosna kopija

```bash
# Koristite CLI za kreiranje lokalne sigurnosne kopije
omniroute backup create --name pre-migration

# Ili putem API-ja
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Datoteka sigurnosne kopije uključuje:

- Sve tabele baze podataka (serijalizovane u JSON)
- Artefakti dnevnika poziva (base64-kodirani, opcionalno)
- Postavke + tajne (enkriptovane)
- Konfiguracija dodataka

### Oporavak

```bash
# Putem CLI-ja
omniroute restore pre-migration

# Putem API-ja
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Upozorenje**: Oporavak prepisuje cijelu bazu podataka. Prvo zaustavite sve klijente.

### Automatizovane sigurnosne kopije

```bash
# Omogućite automatizovane dnevne sigurnosne kopije putem CLI-ja
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Raspored se izvršava na strani servera putem pozadinskog posla koji se aktivira svakih 30 sekundi (podrazumijevano) i procjenjuje cron izraz prema lokalnom vremenu servera.

| Varijabla                                   | Podrazumijevano | Opis                                                                                                                      |
| ------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`         | Interval aktivacije u ms (min `5000`). Mora biti kraći od 60 s da bi se pouzdano uklopio unutar odgovarajuće cron minute. |

### SQLite Hot Backup

Za sigurnosnu kopiju aktivne baze podataka bez zastoja:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ovo koristi SQLite-ov API za online sigurnosne kopije — sigurno za pokretanje dok OmniRoute radi.

---

## Podešavanje performansi

### WAL Mode

WAL je podrazumevano omogućen. Za radna opterećenja visokog pisanja, razmotrite:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ne postavlja `journal_size_limit`. Kontrolna tačka pomera WAL okvire u glavnu datoteku, ali WAL datoteka zadržava svoju najveću dodeljenu veličinu. `OMNIROUTE_WAL_GUARD_MAX_MB` čuvar samo upozorava i pokreće `wal_checkpoint(RESTART)`; nije ograničenje veličine diska.

### Indeksi

Ključni indeksi za performanse (automatski kreirani migracijama):

- `idx_models_provider` — traženja modela po provajderu
- `idx_combo_targets_combo_id` — kombinirano proširenje cilja
- `idx_usage_history_api_key_timestamp` analitika upotrebe —
- `idx_quota_snapshots_api_key_window` — praćenje kvota
- `idx_call_logs_timestamp` — upiti dnevnika poziva

Da dodate novi indeks, kreirajte migraciju:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Za vrlo velike baze podataka (> 10GB), mapiranje memorije se može podesiti preko SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Zbijanje

Dugotrajne OmniRoute instance imaju koristi od povremenog `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Pokreni mjesečno tokom perioda sa malim prometom. (WAL način rada smanjuje potrebu, ali je ne eliminira.)

---

## Provera zdravlja

`src/lib/db/healthCheck.ts` pruža dijagnostiku zdravlja na nivou baze podataka:

Oba glagola zahtevaju autentifikaciju (u suprotnom vraćaju `401`). `GET` samo dijagnostikuje; `POST` pokreće istu proveru sa omogućenim `autoRepair`.

```bash
GET  /api/db/health   # dijagnostika
POST /api/db/health   # dijagnostika + popravka
```

Odgovor je `DbHealthCheckResult` koji proizvodi `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
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

| Polje             | Značenje                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` kada su `issues` prazni. `driver` nikada ne utiče na ovo.                                                                                       |
| `issues[].type`   | Jedan od `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                              |
| `repairedCount`   | Redovi popravljeni tokom ovog pokretanja; uvek `0` kada je `autoRepair` false.                                                                         |
| `backupCreated`   | Da li je napravljena rezervna kopija pre popravke.                                                                                                     |
| `checkedAt`       | ISO vremenska oznaka koju dele pokretanje i svaka beleška o popravci koju ono zapiše.                                                                  |
| `driver.name`     | SQLite drajver koji opslužuje proverenu bazu podataka.                                                                                                 |
| `driver.degraded` | `true` kada upisi nisu trajno podržani u datoteci baze podataka — `sql.js` WASM rezervna opcija (trajnost cele datoteke) ili baza podataka u memoriji. |

Isti payload vraća `omniroute_db_health_check` MCP alat.

Pokrenite `PRAGMA integrity_check` da biste otkrili oštećenja:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Trebalo bi da ispiše: ok
```

Ako vrati bilo šta osim `ok`, odmah prestanite da koristite bazu podataka i vratite je iz rezervne kopije.

---

## Oporavak od katastrofe

### Scenarij 1: WAL datoteka je izgubljena

Datoteka `-wal` nedostaje, ali su `-shm` i glavna baza podataka netaknute:

```bash
# Automatski se oporavlja pri sljedećem otvaranju
omniroute
```

Ako SQLite ne može izvršiti automatski oporavak:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenarij 2: Glavna datoteka baze podataka je oštećena

Vratite je iz sigurnosne kopije:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` samo preuzima kompletnu `.tar.gz` arhivu sa pokrenutog servera
(`GET /api/db-backups/exportAll`, potrebne su pristupne informacije operatera); ne vraća nikakve podatke.

### Scenarij 3: Ključ za šifriranje je izgubljen

**Oporavak nije moguć** bez ključa. Šifrirana polja su nečitljiva. Ručno ponovo dodajte sve pružaoce usluga s novim pristupnim podacima.

> **Ublažavanje rizika**: Uvijek zasebno napravite sigurnosnu kopiju ključa za šifriranje, idealno u upravitelju lozinki ili KMS-u.

### Scenarij 4: Disk je pun

SQLite će vratiti greške `SQLITE_FULL`. Oslobodite prostor na disku, a zatim izvršite:

```bash
# Izvršite kontrolnu tačku WAL-a kako biste oslobodili prostor
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Uobičajene operacije

### Pregled tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Brojanje redova u svim tabelama

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetovanje (brisanje) svih podataka

```bash
# Prvo zaustavite OmniRoute
omniroute stop

# Izbrišite datoteku baze podataka
rm ~/.omniroute/storage.sqlite*

# Ponovo pokrenite (ponovo će kreirati praznu bazu podataka)
omniroute
```

Za **selektivno** resetovanje (zadržite provajdere, obrišite upotrebu):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Izvoz jedne tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rješavanje problema

### "Database is locked"

Drugi proces drži zaključavanje za pisanje. Ili:

- Sačekajte da drugi proces završi (provjerite `lsof | grep storage.sqlite`)
- Ugasite drugi proces
- Ako se problem nastavi, ponovo pokrenite OmniRoute

### "Foreign key constraint failed"

Domenski modul krši referencijalni integritet. Provjerite:

- Redove bez roditelja u zavisnim tabelama
- Kaskadna brisanja koja se nisu propagirala
- Nedavnu migraciju koja je promijenila strani ključ

Pokrenite `PRAGMA foreign_key_check;` da pronađete kršenja.

### "Out of memory"

SQLite-ov memory-mapped I/O premašuje ograničenje OS-a. Smanjite putem SQLite pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB umjesto 256MB
```

Ili onemogućite:

```sql
PRAGMA mmap_size = 0;
```

### "Migration failed mid-way"

Migracija je pokrenuta u transakciji, pa bi se trebala vratiti na prethodno stanje. Ako nije:

1. **Zaustavite OmniRoute** (spriječite dalje pokušaje)
2. **Provjerite stanje baze podataka** pomoću `sqlite3`
3. **Ručno popravite** djelimičnu migraciju
4. **Ponovo pokrenite** OmniRoute (migracija će biti ponovo pokušana)

Da biste ovo spriječili, uvijek prvo testirajte migracije na kopiji.

## Vidi također

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele korištenja
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — nadzor stanja
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces izdavanja
- Izvor: `src/lib/db/` (80+ datoteka, ~25K linija koda)
