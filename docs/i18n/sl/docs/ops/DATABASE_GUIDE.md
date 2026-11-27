# Database Schema & Operations Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Na kratko**: OmniRoute kot primarno shrambo uporablja **SQLite z beleženjem WAL**, pri čemer so občutljiva polja v mirovanju šifrirana z **AES-256-GCM**. Ta vodnik obravnava shemo, migracije, varnostno kopiranje/obnovitev in operativne priročnike.

**Viri:**

- `src/lib/db/core.ts` — enojček + SCHEMA_SQL (17 osnovnih tabel)
- `src/lib/db/migrationRunner.ts` — različicami označene migracije
- `src/lib/db/migrations/` — 167 različicami označenih datotek SQL
- `src/lib/db/encryption.ts` — pomožne funkcije za šifriranje
- `src/lib/db/backup.ts` — izvoz/uvoz varnostnih kopij
- `src/lib/db/healthCheck.ts` — diagnostika stanja

---

## Zakaj SQLite?

OmniRoute je namesto PostgreSQL/MySQL izbral SQLite iz več razlogov:

| Dejavnik                | SQLite                                         | PostgreSQL                                 |
| ----------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Uvajanje**            | Vgrajen — brez ločenega strežnika              | Zahteva nastavitev strežnika               |
| **Šifriranje**          | Na ravni aplikacije (AES-256-GCM)              | Vgrajeni TDE                               |
| **Zmogljivost**         | Hitrejši za majhne/srednje obremenitve         | Boljši za ogromno sočasnih zapisov         |
| **Sočasnost**           | Način WAL omogoča sočasna branja               | Polni MVCC                                 |
| **Varnostno kopiranje** | Kopiranje ene datoteke                         | `pg_dump` ali posnetek datotečnega sistema |
| **Primer uporabe**      | Namestitev za posameznega uporabnika, vgrajeno | Večnajemniški SaaS                         |

Za uvedbe z **enim uporabnikom in enim primerkom** (primarni primer uporabe za OmniRoute) je SQLite preprostejši in hitrejši.

### Beleženje WAL

`core.ts` odpre podatkovno zbirko v **načinu WAL (vnaprejšnje beleženje zapisov)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL omogoča **sočasna branja** med zapisovanjem — to je pomembno za nadzorno ploščo, ki izvaja poizvedbe med beleženjem zahtev.

Privzeta velikost predpomnilnika je **65.536 KiB (64 MiB)**. SQLite negativno vrednost
`cache_size` razume kot približno zgornjo mejo v KiB in strani dodeljuje po potrebi.
Nastavitev **Nastavitve > Sistem in shramba > Velikost predpomnilnika** sprejema celoštevilske vrednosti od **1 do
1.000.000 KiB**; shranjevanje nastavitve jo uveljavi za aktivno povezavo s podatkovno zbirko,
OmniRoute pa ob zagonu obnovi shranjeno vrednost.

---

## Lokacija podatkovne zbirke

Datoteka SQLite je shranjena na:

| OS      | Pot                                                      |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (nastavljivo prek `DATA_DIR`) |

Spremljevalne datoteke:

- `storage.sqlite-wal` — dnevnik vnaprejšnjega zapisovanja
- `storage.sqlite-shm` — datoteka skupnega pomnilnika
- `call_logs/` — artefakti koristne vsebine zahtev (če je omogočeno)

**Preglasitev lokacije:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitektura domenskih modulov

Podatkovna zbirka OmniRoute ima **110 vrhnjih modulov TypeScript** v `src/lib/db/`. Vsak domenski modul:

- Upravlja eno ali več določenih tabel
- Izvaža tipizirane funkcije CRUD
- Nikoli ne dostopa do tabel drugega modula
- Za dostop do podatkovne zbirke uporablja `getDbInstance()` iz `core.ts`

### 110 vrhnjih modulov podatkovne zbirke

OmniRoute ima **110 vrhnjih datotek TypeScript** v `src/lib/db/`. Spodaj je prikazan izbor ključnih modulov; celoten seznam najdete v izpisu imenika:

| Modul                   | Tabele                                                         | Odgovornost                                                                            |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registracija ponudnikov in poverilnice s ključi OAuth/API                              |
| `models.ts`             | `key_value` (podatki modelov)                                  | Definicije modelov, zmogljivosti in cene                                               |
| `combos.ts`             | `combos`                                                       | Konfiguracije in vrstni red kombiniranega usmerjanja                                   |
| `apiKeys.ts`            | `api_keys`                                                     | Življenjski cikel ključev API, obsegi in spremljanje kvot                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistemska konfiguracija in skupna shramba ključ-vrednost                               |
| `backup.ts`             | —                                                              | Postopki izvoza/uvoza varnostnih kopij                                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracije posredniških strežnikov in pravila usmerjanja                            |
| `prompts.ts`            | `prompt_templates`                                             | Predloge pozivov za večkratno uporabo in upravljanje različic                          |
| `webhooks.ts`           | `webhooks`                                                     | Naročnine na spletne kavlje, ki jih sprožijo dogodki, in dnevniki                      |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Revizijsko beleženje posameznih zahtev (izbirno, velika količina)                      |
| `domainState.ts`        | `domain_*` (5 tabel)                                           | Domenske omejitve porabe, odklopniki, zaklepi, nadomestne verige in zgodovina stroškov |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Ključi API na seznamu dovoljenih za MCP/A2A                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Zgodovinska poraba kvot                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Preslikava modelov v privzete kombinacije                                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trajno stanje, specifično za CLI                                                       |
| `encryption.ts`         | —                                                              | Pomožne funkcije za šifriranje/dešifriranje polj                                       |
| `readCache.ts`          | —                                                              | Predpomnilnik v pomnilniku za operacije z veliko branja                                |
| `secrets.ts`            | `key_value` (šifrirani vnosi)                                  | Šifrirana hramba skrivnosti                                                            |
| `stateReset.ts`         | —                                                              | Brisanje/ponastavitev stanja podatkovne zbirke za testiranje                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst seje za predajo med agenti                                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Spremljanje uporabe                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracija stiskanja                                                                |

### Meje modulov

Ključno arhitekturno pravilo: **moduli ne dostopajo neposredno do tabel drugih modulov**. Če želite delati s podatki drugega modula, uvozite funkcijo iz tega modula.

```ts
// ❌ NAPAČNO: neposredni SQL iz drugega modula
db.prepare("SELECT * FROM provider_connections").all();

// ✅ PRAVILNO: uporabite funkcijo modula providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

To pravilo se uveljavlja s pregledom kode — statičnega preverjanja ni, vendar so kršitve označene.

---

## Osnovna shema (17 tabel)

`core.ts` definira 17 osnovnih tabel v `SCHEMA_SQL`. Ustvarjene so z migracijo `001_initial_schema.sql` in tvorijo jedrno shemo.

### Jedrne tabele (ustvarjene v začetni migraciji)

| Tabela                     | Namen                                      | Ključni stolpci                                                         |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Poverilnice ponudnika (šifrirane)          | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Podatki za usmerjanje vozlišč ponudnika    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Splošna shramba KV                         | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicije kombinacij usmerjanja           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ključi API za prehod                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metapodatki podatkovne zbirke              | `key`, `value`                                                          |
| `usage_history`            | Zapisi o uporabi zahtevkov                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Koristne vsebine zahtevkov in odgovori     | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Dnevniki zahtevkov posredniškega strežnika | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Verige med modeli in ponudniki             | `model`, `chain`                                                        |
| `domain_budgets`           | Proračuni porabe po domenah                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Zgodovina ponastavitev proračunov          | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Sledenje stroškom po domenah               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stanje omejevanja hitrosti za domeno       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stanje odklopnika za posamezno domeno      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Predpomnilnik odgovorov LLM                | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Zgodovinski posnetki kvot                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatne tabele (dodane s poznejšimi migracijami)

Naknadne migracije dodajo tabele, kot so:

- `cli_tool_state` (migracija 011) — stanje orodja CLI
- tabele `mcp_*` — revizija strežnika MCP
- tabele `a2a_*` — stanje opravil A2A
- tabele `usage_*` — sledenje uporabi
- tabele `plugin_*` — sistem vtičnikov
- `skill_executions` — zgodovina izvajanja veščin
- tabele `memory_*` — pomnilniški sistem
- tabele `compression_*` — sistem stiskanja
- tabele `webhook_*` — dnevnik dostave webhookov
- tabele `acp_*` — Agent Client Protocol
- tabele `oneproxy_*` — tržnica 1proxy
- `proxy_assignments` — vezave obsega posredniškega strežnika
- `detailed_call_artifacts` — metapodatki artefaktov dnevnika klicev
- `quota_alert_history` — revizija opozoril o kvotah
- `command_code_auth_sessions` — seje OAuth za Command Code

Celoten seznam več kot 30 tabel je v `src/lib/db/migrations/`.

---

## Migracije

OmniRoute uporablja** verzionirane, idempotentne migracije** v `src/lib/db/migrations/`. Vsaka migracija je ena datoteka SQL. Soobstajata dva formata poimenovanja; različica, zapisana v `_omniroute_migrations` je številska predpona.

### Poimenovanje selitve

| Oblika                                           | Primer                               | Uporablja se za                                                                                                                                                              |
| ------------------------------------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (natanko 3 števke)         | `241_seen_models.sql`                | Stara serija `001`–`241`. Zamrznjeno, ko je format časovnega žiga pristal (`240` in `241` sta bila združena tik pred njim): nobena nova datoteka ne dobi zaporedne številke. |
| `YYYYMMDDHHMMSS_description.sql` (14 števk, UTC) | `20261113120000_add_usage_index.sql` | Vsaka selitev, ustvarjena od 13.11.2026 naprej.                                                                                                                              |

Zakaj sprememba: pri zaporednih številkah je vzporedni PRs izbral isto naslednjo številko in vse razen enega je bilo treba pred združitvijo preštevilčiti. Časovni žig UTC daje vsakemu PR svojo različico.

Pravila za obliko časovnega žiga (uveljavi `npm run check:migration-numbering`, deli z generatorjem v `scripts/check/lib/migrationNaming.mjs`):

- Časovni žig je pravi datum in čas UTC, ne prej kot `20261113000000` in ne več kot 10 minut v prihodnosti.
- Opis je mala `snake_case` ki se začne s črko (`a-z`, `0-9`, enojni `_` med besedami), največ 80 znakov.
- Dve datoteki z enakim časovnim žigom sta dvojnika.
- Pravilo brez vrzeli velja samo za staro vrsto: vsako število od `001` do `241` mora obstajati, razen znanih vrzeli `026`, `055` in `121`. Brisanje `241` (ali katere koli stare datoteke) ne uspe. `001` in `241` ni mogoče nikoli dodati na seznam dovoljenih `KNOWN_GAPS`. Datoteke s časovnim žigom nikoli ne ustvarijo vrzeli.
- Vsak vnos v `src/lib/db/migrations/` mora biti navadna datoteka z veljavnim imenom `.sql` z malimi črkami. Imenik, simbolna povezava, datoteka `.SQL` ali `.sql.bak`, skrita datoteka ali ime s presledkom ne prenese vrat, ker bi jo tekač tiho preskočil ali pa se zrušil ob zagonu.

**Uporabi naročilo.** Tekmovalec razvrsti po številski vrednosti predpone, ne po besedilu: najprej stare datoteke `001`–`241`, nato datoteke s časovnim žigom v vrstnem redu časovnih žigov, nato vsi imeniki z imenskim prostorom, registrirani z `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (različice, kot je `ee-001`). Čakajoča selitev je katera koli datoteka, katere različica ni v `_omniroute_migrations`, tako da selitev iz starejše veje, ki se združi za novejšo, še vedno velja za obstoječe baze podatkov.

**Časovni žig je vrstni red ustvarjanja, ne vrstni red spajanja.** Če je vaša selitev odvisna od tabele ali stolpca, ustvarjenega s selitvijo z a** novejši** časovni žig (na primer enega iz drugega PR, ki se je prvi združil), bi nova zbirka podatkov najprej zagnala vašo in ne bi uspela. Medtem ko je vaš PR še vedno odprt, ponovno ustvarite ime datoteke z `npm run db:new-migration`, da bo dobila novejši časovni žig, ali pa ga naredite neodvisnega. `npm run test:migrations:fresh` uporabi vsako selitev v prazno zbirko podatkov in to ujame.

### Združena selitev se nikoli ne izbriše ali preimenuje

Ko je datoteka za selitev v izdajni veji ali `main`, se je že izvajala v homolognih in razvijalskih bazah podatkov, pri namestitvah VPS in v Enterprise sync. Od takrat naprej:

- **Nikoli ga ne izbrišite.** Sveže namestitve bi izgubile svojo shemo, medtem ko jo nadgrajene baze podatkov ohranijo.
- **Nikoli ga ne preimenujte.** Različica v `_omniroute_migrations` se ne bi več ujemala z datoteko, zato bi jo vsaka baza podatkov, ki jo je že uporabila, znova zagnala. Neidempotentni SQL nato podvoji podatke ali ustavi zagon.
- **Potrebujete drugačno shemo?** Ustvarite novo selitev z `npm run db:new-migration`.

Preimenovanje je varno samo za datoteko, ki še ni združena, kar je primer, na katerega se nanašajo namigi vrat. Oznaka izdaje tukaj ne spremeni ničesar: vsak pritisk na vejo `release/v*` objavi sliko Docker `:next` in deluje na homologu, namestitvah VPS in sinhronizaciji Enterprise, tako da se je združena migracija izvajala v resničnih bazah podatkov, preden obstaja katera koli oznaka `vX.Y.Z`. Vrata ne uspejo pri vsaki odstranitvi osnovne datoteke, označene ali ne.

- **Razveljavitev združene selitve.** `git revert`, ki izbriše datoteko, ne uspe. Ohranite datoteko in razveljavite njeno shemo v novi selitvi: `npm run db:new-migration -- <description>`, z `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` in tako naprej. Nadgrajene in sveže baze podatkov se nato končajo z isto shemo.
- **Eno sprejeto preimenovanje: vnos združljivosti in enaka vsebina.** Če se mora združena datoteka premakniti (na primer, dve združeni datoteki si delita časovni žig in se izvajalec ustavi s trkom različic), preimenujte poznejšo, ne da bi se dotaknili njenega SQL, in dodajte `{ fromVersion, fromName, toVersion, toName }` v `RENAMED_MIGRATION_COMPATIBILITY` v `src/lib/db/migrationRunner/constants.ts`. Baze podatkov, ki so uporabljale staro različico, se vrstica `_omniroute_migrations` premaknejo, namesto da bi znova zagnali datoteko. Vrata opozorijo na takšno preimenovanje in vedno zaženejo komutacijsko preverjanje na njem, ne glede na nov časovni žig: sveže namestitve datoteko uporabijo na njenem novem položaju, nadgrajene baze podatkov pa ne, zato izberite nov časovni žig blizu starega. Vrata ne uspejo preimenovati, če se je vsebina spremenila (sprememba sheme še vedno poteka pri novi selitvi) ali če ciljne datoteke vnosa ni na disku.
- **Nikoli ne preimenujte znotraj istega časovnega žiga.** Preimenovanje, ki obdrži časovni žig in spremeni samo opis, ne preide v vrata, z ali brez vnosa. Z vnosom, katerega `toVersion` je enak njegovemu `fromVersion`, izvajalec izbriše staro vrstico `_omniroute_migrations` in znova uporabi datoteko v vsaki bazi podatkov, ki jo je že izvajala. Brez vnosa tekalnik sledi samo različici: preskoči datoteko v teh bazah podatkov (nova vsebina se tam nikoli ne zažene) in ob vsakem zagonu zabeleži napako pri preštevilčenju. Uporabite drug časovni žig in vnos združljivosti ali obdržite ime.
- **Vrata preverijo, da se preimenovana datoteka ne zažene znova.** Za vsako pokrito preimenovanje vrata posredujejo novo ime datoteke komutacijskemu preverjanju z `--must-not-apply`. Preverjanje zažene nadgrajeno zbirko podatkov s pravim izvajalcem in če izvajalec ponovno uporabi to datoteko (na primer, ker ima vnos napačno različico ali ime ali ker razčlenjevalnik besedila vrat prebere `constants.ts` drugače kot TypeScript), vrata ne uspejo z `migration renomeada rodaria de novo` in vas prosijo, da preverite stare in nove različice in imena vnosa.

### Kaj vrata preverjajo glede na bazo

Pri izvajanju zahteve za vleko in čakalne vrste združevanja `npm run check:migration-numbering` primerja `src/lib/db/migrations/` na disku z istim imenikom v osnovni veji. Osnova je v tem vrstnem redu: `--base-latest-tag`, `--base <ref>`, spremenljivka `MIGRATION_BASE_REF` ali, kadar je `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` ali `merge_group`, prvi nadrejeni potrditev združevanja, `merge_group.base_sha` koristnega tovora dogodka ali `git merge-base HEAD origin/$GITHUB_BASE_REF`. Pri zahtevi za vlečenje ali izvajanju čakalne vrste združevanja brez razločljive baze vrata ne uspejo. Zunaj CI brez `--base` natisne `comparação com a base: pulada (sem --base)` in preskoči ta pravila.

`--base-latest-tag` primerja z najnovejšo oznako izdaje (`vX.Y.Z` v vrstnem redu semver; oznake s priponami, kot je nightlies, ne štejejo), ki je v zgodovini `HEAD`, z enakimi pravili kot `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) zažene vrata na ta način, ker potisni in načrtovani zagoni nimajo osnove za zahteve po vleki in združevanje lahko pristane brez novega zagona CI. Brez oznake za sprostitev v zgodovini vrata ne uspejo; zaženite `git fetch --tags` (v CI `actions/checkout` z `fetch-depth: 0` prinese oznake).

| Sprememba zahteve za vlečenje                                                                             | Rezultat                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Datoteka, ki obstaja v bazi, se preimenuje z vnosom `RENAMED_MIGRATION_COMPATIBILITY`                     | **Opozorilo** če je vsebina enaka in se preverjanje komutacije izvaja ne glede na nov časovni žig; ne uspe, če novi položaj spremeni končno shemo (razveljavi preimenovanje ali izbere drug nov časovni žig, kjer se premika) ali če bi tekač znova uporabil preimenovano datoteko v nadgrajeni bazi podatkov.** ne uspe** če se vsebina spremeni. |
| Datoteka, ki obstaja na bazi, se preimenuje, pri čemer se ohrani njen časovni žig (spremeni se samo opis) | **ne uspe** , z ali brez vnosa: tekač bi ga znova uporabil (z vnosom) ali preskočil po različici (brez njega). Uporabite drug časovni žig in vnos združljivosti ali obdržite ime.                                                                                                                                                                  |
| Datoteka, ki obstaja na bazi, se izbriše ali preimenuje brez vnosa                                        | **ne uspe** , ne glede na to, ali je datoteka v oznaki izdaje ali ne. Če želite to razveljaviti, obnovite datoteko z `git checkout <base> -- src/lib/db/migrations/<file>`; če želite razveljaviti njegovo shemo, dodajte novo selitev z `DROP ... IF EXISTS`.                                                                                     |
| Datoteka, ki obstaja v bazi, ima drugačno vsebino                                                         | **Opozorilo** (opomba `::warning` v dejanjih GitHub ) in zažene se preverjanje komutacije. Ne uspe, če urejanje spremeni končno shemo, ker nadgrajene baze podatkov urejene datoteke ne uporabijo znova: spremembo vnesite v novo selitev. Neškodljivo urejanje (komentar, `IF NOT EXISTS`) samo opozori.                                          |
| Datoteka s časovnim žigom je dodana s časovnim žigom, ki ni novejši od najnovejšega v bazi                | Zažene preverjanje komutacije, opisano spodaj.                                                                                                                                                                                                                                                                                                     |
| Datoteka starega formata `NNN_` je dodana s številko pod najnovejšo osnovno datoteko starega formata      | **ne uspe** , tudi če je `KNOWN_GAPS` urejen v isti zahtevi za vlečenje: stara serija je zamrznjena, ustvarite selitev z `npm run db:new-migration`. Sprejemajo se datoteke starega formata, ki so nad najnovejšo osnovno datoteko (povlečna zahteva `release/v*` v `main` ).                                                                      |
| Neurejena, urejena ali preimenovana datoteka vsebuje stavke `INSERT`, `UPDATE`, `DELETE` ali `REPLACE`    | **Opozorilo** : preverjanje komutacije ne primerja podatkov, zato preverite, ali vrstni red, v katerem ga uporabljajo nadgrajene in sveže zbirke podatkov, spremeni rezultat.                                                                                                                                                                      |

En zagon komutacijskega preverjanja zajema datoteke v okvari, urejene in preimenovane datoteke skupaj.

Preverjanje komutacije (`scripts/check/migration-commutation.ts`) zgradi dve začasni bazi podatkov s pravo namestitveno potjo:** nadgrajena** ena (zagon z osnovnimi selitvami, nato znova zagon iste datoteke s selitvami zahteve za vlečenje) in** sveže** ena (en zagon s selitvami zahteve za vlečenje). Primerja dobljene sheme: tabele in stolpce (ne upošteva vrstnega reda stolpcev), omejitve UNIQUE / PRIMARY KEY in FOREIGN KEY, normalizirano besedilo `CREATE TABLE` vsake tabele (ki zajema omejitve CHECK, primerjave, ustvarjene stolpce in možnosti tabele), indekse, sprožilce in poglede. Podatki vrstic se ne primerjajo. Če se ujemajo, vrata natisnejo, da datoteka ni v redu, vendar se premika in preide. Če se razlikujejo, vrata ne uspejo z razliko in namigom za primer: za datoteko, ki ni v redu, ponovno ustvarite njeno ime z `npm run db:new-migration`, kar je varno, ker datoteka še ni združena; za urejeno osnovno datoteko obnovite osnovno vsebino in vnesite spremembo v novo selitev; za preimenovano datoteko razveljavite preimenovanje ali izberite drug nov časovni žig, kjer se premika, nikoli istega časovnega žiga z drugim imenom. Če samo preverjanje ne more začeti, vrata ne uspejo v CI in opozorijo le lokalno. Za urejeno osnovno datoteko je nadgrajena zbirka podatkov zgrajena z osnovno vsebino te datoteke, drugi zagon pa jo preskoči, ker je njena različica že zabeležena. Za preimenovano datoteko je nadgrajena zbirka podatkov zgrajena z datoteko pod njenim starim imenom, drugi zagon pa premakne njeno vrstico `_omniroute_migrations` skozi vnos združljivosti, namesto da bi jo znova zagnal; vrata posredujejo novo ime z `--must-not-apply`, tako da preverjanje ne uspe, če ga uporabi drugi zagon. Če se migracija zahteve za vleko ne uveljavi na nadgrajeni poti, to je po vsaki osnovni selitvi (ne glede na to, ali ne uspe tudi pri novi namestitvi), vrata poročajo `migration do PR não aplica` in vas prosijo, da popravite SQL glede na trenutno shemo baze; če je datoteka odvisna od druge migracije zahteve po vleku s poznejšim časovnim žigom, ponovno ustvarite njeno ime z `npm run db:new-migration`.

Če želite zagnati isto primerjavo lokalno, izrecno posredujte osnovo, na primer `npm run check:migration-numbering -- --base origin/<base-branch>` ali `npm run check:migration-numbering -- --base-latest-tag` za primerjavo z najnovejšo izdajo.

### Pretvorba migracije PR Open `NNN`

Zahteva za vlečenje, odprta pred stikalom, lahko še vedno nosi zaporedno datoteko, kot je `242_add_widgets.sql`. Stare številke nad `241` so zavrnjene, zato jih pretvorite pred združitvijo:

1. **Preimenujte datoteko z generatorjem in obdržite opis.** Zaženite `npm run db:new-migration -- <same description>`, da dobite novo ime, premaknite SQL vanj in izbrišite staro datoteko `NNN_`. Opis mora ostati enak: spodnji vnos združljivosti se ujema z njim.
2. **Dodajte vnos združljivosti, če je trajna zbirka podatkov izvajala staro številko.** Če je katera koli baza podatkov, ki se hrani (homolog, VPS, lastna namestitev sodelavca), zagnala gradnjo PR z datoteko `NNN_`, dodajte `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` v `RENAMED_MIGRATION_COMPATIBILITY` v `src/lib/db/migrationRunner/constants.ts`. To je** potrebno za `237` v `241`** : te reže zdaj vsebujejo kanonične `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` in `241_seen_models.sql` in brez vnosa takšna zbirka podatkov za vedno preskoči kanonično selitev in znova zažene pretvorjeno. Deluje tudi za režo, ki ostane prazna, kot je `242`, ko je cilj časovni žig. Če ste v dvomih, dodajte vnos. Kje ga dodate v matriko, ni pomembno: ko ciljna reža vnosa še vedno vsebuje vrstico, ki jo drugi vnos premakne (na primer `237` drži vrstico PR medtem ko starejša vrstica `usage_history_calculated_cost` čaka, da se premakne v `237`), tekač pusti ta vnos počakati, dokler se reža ne sprosti. Samo pravi konflikt, kot je reža, ki jo drži vrstica, v kateri se noben vnos ne premakne, ali dva vnosa, ki zamenjata reži, ustavi zagon z `Cannot reconcile ...`.
3. **Naj bo SQL idempotenten** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), ker lahko pretvorjena selitev sreča zbirko podatkov, kjer njena shema že obstaja.
4. **Premik posebnih primerov s ključem različice.** Če je PR dodal črke za svojo staro številko v `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ali v `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), spremenite ključ v nov časovni žig.

`tests/unit/db/codex-fence-migration-rename.test.ts` je delujoč primer testa za preimenovano selitev.

### Vrata v veje pred preklopom

Nikoli ne izbirajte in ne prenašajte datoteke `YYYYMMDDHHMMSS_` v vejo, ki je bila pred zamenjavo (na primer starejša veja `release/v*` ). Tamkajšnji tekalnik razvrsti imena datotek kot besedilo, tako da bi se datoteka s časovnim žigom izvajala med `201_` in `202_` v novi zbirki podatkov, tamkajšnja stara vrata pa ne razumejo 14-mestnih predpon. Na takšno vejo zapišite spremembo kot lastno naslednjo datoteko `NNN_` te veje, idempotentno, tako da je brez operacije, ko različica s časovnim žigom prispe pozneje.

### Kako potekajo migracije

Ob zagonu `migrationRunner.ts`:

1. Ustvari tabelo `_omniroute_migrations`, če ne obstaja
2. Poizvedbe za že uporabljene migracije
3. Uporabi vse nove selitve po vrstnem redu, vsako v transakciji
4. Beleži vsako uporabljeno selitev s časovnim žigom

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

### Idempotenca

Migracije morajo biti** idempotenten** — ki jih dvakrat zažene, bi moral biti brez operacije:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Izjemno uporabljajte klavzule `IF NOT EXISTS`, `IF EXISTS` in `OR IGNORE` / `OR REPLACE`.

### Dodajanje nove migracije

1. **Ustvarite datoteko z generatorjem** : `npm run db:new-migration -- <description>` (na primer `npm run db:new-migration -- add combo priority`). Zapiše `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` s trenutnim časom UTC in glavo komentarja, premakne se za eno sekundo naprej, če je zajet ta časovni žig, in nikoli ne prepiše datoteke. Ne izbirajte številk z roko.
2. **Uporabite varno DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Previdno zapolnite podatke** : uporabite `UPDATE ... WHERE ...` za obravnavo obstoječih vrstic
4. **Preverite vrstni red in poimenovanje** : `npm run test:migrations:fresh` (vse selitve na prazno zbirko podatkov) in `npm run check:migration-numbering`
5. **Test na kopiji** : nikoli ne izvajajte nepreizkušenih migracij v proizvodnji
6. **Tudi tabela, ustvarjena iz kode, potrebuje selitev** : če modul tudi leno ustvari tabelo (`CREATE TABLE IF NOT EXISTS`, ki se hrani kot pot samozdravljenja), jo mora selitev ustvariti z istim DDL. V nasprotnem primeru se čista namestitev in nadgrajena namestitev končata z različnimi shemami, odvisno od tega, ali se je ta kodna pot izvajala. `tests/unit/db/lazy-table-migration-guard.test.ts` pregleda `src/` in `open-sse/` in ne uspe na lenem `CREATE` brez selitve (#20557). Primer: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

primer:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Za nazaj nezdružljive spremembe** (npr. izpuščanje stolpcev) so zapleteni. OmniRoute ali NOT podpira znižanje —, ko se uporabi selitev, je sprememba sheme trajna. Ustrezno načrtujte.

---

## Šifriranje shranjenih podatkov

Občutljiva polja (ključi API, žetoni OAuth, nizi za povezavo) so pri shranjevanju šifrirana z uporabo algoritma **AES-256-GCM**.

### Kako deluje

```ts
// src/lib/db/encryption.ts (poenostavljeno)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kje se uporablja

- `provider_connections.api_key` — šifrirano na ravni aplikacije
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrirano na ravni aplikacije
- vnosi `key_value` z `namespace = "secrets"` — šifrirano na ravni aplikacije
- `proxy_registry.auth` — šifrirano na ravni aplikacije (če je prisotno)

### Šifrirni ključ

Šifrirni ključ je izpeljan iz **geselne fraze** (nastavljene prek okoljske spremenljivke `STORAGE_ENCRYPTION_KEY`) in **soli** (shranjene v podatkovni zbirki). Za dešifriranje podatkov sta potrebna oba.

```bash
# Ustvarite varno geselno frazo
openssl rand -hex 32

# Nastavite jo v .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritično**: Izguba šifrirnega ključa pomeni izgubo dostopa do vseh šifriranih podatkov. **Varnostno kopijo ključa hranite ločeno od podatkovne zbirke**.

### Kaj NI šifrirano

Zaradi zmogljivosti so naslednji podatki shranjeni kot navadno besedilo:

- Prikazna imena ponudnikov
- Definicije modelov (že javne)
- Pravila usmerjanja
- Zapisi o uporabi (brez osebno določljivih podatkov)

---

## Opozorila glede šifriranja (v3.8.16+)

OmniRoute uporablja **`migrateLegacyEncryptedString()`** za pregledno obravnavo dveh načinov šifriranja:

- **Stari način** (pred v3.5.0): »šifriranje« na osnovi XOR (ni prava kriptografija)
- **Trenutni način**: AES-256-GCM z ustreznim inicializacijskim vektorjem in oznako za preverjanje pristnosti

Pomočnik za migracijo zazna staro obliko in jo ob prvem branju znova šifrira z novim načinom. To pomeni, da lahko nadgradite staro podatkovno zbirko, ne da bi izgubili poverilnice.

---

## Predpomnilnik za branje

Za pogosto brane podatke (modele, ponudnike, nastavitve) `readCache.ts` zagotavlja **predpomnilnik v pomnilniku**:

```ts
// Predpomnjeno ob zagonu, razveljavljeno ob zapisu
const providers = await getCachedProviders(); // Hitro, v pomnilniku
const fresh = await listProviders(); // Počasi, dostopa do podatkovne zbirke
```

| Predpomnjena entiteta  | Ključ predpomnilnika | TTL       |
| ---------------------- | -------------------- | --------- |
| `models`               | `models:v1`          | Do zapisa |
| `provider_connections` | `providers:v1`       | Do zapisa |
| `settings`             | `settings:v1`        | Do zapisa |
| `combos`               | `combos:v1`          | Do zapisa |

Predpomnilnik se razveljavi ob vsakem zapisu v ustrezno tabelo.

---

## Varnostno kopiranje in obnovitev

### Ročno varnostno kopiranje

```bash
# Z vmesnikom CLI ustvarite lokalno varnostno kopijo
omniroute backup create --name pre-migration

# Ali prek API-ja
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Datoteka varnostne kopije vključuje:

- Vse tabele podatkovne zbirke (serializirane v JSON)
- Artefakte dnevnika klicev (kodirane z base64, izbirno)
- Nastavitve in skrivnosti (šifrirane)
- Konfiguracijo vtičnikov

### Obnovitev

```bash
# Prek CLI-ja
omniroute restore pre-migration

# Prek API-ja
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Opozorilo**: Obnovitev prepiše celotno podatkovno zbirko. Najprej zaustavite vse odjemalce.

### Samodejne varnostne kopije

```bash
# Prek CLI-ja omogočite samodejno dnevno varnostno kopiranje
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Razpored izvaja opravilo v ozadju na strani strežnika, ki se privzeto sproži vsakih 30 sekund
in ovrednoti izraz cron glede na lokalni čas strežnika.

| Spremenljivka                               | Privzeto | Opis                                                                                                                        |
| ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Interval proženja v ms (najmanj `5000`). Za zanesljivo izvajanje znotraj ujemajoče se minute cron mora biti krajši od 60 s. |

### Sprotno varnostno kopiranje SQLite

Za varnostno kopiranje delujoče podatkovne zbirke brez prekinitve delovanja:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

To uporablja SQLite API za spletno varnostno kopiranje — izvajanje je varno tudi med delovanjem OmniRoute.

---

## Nastavitev zmogljivosti

### način WAL

WAL je privzeto omogočen. Za velike pisalne obremenitve upoštevajte:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ne nastavi `journal_size_limit`. Kontrolna točka premakne okvirje WAL v glavno datoteko, vendar datoteka WAL ohrani svojo največjo dodeljeno velikost. Varovalo `OMNIROUTE_WAL_GUARD_MAX_MB` samo opozori in zažene `wal_checkpoint(RESTART)`; ni omejitev velikosti diska.

### Indeksi

Ključni indeksi za uspešnost (samodejno ustvarjeni s selitvami):

- Iskanje modelov `idx_models_provider` — po ponudniku
- `idx_combo_targets_combo_id` — kombinirana ciljna razširitev
- `idx_usage_history_api_key_timestamp` — analitika uporabe
- `idx_quota_snapshots_api_key_window` — sledenje kvotam
- `idx_call_logs_timestamp` — poizvedbe dnevnika klicev

Če želite dodati nov indeks, ustvarite selitev:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Za zelo velike zbirke podatkov (> 10 GB) je mogoče preslikavo pomnilnika prilagoditi prek pragme SQLite :

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Zbijanje

Dolgo delujočim primerkom OmniRoute koristi občasni `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Zaženite mesečno med okni z nizkim prometom. (način WAL zmanjša potrebo, vendar je ne odpravi.)

---

## Preverjanje stanja

`src/lib/db/healthCheck.ts` zagotavlja **diagnostiko stanja na ravni podatkovne zbirke**:

Oba glagola zahtevata preverjanje pristnosti (sicer je vrnjeno `401`). `GET` samo diagnosticira; `POST` izvede
enako preverjanje z omogočeno možnostjo `autoRepair`.

```bash
GET  /api/db/health   # diagnosticiranje
POST /api/db/health   # diagnosticiranje + popravilo
```

Odgovor je `DbHealthCheckResult`, ki ga ustvari `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Proračuni domen so se sklicevali na ključe API, ki ne obstajajo več.",
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

| Polje             | Pomen                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, ko je `issues` prazen. `driver` nikoli ne vpliva nanj.                                                                                                         |
| `issues[].type`   | Ena od vrednosti `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                      |
| `repairedCount`   | Vrstice, popravljene med tem zagonom; vedno `0`, ko je `autoRepair` false.                                                                                             |
| `backupCreated`   | Ali je bila pred popravilom ustvarjena varnostna kopija.                                                                                                               |
| `checkedAt`       | Časovni žig ISO, ki je skupen zagonu in morebitni opombi o popravilu, ki jo ta zapiše.                                                                                 |
| `driver.name`     | Gonilnik SQLite, ki uporablja preverjeno podatkovno zbirko.                                                                                                            |
| `driver.degraded` | `true`, ko zapisi niso trajno podprti z datoteko podatkovne zbirke — nadomestni gonilnik WASM `sql.js` (trajnost celotne datoteke) ali podatkovna zbirka v pomnilniku. |

Enako koristno vsebino vrne orodje MCP `omniroute_db_health_check`.

Za odkrivanje poškodb zaženite `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Izpisati bi se moralo: ok
```

Če vrne kar koli drugega kot `ok`, **nemudoma prenehajte uporabljati podatkovno zbirko** in jo obnovite iz varnostne kopije.

---

## Obnovitev po katastrofi

### Scenarij 1: Datoteka WAL je izgubljena

Datoteka `-wal` manjka, vendar sta `-shm` in glavna podatkovna zbirka nepoškodovani:

```bash
# Samodejno se obnovi ob naslednjem odprtju
omniroute
```

Če SQLite ne more izvesti samodejne obnovitve:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenarij 2: Glavna datoteka podatkovne zbirke je poškodovana

Obnovite jo iz varnostne kopije:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` zgolj prenese celoten arhiv `.tar.gz` iz delujočega strežnika
(`GET /api/db-backups/exportAll`, zahtevane so poverilnice upravljavca); ničesar ne obnovi.

### Scenarij 3: Šifrirni ključ je izgubljen

Brez ključa **obnovitev ni mogoča**. Šifriranih polj ni mogoče prebrati. Ročno znova dodajte vse ponudnike z novimi poverilnicami.

> **Omilitev tveganja**: Šifrirni ključ vedno varnostno kopirajte ločeno, najbolje v upravitelju gesel ali sistemu KMS.

### Scenarij 4: Disk je poln

SQLite bo vrnil napake `SQLITE_FULL`. Sprostite prostor na disku in nato izvedite:

```bash
# Izvedite kontrolno točko WAL, da sprostite prostor
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Pogosta opravila

### Pregled tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Štetje vrstic v vseh tabelah

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Ponastavitev (izbris) vseh podatkov

```bash
# Najprej zaustavite OmniRoute
omniroute stop

# Izbrišite datoteko podatkovne zbirke
rm ~/.omniroute/storage.sqlite*

# Znova zaženite (ustvarjena bo nova prazna podatkovna zbirka)
omniroute
```

Za **selektivno** ponastavitev (ohranitev ponudnikov, izbris podatkov o uporabi):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Izvoz posamezne tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Odpravljanje težav

### »Podatkovna zbirka je zaklenjena«

Drug proces zadržuje zaklep za pisanje. Izvedite eno od naslednjih dejanj:

- Počakajte, da se drug proces konča (preverite z `lsof | grep storage.sqlite`)
- Končajte drug proces
- Če težava ne izgine, znova zaženite OmniRoute

### »Omejitev tujega ključa ni bila izpolnjena«

Domenski modul krši referenčno integriteto. Preverite:

- Osirotele vrstice v odvisnih tabelah
- Kaskadne izbrise, ki se niso razširili
- Nedavno selitev, ki je spremenila tuji ključ

Za iskanje kršitev zaženite `PRAGMA foreign_key_check;`.

### »Ni dovolj pomnilnika«

Vhodno-izhodne operacije SQLite s preslikavo v pomnilnik presegajo omejitev operacijskega sistema. Zmanjšajte porabo s pragmo SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB namesto 256 MB
```

Ali jih onemogočite:

```sql
PRAGMA mmap_size = 0;
```

### »Selitev se je ustavila na sredini«

Selitev se je izvajala v transakciji, zato bi morala biti razveljavljena. Če ni bila:

1. **Zaustavite OmniRoute** (preprečite nadaljnje poskuse)
2. **Preverite stanje podatkovne zbirke** z `sqlite3`
3. **Ročno popravite** delno selitev
4. **Znova zaženite** OmniRoute (poskus selitve bo ponovljen)

Da to preprečite, selitve vedno najprej preizkusite na kopiji.

---

## Glejte tudi

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele uporabe
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — spremljanje stanja
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — postopek izdaje
- Izvorna koda: `src/lib/db/` (več kot 80 datotek, približno 25.000 vrstic kode)
