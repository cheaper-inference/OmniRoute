# Database Schema & Operations Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute koristi **SQLite s WAL dnevnikom** kao primarno spremište, uz enkripciju **AES-256-GCM** podataka u mirovanju za osjetljiva polja. Ovaj vodič obuhvaća shemu, migracije, sigurnosno kopiranje/oporavak i operativne postupnike.

**Izvori:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 osnovnih tablica)
- `src/lib/db/migrationRunner.ts` — verzionirane migracije
- `src/lib/db/migrations/` — 167 verzioniranih SQL datoteka
- `src/lib/db/encryption.ts` — pomoćne funkcije za enkripciju
- `src/lib/db/backup.ts` — izvoz/uvoz sigurnosnih kopija
- `src/lib/db/healthCheck.ts` — dijagnostika stanja

---

## Zašto SQLite?

OmniRoute je odabrao SQLite umjesto PostgreSQL-a/MySQL-a iz nekoliko razloga:

| Čimbenik              | SQLite                                      | PostgreSQL                                 |
| --------------------- | ------------------------------------------- | ------------------------------------------ |
| **Implementacija**    | Ugrađen — nije potreban zaseban poslužitelj | Zahtijeva postavljanje poslužitelja        |
| **Enkripcija**        | Na razini aplikacije (AES-256-GCM)          | Ugrađeni TDE                               |
| **Performanse**       | Brži za mala/srednja radna opterećenja      | Bolji za golem broj istodobnih zapisivanja |
| **Istodobnost**       | WAL način omogućuje istodobna čitanja       | Potpuni MVCC                               |
| **Sigurnosna kopija** | Kopiranje jedne datoteke                    | `pg_dump` ili snimka datotečnog sustava    |
| **Slučaj uporabe**    | Instalacija po korisniku, ugrađeno rješenje | Višekorisnički SaaS                        |

Za implementacije s **jednim korisnikom i jednom instancom** (primarni slučaj uporabe za OmniRoute), SQLite je jednostavniji i brži.

### WAL dnevnik

`core.ts` otvara bazu podataka u načinu rada **WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL omogućuje **istodobna čitanja** tijekom zapisivanja — što je važno za nadzornu ploču koja izvršava upite dok se zahtjevi bilježe.

Zadana veličina predmemorije iznosi **65,536 KiB (64 MiB)**. SQLite negativnu vrijednost
`cache_size` tumači kao približnu gornju granicu u KiB i dodjeljuje stranice prema potrebi.
**Postavke > Sustav i pohrana > Veličina predmemorije** prihvaća cijele brojeve od **1 do
1,000,000 KiB**; spremanjem postavke ona se primjenjuje na aktivnu vezu s bazom podataka,
a OmniRoute pri pokretanju vraća pohranjenu vrijednost.

---

## Lokacija baze podataka

SQLite datoteka pohranjena je na sljedećoj lokaciji:

| OS      | Putanja                                                             |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (može se konfigurirati putem `DATA_DIR`) |

Prateće datoteke:

- `storage.sqlite-wal` — dnevnik zapisivanja unaprijed
- `storage.sqlite-shm` — datoteka dijeljene memorije
- `call_logs/` — artefakti sadržaja zahtjeva (ako je omogućeno)

**Promjena lokacije:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitektura domenskih modula

Baza podataka OmniRoutea ima **110 vršnih TypeScript modula** u `src/lib/db/`. Svaki domenski modul:

- Posjeduje jednu ili više određenih tablica
- Izvozi tipizirane CRUD funkcije
- Nikad ne pristupa tablicama drugog modula
- Koristi `getDbInstance()` iz `core.ts` za pristup bazi podataka

### 110 vršnih modula baze podataka

OmniRoute ima **110 vršnih TypeScript datoteka** u `src/lib/db/`. U nastavku je prikazan izbor osnovnih modula; potpuni popis nalazi se u sadržaju direktorija:

| Modul                   | Tablice                                                        | Odgovornost                                                                   |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registracija pružatelja putem OAutha/API ključa i pristupni podaci            |
| `models.ts`             | `key_value` (podaci modela)                                    | Definicije modela, mogućnosti, cijene                                         |
| `combos.ts`             | `combos`                                                       | Konfiguracije kombiniranog usmjeravanja i redoslijed                          |
| `apiKeys.ts`            | `api_keys`                                                     | Životni ciklus API ključeva, opsezi i praćenje kvota                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfiguracija sustava i zajedničko KV spremište                               |
| `backup.ts`             | —                                                              | Operacije izvoza/uvoza sigurnosnih kopija                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracije proxyja i pravila usmjeravanja                                  |
| `prompts.ts`            | `prompt_templates`                                             | Višekratno upotrebljivi predlošci upita i upravljanje verzijama               |
| `webhooks.ts`           | `webhooks`                                                     | Pretplate i zapisnici webhookova vođeni događajima                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Evidentiranje revizijskih podataka za svaki zahtjev (neobavezno, velik opseg) |
| `domainState.ts`        | `domain_*` (5 tablica)                                         | Domenski proračuni, osigurači, blokade, zamjenski lanci i povijest troškova   |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API ključevi na popisu dopuštenih za MCP/A2A                                  |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Povijesna upotreba kvota                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapiranje modela na zadane kombinacije                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trajno stanje specifično za CLI                                               |
| `encryption.ts`         | —                                                              | Pomoćne funkcije za šifriranje/dešifriranje polja                             |
| `readCache.ts`          | —                                                              | Predmemorija u memoriji za operacije s velikim brojem čitanja                 |
| `secrets.ts`            | `key_value` (šifrirani unosi)                                  | Pohrana šifriranih tajni                                                      |
| `stateReset.ts`         | —                                                              | Brisanje/vraćanje stanja baze podataka radi testiranja                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesije za prijenos agentu                                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Praćenje upotrebe                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracija kompresije                                                      |

### Granice modula

Temeljno arhitekturno pravilo glasi: **moduli ne pristupaju izravno tablicama drugih modula**. Za rad s podacima drugog modula uvezite funkciju iz tog modula.

```ts
// ❌ POGREŠNO: izravan SQL iz drugog modula
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ISPRAVNO: upotrijebite funkciju modula pružatelja
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ovo se pravilo provodi pregledom koda — ne postoji statička provjera, ali kršenja se označavaju.

---

## Osnovna shema (17 tablica)

`core.ts` definira 17 osnovnih tablica u `SCHEMA_SQL`. One se stvaraju migracijom `001_initial_schema.sql` i čine temeljnu shemu.

### Osnovne tablice (stvorene u početnoj migraciji)

| Tablica                    | Namjena                                   | Ključni stupci                                                          |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Vjerodajnice pružatelja (šifrirane)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Podaci o usmjeravanju čvorova pružatelja  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Opće spremište ključ-vrijednost           | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicije kombinacija usmjeravanja       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API ključevi za pristupnik                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metapodaci baze podataka                  | `key`, `value`                                                          |
| `usage_history`            | Zapisi o upotrebi zahtjeva                | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Sadržaji zahtjeva i odgovori              | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Zapisi zahtjeva proxyja                   | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Lanci od modela do pružatelja             | `model`, `chain`                                                        |
| `domain_budgets`           | Proračuni potrošnje po domeni             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Povijest poništavanja proračuna           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Praćenje troškova po domeni               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stanje ograničenja brzine domene          | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stanje prekidača strujnog kruga po domeni | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Predmemorija odgovora LLM-a               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Povijesne snimke kvota                    | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatne tablice (dodane naknadnim migracijama)

Naknadne migracije dodaju tablice kao što su:

- `cli_tool_state` (migracija 011) — stanje CLI alata
- `mcp_*` tablice — revizija MCP poslužitelja
- `a2a_*` tablice — stanje A2A zadataka
- `usage_*` tablice — praćenje upotrebe
- `plugin_*` tablice — sustav dodataka
- `skill_executions` — povijest izvršavanja vještina
- `memory_*` tablice — memorijski sustav
- `compression_*` tablice — sustav kompresije
- `webhook_*` tablice — zapisnik isporuke webhookova
- `acp_*` tablice — Agent Client Protocol
- `oneproxy_*` tablice — 1proxy tržište
- `proxy_assignments` — povezivanja opsega proxyja
- `detailed_call_artifacts` — metapodaci artefakata zapisnika poziva
- `quota_alert_history` — revizija upozorenja o kvotama
- `command_code_auth_sessions` — OAuth sesije za Command Code

Potpuni popis od približno 30+ tablica nalazi se u `src/lib/db/migrations/`.

---

## Migracije

OmniRoute koristi** verzirane, idempotentne migracije** u `src/lib/db/migrations/`. Svaka migracija je jedna SQL datoteka. Dva formata imenovanja koegzistiraju; verzija zabilježena u `_omniroute_migrations` je numerički prefiks.

### Imenovanje migracije

| Format                                              | Primjer                              | Koristi se za                                                                                                                                                             |
| --------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (točno 3 znamenke)            | `241_seen_models.sql`                | Stara serija `001`–`241`. Zamrznuto kada je format vremenske oznake stigao (`240` i `241` su spojeni neposredno prije njega): nijedna nova datoteka ne dobiva redni broj. |
| `YYYYMMDDHHMMSS_description.sql` (14 znamenki, UTC) | `20261113120000_add_usage_index.sql` | Svaka migracija stvorena od 13.11.2026.                                                                                                                                   |

Zašto promjena: sa sekvencijalnim brojevima, paralelni PRs odabrao je isti sljedeći broj i svi osim jednog morali su ponovno numerirati prije spajanja. UTC vremenska oznaka svakom PR daje vlastitu verziju.

Pravila za format vremenske oznake (provodi `npm run check:migration-numbering`, dijeli se s generatorom u `scripts/check/lib/migrationNaming.mjs`):

- Vremenska oznaka je pravi UTC datum i vrijeme, ne prije `20261113000000` i ne više od 10 minuta u budućnosti.
- Opis je mala `snake_case` koja počinje slovom (`a-z`, `0-9`, jedan `_` između riječi), najviše 80 znakova.
- Dvije datoteke s istom vremenskom oznakom su duplikat.
- Pravilo bez praznina primjenjuje se samo na stare nizove: svaki broj od `001` do `241` mora postojati, osim poznatih praznina `026`, `055` i `121`. Brisanje `241` (ili bilo koje stare datoteke) ne uspijeva. `001` i `241` nikada se ne mogu dodati na popis dopuštenih `KNOWN_GAPS`. Datoteke s vremenskom oznakom nikada ne stvaraju prazninu.
- Svaki unos u `src/lib/db/migrations/` mora biti obična datoteka s važećim imenom `.sql` malim slovima. Direktorij, simbolička veza, `.SQL` ili `.sql.bak` datoteka, skrivena datoteka ili ime s razmakom ne prolaze vrata, jer bi ih trkač tiho preskočio ili bi se srušio pri dizanju.

**Primijeni narudžbu.** Trkač razvrstava prema numeričkoj vrijednosti prefiksa, a ne prema tekstu: prvo stare `001`–`241` datoteke, zatim datoteke s vremenskom oznakom prema redoslijedu vremenske oznake, zatim svi direktoriji s prostorom imena registrirani sa `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (verzije kao što je `ee-001`). Migracija na čekanju je svaka datoteka čija verzija nije u `_omniroute_migrations`, tako da se migracija iz starije grane koja se spaja nakon novije još uvijek primjenjuje na postojeće baze podataka.

**Vremenska oznaka je redoslijed stvaranja, a ne redoslijed spajanja.** Ako vaša migracija ovisi o tablici ili stupcu stvorenom migracijom s a** noviji** timestamp (na primjer, jedan iz drugog PR koji se prvi spojio), nova baza podataka bi prva pokrenula vašu i ne bi uspjela. Dok je vaš PR još otvoren, ponovno generirajte naziv datoteke pomoću `npm run db:new-migration` tako da dobije noviju vremensku oznaku ili ga učinite neovisnim. `npm run test:migrations:fresh` primjenjuje svaku migraciju na praznu bazu podataka i hvata ovo.

### Spojena migracija nikada se ne briše niti preimenuje

Jednom kada je datoteka za migraciju na grani izdanja ili `main`, već je pokrenuta na homolognim bazama podataka i bazama podataka razvojnih programera, na VPS instalacijama i u Enterprise sync-u. Od tada nadalje:

- **Nikad ga nemojte brisati.** Svježe instalacije izgubile bi svoju shemu dok je nadograđene baze podataka zadržavaju.
- **Nikada ga ne preimenujte.** Verzija u `_omniroute_migrations` više ne bi odgovarala datoteci, pa bi je svaka baza podataka koja ju je već primijenila ponovno pokrenula. Neidempotentni SQL zatim duplicira podatke ili zaustavlja pokretanje.
- **Trebate drugačiju shemu?** Kreirajte novu migraciju sa `npm run db:new-migration`.

Preimenovanje je sigurno samo za datoteku koja još nije spojena, što je slučaj na koji se odnose naputci vrata. Oznaka izdanja ovdje ne mijenja ništa: svaki pritisak na `release/v*` granu objavljuje Docker `:next` sliku i radi na homologu, VPS instalacijama i Enterprise sinkronizaciji, tako da je spojena migracija pokrenuta na pravim bazama podataka prije nego što postoji bilo kakva `vX.Y.Z` oznaka. Vrata ne uspijevaju svako uklanjanje osnovne datoteke, označene ili ne.

- **Vraćanje spojene migracije.** `git revert` koja briše datoteku ne uspijeva pristupiti vratima. Zadržite datoteku i poništite njezinu shemu u novoj migraciji: `npm run db:new-migration -- <description>`, sa `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` i tako dalje. Nadograđene i svježe baze podataka tada završavaju s istom shemom.
- **Jedno prihvaćeno preimenovanje: unos kompatibilnosti i identičan sadržaj.** Ako se spojena datoteka mora premjestiti (na primjer, dvije spojene datoteke dijele vremensku oznaku i pokretač se zaustavlja zbog sudara verzija), preimenujte kasniju bez dodirivanja njenog SQL i dodajte `{ fromVersion, fromName, toVersion, toName }` u `RENAMED_MIGRATION_COMPATIBILITY` u `src/lib/db/migrationRunner/constants.ts`. Baze podataka koje su primijenile staru verziju premještaju `_omniroute_migrations` redak umjesto ponovnog pokretanja datoteke. Vrata upozoravaju na takvo preimenovanje i uvijek izvode provjeru komutacije na njemu, bez obzira na novu vremensku oznaku: nove instalacije primjenjuju datoteku na njenoj novoj poziciji, nadograđene baze podataka ne, stoga odaberite novu vremensku oznaku blizu stare. Vrata ne uspijevaju preimenovati ako se sadržaj promijenio (promjena sheme i dalje ide u novu migraciju) ili ako ciljna datoteka unosa nije na disku.
- **Nikada nemojte preimenovati unutar iste vremenske oznake.** Preimenovanje koje zadržava vremensku oznaku i mijenja samo opis ne prolazi vrata, sa ili bez unosa. S unosom čiji je `toVersion` jednak `fromVersion`, pokretač briše stari `_omniroute_migrations` red i ponovno primjenjuje datoteku na svaku bazu podataka koja ju je već pokrenula. Bez unosa, pokretač prati samo verziju: preskače datoteku u tim bazama podataka (novi sadržaj se tamo nikada ne pokreće) i bilježi pogrešku ponovnog numeriranja pri svakom pokretanju. Upotrijebite drugu vremensku oznaku i unos kompatibilnosti ili zadržite naziv.
- **Vrata provjeravaju da se preimenovana datoteka ne pokreće ponovno.** Za svako pokriveno preimenovanje, vrata prosljeđuju novi naziv datoteke u provjeru komutacije pomoću `--must-not-apply`. Provjera pokreće nadograđenu bazu podataka s pravim pokretačem, a ako pokretač ponovno primijeni tu datoteku (na primjer, zato što unos ima pogrešnu verziju ili naziv, ili zato što parser teksta vrata čita `constants.ts` drugačije od TypeScript), vrata ne uspijevaju sa `migration renomeada rodaria de novo` i traži od vas da provjerite stare i nove verzije i imena unosa.

### Što vrata uspoređuju s bazom

Prilikom pokretanja zahtjeva za povlačenjem i reda čekanja spajanja, `npm run check:migration-numbering` uspoređuje `src/lib/db/migrations/` na disku s istim direktorijem u osnovnoj grani. Baza je, ovim redoslijedom: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` varijabla ili, kada je `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` ili `merge_group`, prvi roditelj predaje spajanja, `merge_group.base_sha` sadržaja događaja ili `git merge-base HEAD origin/$GITHUB_BASE_REF`. U zahtjevu za povlačenjem ili izvođenju reda čekanja spajanja bez razrješive baze, vrata ne uspijevaju. Izvan CI bez `--base` ispisuje `comparação com a base: pulada (sem --base)` i preskače ova pravila.

`--base-latest-tag` se uspoređuje s najnovijom oznakom izdanja (`vX.Y.Z` prema semverskom redoslijedu; sufiksirane oznake kao što su nightlies se ne računaju) koja je u povijesti `HEAD`, s istim pravilima kao i `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) pokreće vrata na ovaj način, jer push i planirana izvođenja nemaju bazu zahtjeva za povlačenjem i spajanje može sletjeti bez novog CI izvođenja. Bez oznake izdanja u povijesti vrata ne uspijevaju; pokrenite `git fetch --tags` (u CI, `actions/checkout` sa `fetch-depth: 0` donosi oznake).

| Promjena na zahtjevu za povlačenjem                                                                          | Proizlaziti                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Datoteka koja postoji na bazi je preimenovana, sa `RENAMED_MIGRATION_COMPATIBILITY` unosom                   | **Upozorenje** ako je sadržaj identičan, a provjera komutacije radi bez obzira na novu vremensku oznaku; ne uspijeva ako nova pozicija promijeni konačnu shemu (poništi preimenovanje ili odabere drugu novu vremensku oznaku na kojoj putuje) ili ako bi pokretač ponovno primijenio preimenovanu datoteku na nadograđenu bazu podataka.** ne uspijeva** ako se promijeni sadržaj. |
| Datoteka koja postoji na bazi se preimenuje zadržavajući svoju vremensku oznaku (mijenja se samo opis)       | **ne uspijeva** , sa ili bez unosa: trkač bi ga ponovno primijenio (s unosom) ili preskočio po verziji (bez njega). Upotrijebite drugu vremensku oznaku i unos kompatibilnosti ili zadržite naziv.                                                                                                                                                                                  |
| Datoteka koja postoji na bazi se briše ili preimenuje bez unosa                                              | **ne uspijeva** , bez obzira nalazi li se datoteka u oznaci izdanja. Da biste to poništili, vratite datoteku pomoću `git checkout <base> -- src/lib/db/migrations/<file>`; da vratite njegovu shemu, dodajte novu migraciju sa `DROP ... IF EXISTS`.                                                                                                                                |
| Datoteka koja postoji na bazi ima drugačiji sadržaj                                                          | **Upozorenje** ( `::warning` napomena u GitHub akcijama), i pokreće se provjera komutacije. Ne uspijeva ako uređivanje mijenja konačnu shemu, jer nadograđene baze podataka ne primjenjuju ponovno uređenu datoteku: stavite promjenu u novu migraciju. Bezopasna izmjena (komentar, `IF NOT EXISTS`) samo upozorava.                                                               |
| Datoteka s vremenskom oznakom dodaje se s vremenskom oznakom koja nije novija od najnovije u bazi            | Pokreće provjeru komutacije, opisanu u nastavku.                                                                                                                                                                                                                                                                                                                                    |
| `NNN_` datoteka starog formata dodaje se s brojem ispod najnovije datoteke starog formata baze               | **ne uspijeva** , čak i ako je `KNOWN_GAPS` uređen u istom zahtjevu za povlačenjem: stara serija je zamrznuta, kreirajte migraciju pomoću `npm run db:new-migration`. Prihvaćaju se datoteke starog formata iznad najnovije baze (zahtjev za povlačenjem `release/v*` u `main` ).                                                                                                   |
| Datoteka koja nije u redu, uređena ili preimenovana sadrži `INSERT`, `UPDATE`, `DELETE` ili `REPLACE` izjave | **Upozorenje** : provjera komutacije ne uspoređuje podatke, stoga provjerite mijenja li rezultat redoslijed kojim se primjenjuju nadograđene i svježe baze podataka.                                                                                                                                                                                                                |

Jedno pokretanje provjere komutacije pokriva zajedno datoteke koje nisu u redu, uređene i preimenovane datoteke.

Provjera komutacije (`scripts/check/migration-commutation.ts`) gradi dvije privremene baze podataka sa stvarnim putem instalacije:** nadograđeno** jedan (pokretanje s osnovnim migracijama, zatim ponovno pokretanje na istoj datoteci s migracijama zahtjeva za povlačenjem) i** svježe** jedan (jedno pokretanje s migracijama zahtjeva za povlačenjem). Uspoređuje dobivene sheme: tablice i stupce (zanemarujući redoslijed stupaca), UNIQUE / PRIMARY KEY i FOREIGN KEY ograničenja, normalizirani `CREATE TABLE` tekst svake tablice (koji pokriva CHECK ograničenja, uspoređivanja, generirane stupce i opcije tablice), indekse, okidače i prikaze. Podaci retka se ne uspoređuju. Ako se poklapaju, vrata ispisuju da datoteka nije u redu, ali prelazi na posao i prolazi. Ako se razlikuju, vrata ne uspijevaju s razlikom i savjetom za slučaj: za datoteku koja nije u redu, ponovno generirajte njezino ime sa `npm run db:new-migration`, što je sigurno jer datoteka još nije spojena; za uređenu osnovnu datoteku, vratite osnovni sadržaj i stavite promjenu u novu migraciju; za preimenovanu datoteku, poništite preimenovanje ili odaberite drugu novu vremensku oznaku gdje se mijenja, nikada istu vremensku oznaku s drugim nazivom. Ako se sama provjera ne može pokrenuti, vrata ne uspijevaju u CI i upozoravaju samo lokalno. Za uređenu osnovnu datoteku, nadograđena baza podataka izgrađena je sa sadržajem baze te datoteke, a drugo pokretanje je preskače jer je njezina verzija već snimljena. Za preimenovanu datoteku, nadograđena baza podataka izgrađena je s datotekom pod njezinim starim imenom, a drugo pokretanje pomiče njezin `_omniroute_migrations` redak kroz unos kompatibilnosti umjesto ponovnog pokretanja; vrata prosljeđuju novo ime sa `--must-not-apply`, tako da provjera ne uspijeva ako ga primijeni drugo dizanje. Ako se migracija zahtjeva za povlačenjem ne uspije primijeniti na nadograđenoj stazi, to jest, nakon svake migracije baze (bez obzira na to ne uspije li ili ne pri novoj instalaciji), vrata izvješćuju `migration do PR não aplica` i traže od vas da popravite SQL prema trenutnoj shemi baze; ako datoteka ovisi o drugoj migraciji zahtjeva za povlačenjem s kasnijom vremenskom oznakom, ponovno generirajte njezino ime pomoću `npm run db:new-migration`.

Za lokalno pokretanje iste usporedbe, izričito proslijedite bazu, na primjer `npm run check:migration-numbering -- --base origin/<base-branch>` ili `npm run check:migration-numbering -- --base-latest-tag` za usporedbu s najnovijim izdanjem.

### Pretvaranje Open PR's `NNN` migracije

Zahtjev za povlačenjem otvoren prije preklopnika još uvijek može sadržavati sekvencijalnu datoteku kao što je `242_add_widgets.sql`. Stari brojevi iznad `241` su odbijeni, stoga ih pretvorite prije spajanja:

1. **Preimenujte datoteku pomoću generatora, zadržavajući opis.** Pokrenite `npm run db:new-migration -- <same description>` da dobijete novi naziv, premjestite SQL u njega i izbrišite staru `NNN_` datoteku. Opis mora ostati identičan: unos kompatibilnosti u nastavku odgovara njemu.
2. **Dodajte unos kompatibilnosti ako je trajna baza podataka pokretala stari broj.** Ako je bilo koja baza podataka koja se čuva (homolog, VPS, vlastita instalacija suradnika) pokrenula izgradnju PR sa `NNN_` datotekom, dodajte `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` u `RENAMED_MIGRATION_COMPATIBILITY` u `src/lib/db/migrationRunner/constants.ts`. Ovo je** potreban za `237` do `241`** : ti utori sada drže kanonske `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` i `241_seen_models.sql`, a bez unosa takva baza podataka zauvijek preskače kanonsku migraciju i ponovno pokreće pretvorenu. Također radi za utor koji ostaje prazan, kao što je `242`, kada je odredište vremenska oznaka. Ako ste u nedoumici, dodajte unos. Gdje ćete ga dodati u nizu nije važno: kada ciljni utor unosa još uvijek sadrži red koji drugi unos pomiče (na primjer `237` drži PR red dok stariji `usage_history_calculated_cost` red čeka da pređe u `237`), pokretač dopušta tom unosu da čeka dok se utor ne oslobodi. Samo stvarni sukob, kao što je utor koji drži red bez unosa koji se pomiče, ili dva unosa koji zamjenjuju utore, zaustavlja pokretanje s `Cannot reconcile ...`.
3. **Držite SQL idempotentnim** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), jer konvertirana migracija može susresti bazu podataka u kojoj njezina shema već postoji.
4. **Premjestite posebne slučajeve s ključem verzije.** Ako je PR dodao velika i mala slova za svoj stari broj u `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ili u `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), promijenite ključ u novu vremensku oznaku.

`tests/unit/db/codex-fence-migration-rename.test.ts` je radni primjer testa za preimenovanu migraciju.

### Povratak na grane prije preklopnika

Nikada ne birajte ili vraćajte `YYYYMMDDHHMMSS_` datoteku u ogranak koji je prethodio prebacivanju (na primjer, stariji ogranak `release/v*` ). Tamošnji pokretač razvrstava nazive datoteka kao tekst, tako da bi se datoteka s vremenskom oznakom izvodila između `201_` i `202_` na novoj bazi podataka, a stara vrata tamo ne razumiju 14-znamenkasti prefikse. Na takvu granu, zapišite promjenu kao vlastitu sljedeću `NNN_` datoteku te grane, idempotentnu, tako da je bez operacije kada verzija s vremenskom oznakom stigne kasnije.

### Kako se odvijaju migracije

Pri pokretanju, `migrationRunner.ts`:

1. Stvara `_omniroute_migrations` tablicu ako ne postoji
2. Upiti za već primijenjene migracije
3. Primjenjuje sve nove migracije redom, svaku u transakciji
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

Migracije moraju biti** idempotentan** — njihovo pokretanje dvaput bi trebalo biti bez operacije:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Koristite klauzule `IF NOT EXISTS`, `IF EXISTS` i `OR IGNORE` / `OR REPLACE` slobodno.

### Dodavanje nove migracije

1. **Stvorite datoteku s generatorom** : `npm run db:new-migration -- <description>` (na primjer `npm run db:new-migration -- add combo priority`). Zapisuje `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` s trenutnim UTC vremenom i zaglavljem komentara, pomiče se jednu sekundu naprijed ako se ta vremenska oznaka uzme i nikada ne prepisuje datoteku. Ne birajte broj rukom.
2. **Koristite siguran DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Pažljivo ispunite podatke** : koristite `UPDATE ... WHERE ...` za rukovanje postojećim redovima
4. **Provjerite redoslijed i imenovanje** : `npm run test:migrations:fresh` (sve migracije na praznoj bazi podataka) i `npm run check:migration-numbering`
5. **Test na kopiji** : nikada ne izvodite neprovjerene migracije na proizvodnju

Primjer:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Unatrag nekompatibilne promjene** (npr. ispuštanje stupaca) su lukavi. OmniRoute podržava li NOT stariju verziju — nakon što se primijeni migracija, promjena sheme je trajna. Planirajte u skladu s tim.

---

## Enkripcija pohranjenih podataka

Osjetljiva polja (API ključevi, OAuth tokeni, nizovi za povezivanje) šifriraju se pri pohrani pomoću algoritma **AES-256-GCM**.

### Kako funkcionira

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

- `provider_connections.api_key` — šifrira se na razini aplikacije
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifriraju se na razini aplikacije
- Unosi `key_value` s `namespace = "secrets"` — šifriraju se na razini aplikacije
- `proxy_registry.auth` — šifrira se na razini aplikacije (ako postoji)

### Ključ za šifriranje

Ključ za šifriranje izvodi se iz **pristupne fraze** (postavljene putem varijable okruženja `STORAGE_ENCRYPTION_KEY`) i **soli** (pohranjene u bazi podataka). Oboje je potrebno za dešifriranje podataka.

```bash
# Generirajte sigurnu pristupnu frazu
openssl rand -hex 32

# Postavite u .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritično**: Gubitak ključa za šifriranje znači gubitak pristupa svim šifriranim podacima. **Izradite sigurnosnu kopiju ključa odvojeno od baze podataka**.

### Što NIJE šifrirano

Zbog performansi se sljedeće stavke pohranjuju kao čisti tekst:

- Prikazni nazivi pružatelja usluga
- Definicije modela (već su javne)
- Pravila usmjeravanja
- Zapisi o korištenju (bez osobnih podataka)

---

## Napomene o šifriranju (v3.8.16+)

OmniRoute koristi **`migrateLegacyEncryptedString()`** za transparentno rukovanje dvjema shemama šifriranja:

- **Naslijeđena** (prije v3.5.0): „šifriranje” temeljeno na XOR-u (nije prava kriptografija)
- **Trenutačna**: AES-256-GCM s odgovarajućim IV-om i autentifikacijskom oznakom

Pomoćna funkcija za migraciju otkriva naslijeđeni format i pri prvom čitanju ponovno šifrira podatke novom shemom. To znači da možete nadograditi staru bazu podataka bez gubitka vjerodajnica.

---

## Predmemorija za čitanje

Za podatke koji se često čitaju (modele, pružatelje usluga, postavke), `readCache.ts` pruža **predmemoriju u memoriji**:

```ts
// Predmemorirano pri pokretanju, poništava se pri zapisivanju
const providers = await getCachedProviders(); // Brzo, iz memorije
const fresh = await listProviders(); // Sporo, pristupa bazi podataka
```

| Predmemorirani entitet | Ključ predmemorije | TTL            |
| ---------------------- | ------------------ | -------------- |
| `models`               | `models:v1`        | Do zapisivanja |
| `provider_connections` | `providers:v1`     | Do zapisivanja |
| `settings`             | `settings:v1`      | Do zapisivanja |
| `combos`               | `combos:v1`        | Do zapisivanja |

Predmemorija se poništava pri svakom zapisivanju u odgovarajuću tablicu.

---

## Sigurnosno kopiranje i oporavak

### Ručno sigurnosno kopiranje

```bash
# Upotrijebite CLI za izradu lokalne sigurnosne kopije
omniroute backup create --name pre-migration

# Ili putem API-ja
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Datoteka sigurnosne kopije uključuje:

- Sve tablice baze podataka (serijalizirane u JSON)
- Artefakte zapisnika poziva (kodirane u base64, neobavezno)
- Postavke i tajne (šifrirane)
- Konfiguraciju dodataka

### Vraćanje

```bash
# Putem CLI-ja
omniroute restore pre-migration

# Putem API-ja
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Upozorenje**: Vraćanje prepisuje cijelu bazu podataka. Najprije zaustavite sve klijente.

### Automatizirane sigurnosne kopije

```bash
# Omogućite automatizirane dnevne sigurnosne kopije putem CLI-ja
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Raspored se izvršava na strani poslužitelja putem pozadinskog zadatka koji se aktivira svakih 30 sekundi
(zadano) i provjerava cron izraz u odnosu na lokalno vrijeme poslužitelja.

| Varijabla                                   | Zadano  | Opis                                                                                                                  |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Interval aktiviranja u ms (min. `5000`). Mora biti kraći od 60 s kako bi pouzdano obuhvatio odgovarajuću cron minutu. |

### SQLite sigurnosno kopiranje bez prekida rada

Za sigurnosno kopiranje aktivne baze podataka bez prekida rada:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ovo koristi SQLiteov API za mrežno sigurnosno kopiranje — može se sigurno pokrenuti dok je OmniRoute aktivan.

---

## Podešavanje performansi

### način WAL

WAL je omogućen prema zadanim postavkama. Za velika opterećenja pisanja, razmotrite sljedeće:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ne postavlja `journal_size_limit`. Kontrolna točka premješta WAL okvire u glavnu datoteku, ali WAL datoteka zadržava najveću dodijeljenu veličinu. `OMNIROUTE_WAL_GUARD_MAX_MB` stražar samo upozorava i pokreće `wal_checkpoint(RESTART)`; to nije ograničenje veličine diska.

### Indeksi

Ključni indeksi za izvedbu (automatski stvoreni migracijama):

- `idx_models_provider` — traženje modela po pružatelju
- `idx_combo_targets_combo_id` — kombo ciljno proširenje
- `idx_usage_history_api_key_timestamp` — analitika korištenja
- `idx_quota_snapshots_api_key_window` — praćenje kvote
- `idx_call_logs_timestamp` — upiti zapisnika poziva

Za dodavanje novog indeksa kreirajte migraciju:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memorijski preslikan I/O

Za vrlo velike baze podataka (> 10GB), mapiranje memorije može se prilagoditi preko SQLite pragme:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Zbijanje

Dugotrajne OmniRoute instance imaju koristi od povremenog `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Pokretanje mjesečno tijekom prozora s malim prometom. (WAL način rada smanjuje potrebu, ali je ne uklanja.)

---

## Provjera stanja

`src/lib/db/healthCheck.ts` pruža **dijagnostiku stanja na razini baze podataka**:

Obje HTTP metode zahtijevaju autentifikaciju (u suprotnom se vraća `401`). `GET` samo dijagnosticira; `POST` pokreće
istu provjeru s omogućenim `autoRepair`.

```bash
GET  /api/db/health   # dijagnosticiraj
POST /api/db/health   # dijagnosticiraj + popravi
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
      "description": "Proračuni domene upućivali su na API ključeve koji više ne postoje.",
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

| Polje             | Značenje                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` kada je `issues` prazan. `driver` nikada ne utječe na ovu vrijednost.                                                                                   |
| `issues[].type`   | Jedna od vrijednosti `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                          |
| `repairedCount`   | Broj redaka popravljenih tijekom ovog pokretanja; uvijek je `0` kada je `autoRepair` postavljen na false.                                                      |
| `backupCreated`   | Označava je li sigurnosna kopija izrađena prije popravka.                                                                                                      |
| `checkedAt`       | ISO vremenska oznaka koja je zajednička pokretanju i svim zapisanim bilješkama o popravku.                                                                     |
| `driver.name`     | SQLite upravljački program koji poslužuje provjerenu bazu podataka.                                                                                            |
| `driver.degraded` | `true` kada zapisi nisu trajno pohranjeni u datoteci baze podataka — rezervni `sql.js` WASM način rada (pohrana cijele datoteke) ili baza podataka u memoriji. |

Isti korisni sadržaj vraća MCP alat `omniroute_db_health_check`.

Pokrenite `PRAGMA integrity_check` kako biste otkrili oštećenja:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Trebalo bi ispisati: ok
```

Ako vrati bilo što osim `ok`, **odmah prestanite upotrebljavati bazu podataka** i vratite je iz sigurnosne kopije.

---

## Oporavak od katastrofe

### Scenarij 1: Izgubljena WAL datoteka

Datoteka `-wal` nedostaje, ali `-shm` i glavna baza podataka nisu oštećene:

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

### Scenarij 2: Oštećena glavna datoteka baze podataka

Vratite je iz sigurnosne kopije:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` samo preuzima potpunu `.tar.gz` arhivu s poslužitelja koji je pokrenut
(`GET /api/db-backups/exportAll`, potrebne su vjerodajnice operatera); ne vraća nikakve podatke.

### Scenarij 3: Izgubljen ključ za šifriranje

**Oporavak nije moguć** bez ključa. Šifrirana polja nije moguće pročitati. Ručno ponovno dodajte sve pružatelje usluga s novim vjerodajnicama.

> **Ublažavanje rizika**: Ključ za šifriranje uvijek sigurnosno kopirajte zasebno, idealno u upravitelju lozinki ili KMS-u.

### Scenarij 4: Disk je pun

SQLite će vratiti pogreške `SQLITE_FULL`. Oslobodite prostor na disku, a zatim izvršite:

```bash
# Izvršite kontrolnu točku WAL-a kako biste oslobodili prostor
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Uobičajene operacije

### Pregled tablice

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Brojanje redaka u svim tablicama

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Ponovno postavljanje (brisanje) svih podataka

```bash
# Najprije zaustavite OmniRoute
omniroute stop

# Izbrišite datoteku baze podataka
rm ~/.omniroute/storage.sqlite*

# Ponovno pokrenite (ponovno će se stvoriti prazna baza podataka)
omniroute
```

Za **selektivno** ponovno postavljanje (zadržavanje pružatelja usluga, brisanje podataka o upotrebi):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Izvoz pojedinačne tablice

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rješavanje problema

### "Baza podataka je zaključana"

Drugi proces drži zaključavanje za pisanje. Možete:

- Pričekati da drugi proces završi (provjerite pomoću `lsof | grep storage.sqlite`)
- Prekinuti drugi proces
- Ako problem potraje, ponovno pokrenuti OmniRoute

### "Ograničenje stranog ključa nije zadovoljeno"

Modul domene narušava referencijalni integritet. Provjerite:

- Retke bez povezanog nadređenog retka u ovisnim tablicama
- Kaskadna brisanja koja se nisu propagirala
- Nedavnu migraciju kojom je promijenjen strani ključ

Pokrenite `PRAGMA foreign_key_check;` kako biste pronašli nepravilnosti.

### "Nema dovoljno memorije"

SQLiteov memorijski mapirani U/I premašuje ograničenje operacijskog sustava. Smanjite ga pomoću SQLiteove pragme:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB umjesto 256MB
```

Ili ga onemogućite:

```sql
PRAGMA mmap_size = 0;
```

### "Migracija nije uspjela tijekom izvođenja"

Migracija se izvodila unutar transakcije, pa su promjene trebale biti poništene. Ako nisu:

1. **Zaustavite OmniRoute** (spriječite daljnje pokušaje)
2. **Provjerite stanje baze podataka** pomoću alata `sqlite3`
3. **Ručno ispravite** djelomičnu migraciju
4. **Ponovno pokrenite** OmniRoute (migracija će se ponovno pokušati izvršiti)

Kako biste to spriječili, migracije uvijek najprije testirajte na kopiji.

---

## Pogledajte također

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tablice upotrebe
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — praćenje stanja sustava
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — tijek izdavanja
- Izvor: `src/lib/db/` (više od 80 datoteka, ~25 tisuća redaka koda)
