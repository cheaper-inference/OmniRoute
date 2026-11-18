# Database Schema & Operations Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Fil-qosor**: OmniRoute juża **SQLite bil-ġurnalar WAL** bħala l-ħażna primarja tiegħu, b’kriptaġġ **AES-256-GCM** għad-data maħżuna għal oqsma sensittivi. Din il-gwida tkopri l-iskema, il-migrazzjonijiet, il-backup/irkupru, u l-proċeduri operattivi.

**Sorsi:**

- `src/lib/db/core.ts` — istanza unika + SCHEMA_SQL (17-il tabella bażi)
- `src/lib/db/migrationRunner.ts` — migrazzjonijiet bil-verżjonijiet
- `src/lib/db/migrations/` — 167 fajl SQL bil-verżjonijiet
- `src/lib/db/encryption.ts` — funzjonijiet ta’ għajnuna għall-kriptaġġ
- `src/lib/db/backup.ts` — esportazzjoni/importazzjoni tal-backup
- `src/lib/db/healthCheck.ts` — dijanjostika tal-istat tas-sistema

---

## Għaliex SQLite?

OmniRoute għażel SQLite minflok PostgreSQL/MySQL għal diversi raġunijiet:

| Fattur             | SQLite                                      | PostgreSQL                                     |
| ------------------ | ------------------------------------------- | ---------------------------------------------- |
| **Installazzjoni** | Inkorporat — ebda server separat            | Jeħtieġ il-konfigurazzjoni ta’ server          |
| **Kriptaġġ**       | Fis-saff tal-applikazzjoni (AES-256-GCM)    | TDE integrat                                   |
| **Prestazzjoni**   | Aktar veloċi għal tagħbijiet żgħar/medji    | Aħjar għal għadd enormi ta’ kitbiet simultanji |
| **Konkorrenza**    | Il-modalità WAL tippermetti qari simultanju | MVCC sħiħ                                      |
| **Backup**         | Kopja ta’ fajl wieħed                       | `pg_dump` jew snapshot tas-sistema tal-fajls   |
| **Każ ta’ użu**    | Installazzjoni għal kull utent, inkorporat  | SaaS għal diversi klijenti                     |

Għal installazzjonijiet b’**utent wieħed u istanza waħda** (il-każ ta’ użu ewlieni ta’ OmniRoute), SQLite huwa aktar sempliċi u aktar veloċi.

### Ġurnalar WAL

`core.ts` jiftaħ id-database bil-**modalità WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL jippermetti **qari simultanju** waqt il-kitbiet — importanti għad-dashboard, li jwettaq queries waqt li t-talbiet ikunu qed jiġu rreġistrati.

Id-daqs predefinit tal-cache huwa **65,536 KiB (64 MiB)**. SQLite jinterpreta
`cache_size` negattiv bħala limitu massimu approssimattiv f’KiB u jalloka l-paġni skont il-bżonn.
**Settings > System & Storage > Cache Size** jaċċetta valuri sħaħ minn **1 sa
1,000,000 KiB**; meta tissejvja l-konfigurazzjoni, din tiġi applikata għall-konnessjoni attiva mad-database,
u OmniRoute jirrestawra l-valur maħżun meta jibda.

---

## Post tad-Database

Il-fajl SQLite jinħażen fi:

| OS      | Mogħdija                                                          |
| ------- | ----------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                     |
| macOS   | `~/.omniroute/storage.sqlite`                                     |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                         |
| Docker  | `/app/data/storage.sqlite` (konfigurabbli permezz ta’ `DATA_DIR`) |

Fajls assoċjati:

- `storage.sqlite-wal` — reġistru tal-kitba bil-quddiem
- `storage.sqlite-shm` — fajl tal-memorja kondiviża
- `call_logs/` — artefatti tal-payloads tat-talbiet (jekk attivati)

**Ibdel il-post:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arkitettura tal-Moduli tad-Dominju

Id-database ta' OmniRoute għandha **110 moduli TypeScript tal-ogħla livell** f'`src/lib/db/`. Kull modulu tad-dominju:

- Huwa responsabbli għal tabella speċifika waħda jew aktar
- Jesporta funzjonijiet CRUD ittajpjati
- Qatt ma jaċċessa t-tabelli ta' modulu ieħor
- Juża `getDbInstance()` minn `core.ts` biex jaċċessa d-DB

### Il-110 Moduli tad-DB tal-Ogħla Livell

OmniRoute għandu **110 fajls TypeScript tal-ogħla livell** f'`src/lib/db/`. Hawn taħt hawn kampjun tal-moduli ewlenin; ara l-lista tad-direttorju għal-lista sħiħa:

| Modulu                  | Tabelli                                                        | Responsabbiltà                                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Reġistrazzjoni u kredenzjali tal-fornituri permezz ta' OAuth/API key                       |
| `models.ts`             | `key_value` (data tal-mudelli)                                 | Definizzjonijiet, kapaċitajiet u prezzijiet tal-mudelli                                    |
| `combos.ts`             | `combos`                                                       | Konfigurazzjonijiet u ordni tar-routing tal-combos                                         |
| `apiKeys.ts`            | `api_keys`                                                     | Ċiklu tal-ħajja tal-API keys, scopes u traċċar tal-kwoti                                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurazzjoni tas-sistema u maħżen KV kondiviż                                           |
| `backup.ts`             | —                                                              | Operazzjonijiet ta' esportazzjoni/importazzjoni tal-backup                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurazzjonijiet tal-proxy u regoli tar-routing                                         |
| `prompts.ts`            | `prompt_templates`                                             | Mudelli ta' prompts li jistgħu jerġgħu jintużaw u verżjonar                                |
| `webhooks.ts`           | `webhooks`                                                     | Abbonamenti u logs tal-webhooks immexxija minn avvenimenti                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Reġistrazzjoni tal-awditjar għal kull request (fakultattiva, volum għoli)                  |
| `domainState.ts`        | `domain_*` (5 tabelli)                                         | Baġits tad-dominju, circuit breakers, lockouts, ktajjen ta' fallback u storja tal-ispejjeż |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API keys fil-whitelist għal MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Użu storiku tal-kwoti                                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Jimmappja l-mudelli għall-combos predefiniti                                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Stat persistenti speċifiku għas-CLI                                                        |
| `encryption.ts`         | —                                                              | Helpers għall-kriptaġġ/dekriptaġġ tal-fields                                               |
| `readCache.ts`          | —                                                              | Cache fil-memorja għal operazzjonijiet b'ħafna qari                                        |
| `secrets.ts`            | `key_value` (entrati kriptati)                                 | Ħażna kriptata tas-sigrieti                                                                |
| `stateReset.ts`         | —                                                              | Tħassir/reset tal-istat tad-DB għall-ittestjar                                             |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kuntest tas-sessjoni għat-trasferiment bejn l-aġenti                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Traċċar tal-użu                                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurazzjoni tal-kompressjoni                                                           |

### Konfini tal-Moduli

Regola arkitettonika ewlenija: **il-moduli ma jaċċessawx direttament it-tabelli ta' xulxin**. Biex taħdem bid-data ta' modulu ieħor, importa l-funzjoni minn dak il-modulu.

```ts
// ❌ ĦAŻIN: SQL dirett minn modulu ieħor
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TAJJEB: uża l-funzjoni tal-modulu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Din ir-regola tiġi infurzata permezz tar-rieżami tal-code — m'hemm l-ebda verifika statika, iżda l-ksur jiġi mmarkat.

---

## Skema Bażi (17-il tabella)

`core.ts` jiddefinixxi s-17-il tabella bażi f’`SCHEMA_SQL`. Dawn jinħolqu mill-migrazzjoni `001_initial_schema.sql` u jiffurmaw l-iskema ewlenija.

### Tabelli Ewlenin (maħluqa fil-migrazzjoni inizjali)

| Tabella                    | Għan                                                | Kolonni ewlenin                                                         |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Kredenzjali tal-fornitur (kriptaġġati)              | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informazzjoni dwar ir-routing tan-nodi tal-fornitur | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ħażna KV ġenerali                                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definizzjonijiet tal-kombinazzjonijiet tar-routing  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ċwievet tal-API għall-gateway                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata tal-bażi tad-data                          | `key`, `value`                                                          |
| `usage_history`            | Rekords tal-użu tat-talbiet                         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payloads u tweġibiet tat-talbiet                    | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logs tat-talbiet tal-proxy                          | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Ktajjen mill-mudell għall-fornitur                  | `model`, `chain`                                                        |
| `domain_budgets`           | Baġits tal-infiq għal kull dominju                  | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Storja tar-risettjar tal-baġit                      | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Traċċar tal-ispejjeż għal kull dominju              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stat tal-limitu tar-rata tad-dominju                | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stat tas-circuit breaker għal kull dominju          | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache tat-tweġibiet tal-LLM                         | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshots storiċi tal-kwota                         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelli Addizzjonali (miżjuda minn migrazzjonijiet sussegwenti)

Migrazzjonijiet sussegwenti jżidu tabelli bħal:

- `cli_tool_state` (migrazzjoni 011) — stat tal-għodda CLI
- Tabelli `mcp_*` — awditjar tas-server MCP
- Tabelli `a2a_*` — stat tal-kompiti A2A
- Tabelli `usage_*` — traċċar tal-użu
- Tabelli `plugin_*` — sistema tal-plugins
- `skill_executions` — storja tal-eżekuzzjoni tal-ħiliet
- Tabelli `memory_*` — sistema tal-memorja
- Tabelli `compression_*` — sistema tal-kompressjoni
- Tabelli `webhook_*` — log tal-konsenja tal-webhooks
- Tabelli `acp_*` — Protokoll tal-Klijent tal-Aġent
- Tabelli `oneproxy_*` — suq ta’ 1proxy
- `proxy_assignments` — rabtiet tal-ambitu tal-proxy
- `detailed_call_artifacts` — metadata tal-artefatti tal-log tas-sejħiet
- `quota_alert_history` — awditjar tat-twissijiet dwar il-kwota
- `command_code_auth_sessions` — sessjonijiet OAuth ta’ Command Code

Il-lista sħiħa ta’ madwar 30+ tabella tinsab f’`src/lib/db/migrations/`.

---

## Migrazzjonijiet

OmniRoute juża** migrazzjonijiet versioned, idempotenti** fi `src/lib/db/migrations/`. Kull migrazzjoni hija fajl SQL wieħed. Żewġ formati ta' ismijiet jikkoeżistu; il-verżjoni rreġistrata `_omniroute_migrations` hija l-prefiss numeriku.

### Ismijiet tal-Migrazzjoni

| Format                                              | Eżempju                              | Użat għal                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (eżatt 3 ċifri)               | `241_seen_models.sql`                | Is-serje l-antika `001`–`241`. Iffriżat meta l-format tal-timestamp niżel (`240` u `241` ġew magħquda eżatt qabel): l-ebda fajl ġdid ma jieħu numru sekwenzjali. |
| `YYYYMMDDHHMMSS_description.sql` (14-il ċifra, UTC) | `20261113120000_add_usage_index.sql` | Kull migrazzjoni maħluqa mill-2026-11-13 'il quddiem.                                                                                                            |

Għaliex il-bidla: b'numri sekwenzjali, PRs paralleli qabad l-istess numru li jmiss u kollha ħlief wieħed kellhom jerġgħu jiġu numerati qabel ma jingħaqdu. Timestamp UTC jagħti lil kull PR il-verżjoni tiegħu stess.

Regoli għall-format tat-timbru taż-żmien (infurzat minn `npm run check:migration-numbering`, maqsuma mal-ġeneratur `scripts/check/lib/migrationNaming.mjs`):

- It-timestamp huwa data u ħin UTC reali, mhux qabel `20261113000000` u mhux aktar minn 10 minuti fil-futur.
- Id-deskrizzjoni hija `snake_case` żgħira li tibda b'ittra (`a-z`, `0-9`, `_` wieħed bejn il-kliem), mhux aktar minn 80 karattru.
- Żewġ fajls bl-istess timestamp huma duplikati.
- Ir-regola tal-ebda vojt tapplika biss għas-serje l-antika: kull numru minn `001` sa `241` għandu jeżisti, ħlief il-lakuni magħrufa `026`, `055` u `121`. It-tħassir ta `241` (jew kwalunkwe fajl antik) ifalli l-gate. `001` u `241` qatt ma jistgħu jiġu miżjuda mal-lista ta' permessi `KNOWN_GAPS`. Fajls bit-timbru qatt ma joħolqu vojt.
- Kull entrata `src/lib/db/migrations/` trid tkun fajl regolari b'isem `.sql` minusku validu. Direttorju, symlink, fajl `.SQL` jew `.sql.bak`, fajl moħbi jew isem bi spazju jfallu l-bieb, minħabba li r-runner kien jaqbeżha siekta jew tiġġarraf mal-but.

**Applika l-ordni.** Ir-runner jagħżel skont il-valur numeriku tal-prefiss, mhux skont it-test: l-ewwel fajls `001`–`241` l-antik, imbagħad il-fajls bit-timestamp f’ordni tat-timestamp, imbagħad kwalunkwe direttorji spazjati bl-isem irreġistrati ma `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (verżjonijiet bħal `ee-001`). Migrazzjoni pendenti hija kwalunkwe fajl li l-verżjoni tiegħu mhix `_omniroute_migrations`, għalhekk migrazzjoni minn fergħa anzjani li tgħaqqad wara waħda aktar ġdida għadha tapplika fuq databases eżistenti.

**Il-timestamp huwa ordni ta' ħolqien, mhux ordni ta' amalgamazzjoni.** Jekk il-migrazzjoni tiegħek tiddependi fuq tabella jew kolonna maħluqa minn migrazzjoni b'a** aktar ġodda** timestamp (per eżempju, wieħed minn PR oħra li ngħaqdet l-ewwel), database ġdida taħdem tiegħek l-ewwel u tfalli. Waqt li PR tiegħek għadu miftuħ, iġġenera l-isem tal-fajl `npm run db:new-migration` sabiex ikollu timestamp aktar ġdid, jew għamilha indipendenti. `npm run test:migrations:fresh` japplika kull migrazzjoni għal database vojta u jaqbad dan.

### Migrazzjoni Magħquda Qatt Qatt Tħassar jew Isimha mill-ġdid

Ladarba fajl tal-migrazzjoni jkun fuq fergħa tar-rilaxx jew `main`, ikun diġà ħadmu fuq databases tal-omolog u tal-iżviluppaturi, fuq installazzjonijiet VPS u fis-sinkronizzazzjoni tal-Enterprise. Minn hemm 'il quddiem:

- **Qatt tħassarha.** Installazzjonijiet friski jitilfu l-iskema tiegħu filwaqt li databases aġġornati jżommuha.
- **Qatt semmieh.** Il-verżjoni `_omniroute_migrations` ma tibqax taqbel ma' fajl, għalhekk kull database li diġà applikatha terġa' tħaddem. SQL mhux idempotent imbagħad jidduplika d-data jew iwaqqaf il-boot.
- **Għandek bżonn skema differenti?** Oħloq migrazzjoni ġdida bi `npm run db:new-migration`.

Tismija mill-ġdid hija sigura biss għal fajl li għadu mhux magħqud, li huwa l-każ li jirreferu għalih il-ħjiel tal-gate. Tag rilaxx ma tbiddel xejn hawn: kull spinta lejn fergħa `release/v*` tippubblika l-immaġni Docker `:next` u taħdem fuq homolog, VPS installs u s-sinkronizzazzjoni tal-Enterprise, għalhekk migrazzjoni magħquda saret fuq databases reali qabel ma teżisti kwalunkwe tag `vX.Y.Z`. Il-bieb jonqos kull tneħħija ta 'fajl bażi, ittikkettat jew le.

- **Treġġa' lura migrazzjoni magħquda.** A `git revert` li tħassar il-fajl ifalli l-gate. Żomm il-fajl u ħoll l-iskema tiegħu f'migrazzjoni ġdida: `npm run db:new-migration -- <description>`, ma `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` eċċ. Databases aġġornati u friski mbagħad jispiċċaw bl-istess skema.
- **Il-wieħed aċċettat isem ġdid: dħul ta 'kompatibilità u kontenut identiku.** Jekk fajl magħqud irid jiċċaqlaq (pereżempju, żewġ fajls magħquda jaqsmu timestamp u r-runner jieqaf b'ħabta tal-verżjoni), semmi mill-ġdid lil dak ta' aktar tard mingħajr ma tmiss SQL tiegħu u żid `{ fromVersion, fromName, toVersion, toName }` ma' `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts`. Id-databases li applikaw il-verżjoni l-antika jċaqalqu r-ringiela `_omniroute_migrations` tagħhom minflok ma jerġgħu jmexxu l-fajl. Il-bieb iwissi dwar isem ġdid bħal dan u dejjem imexxi l-kontroll tal-kommutazzjoni fuqha, tkun xi tkun il-timestamp il-ġdid: installazzjonijiet friski japplikaw il-fajl fil-pożizzjoni l-ġdida tiegħu, id-databases aġġornati ma jagħmlux dan, għalhekk agħżel timestamp ġdid ħdejn il-qadim. Il-bieb jonqos l-isem mill-ġdid jekk il-kontenut jinbidel (bidla ta 'skema għadha tmur f'migrazzjoni ġdida), jew jekk il-fajl fil-mira tad-dħul ma jkunx fuq disk.
- **Qatt tibdel isem fl-istess timestamp.** Tismija mill-ġdid li żżomm it-timbru taż-żmien u tbiddel biss id-deskrizzjoni tfalli l-bieb, bi jew mingħajr dħul. B'entrata li `toVersion` tagħha hija ugwali għal `fromVersion` tagħha , ir-runner iħassar ir-ringiela `_omniroute_migrations` l-antika u jerġa' japplika l-fajl fuq kull database li diġà ħadmet. Mingħajr dħul, ir-runner isegwi biss il-verżjoni: jaqbeż il-fajl fuq dawk id-databases (kontenut ġdid qatt ma jmur hemm) u jirreġistra żball ta' numerazzjoni mill-ġdid fuq kull boot. Uża timestamp ieħor flimkien ma' dħul ta' kompatibilità, jew żomm l-isem.
- **Il-bieb jiċċekkja li l-fajl isem ġdid ma jerġax jaħdem.** Għal kull isem ġdid kopert, il-bieb jgħaddi l-isem tal-fajl il-ġdid lill-kontroll tal-kommutazzjoni `--must-not-apply`. Iċ-check boots id-database aġġornata bir-runner reali, u jekk ir-runner jerġa' japplika dak il-fajl (pereżempju, minħabba li d-dħul għandu verżjoni jew isem ħażin, jew minħabba li l-parser tat-test tal-gate jaqra `constants.ts` b'mod differenti minn TypeScript), il-gate jonqos `migration renomeada rodaria de novo` u jgħidlek biex tiċċekkja l-verżjonijiet u l-ismijiet qodma u ġodda tad-dħul.

### Dak li l-Bieb Iċċekkja Kontra l-Bażi

Fuq talba pull u merge-queue runs, `npm run check:migration-numbering` jqabbel `src/lib/db/migrations/` fuq disk mal-istess direttorju fuq il-fergħa bażi. Il-bażi hija, f'din l-ordni: `--base-latest-tag`, `--base <ref>`, il-varjabbli `MIGRATION_BASE_REF`, jew, meta `GITHUB_EVENT_NAME` huwa `pull_request`, `pull_request_target` jew `merge_group`, l-ewwel ġenitur tal-commit tal-merge, iż- `merge_group.base_sha` tat-tagħbija tal-avveniment, jew `git merge-base HEAD origin/$GITHUB_BASE_REF`. F'talba pull jew merge-queue run bl-ebda bażi riżolvibbli l-gate jonqos. Barra CI mingħajr `--base` jistampa `comparação com a base: pulada (sem --base)` u taqbeż dawn ir-regoli.

`--base-latest-tag` tqabbel mat-tikketta tar-rilaxx l-aktar ġdida (`vX.Y.Z` f'ordni semver; tags suffissi bħal nightlies ma jgħoddux) li hija fl-istorja ta ' `HEAD`, bl-istess regoli bħal `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) imexxi l-bieb b'dan il-mod, minħabba li l-ġirjiet push u skedati m'għandhom l-ebda bażi ta 'talba ta' ġibda u amalgamazzjoni tista 'tinżel mingħajr ġirja CI friska. Bl-ebda tikketta ta 'rilaxx fl-istorja l-bieb jonqos; run `git fetch --tags` (fi CI, `actions/checkout` ma `fetch-depth: 0` iġib it-tags).

| Bidla fuq it-talba tal-ġibda                                                                                             | Riżultat                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fajl li jeżisti fuq il-bażi jingħata isem ġdid, b'entrata `RENAMED_MIGRATION_COMPATIBILITY`                              | **Twissija** jekk il-kontenut ikun identiku, u l-kontroll tal-kommutazzjoni jibda jkun xi jkun il-timestamp il-ġdid; tonqos jekk il-pożizzjoni l-ġdida tbiddel l-iskema finali (ħoll l-isem mill-ġdid, jew agħżel timestamp ġdid ieħor fejn jibdel) jew jekk ir-runner jerġa' japplika l-fajl isem ġdid fuq database aġġornata.** Jfalli** jekk il-kontenut inbidel. |
| Fajl li jeżisti fuq il-bażi jingħata l-isem mill-ġdid u jżomm it-timbru taż-żmien tiegħu (id-deskrizzjoni biss tinbidel) | **Jfalli** , bi jew mingħajr dħul: ir-runner jerġa' japplikaha (bl-entrata) jew jaqbeżha skont il-verżjoni (mingħajr waħda). Uża timestamp ieħor flimkien ma' dħul ta' kompatibilità, jew żomm l-isem.                                                                                                                                                               |
| Fajl li jeżisti fuq il-bażi jitħassar, jew jismu mill-ġdid mingħajr dħul                                                 | **Jfalli** , kemm jekk il-fajl ikun f'tikketta tar-rilaxx jew le. Biex tneħħiha, irrestawra l-fajl `git checkout <base> -- src/lib/db/migrations/<file>`; biex ireġġa' lura l-iskema tagħha, żid migrazzjoni ġdida `DROP ... IF EXISTS`.                                                                                                                             |
| Fajl li jeżisti fuq il-bażi għandu kontenut differenti                                                                   | **Twissija** (annotazzjoni `::warning` f'Azzjonijiet GitHub ), u l-kontroll tal-kommutazzjoni jibda. Jfalli jekk l-editjar jibdel l-iskema finali, minħabba li databases aġġornati ma jerġgħux japplikaw il-fajl editjat: poġġi l-bidla f'migrazzjoni ġdida. Editjar li ma jagħmilx ħsara (kumment, `IF NOT EXISTS`) iwissi biss.                                    |
| Fajl bit-timestamp huwa miżjud b'timestamp mhux aktar ġdid mill-aktar ġdid tal-bażi                                      | Iwettaq il-kontroll tal-kommutazzjoni, deskritt hawn taħt.                                                                                                                                                                                                                                                                                                           |
| Fajl `NNN_` ta 'format antik huwa miżjud b'numru taħt l-aktar fajl ġdid ta' format antik tal-bażi                        | **Jfalli** , anki jekk `KNOWN_GAPS` jiġi editjat fl-istess talba tal-ġibda: is-serje l-antika hija ffriżata, oħloq il-migrazzjoni `npm run db:new-migration`. Fajls ta' format antik fuq l-aktar wieħed ġdid tal-bażi (talba ta' ġibda `release/v*` sa `main` ) huma aċċettati.                                                                                      |
| Fajl mhux ta' ordni, editjat jew isem ġdid fih dikjarazzjonijiet `INSERT`, `UPDATE`, `DELETE` jew `REPLACE`              | **Twissija** : il-verifika tal-kommutazzjoni ma tqabbilx id-dejta, għalhekk tirrevedi jekk l-ordni li fiha d-databases aġġornati u ġodda japplikaw hix tibdel ir-riżultat.                                                                                                                                                                                           |

Run waħda tal-kontroll tal-kommutazzjoni tkopri l-out-of-order, il-fajls editjati u l-fajls isem ġdid flimkien.

Il-kontroll tal-kommutazzjoni (`scripts/check/migration-commutation.ts`) jibni żewġ databases temporanji bil-mogħdija tal-installazzjoni reali: an** imtejba** wieħed (ibbutja bil-migrazzjonijiet bażi, imbagħad ibda mill-ġdid fuq l-istess fajl bil-migrazzjonijiet tal-pull request) u** frisk** wieħed (boot wieħed bil-migrazzjonijiet tat-talba tal-ġibda). Hija tqabbel l-iskemi li jirriżultaw: tabelli u kolonni (jinjora l-ordni tal-kolonni), UNIQUE / PRIMARY KEY u FOREIGN KEY restrizzjonijiet, it-test `CREATE TABLE` normalizzat ta 'kull tabella (li jkopri CHECK restrizzjonijiet, kollazzjonijiet, kolonni ġġenerati u għażliet ta' tabella), indiċi, triggers u fehmiet. Id-dejta tar-ringiela mhix imqabbla. Jekk jaqblu, il-bieb jistampa li l-fajl huwa barra mill-ordni iżda jibdel, u jgħaddi. Jekk ivarjaw, il-bieb jonqos bid-differenza u ħjiel għall-każ: għal fajl li ma kienx fl-ordni, riġenera ismu `npm run db:new-migration`, li huwa sigur minħabba li l-fajl għadu ma ġiex magħqud; għal fajl bażi editjat, irrestawra l-kontenut bażi u poġġi l-bidla f'migrazzjoni ġdida; għal fajl b'isem ġdid, neħħi l-isem mill-ġdid jew agħżel timestamp ġdid ieħor fejn jibdel, qatt l-istess timestamp b'isem ieħor. Jekk il-kontroll innifsu ma jistax jaħdem, il-bieb ifalli CI u jwissi biss lokalment. Għal fajl bażi editjat, id-database aġġornata hija mibnija bil-kontenut tal-bażi ta 'dak il-fajl, u t-tieni boot taqbeżha minħabba li l-verżjoni tagħha hija diġà rreġistrata. Għal fajl isem ġdid, id-database aġġornata hija mibnija bil-fajl taħt l-isem l-antik tagħha, u t-tieni boot iċċaqlaq ir-ringiela `_omniroute_migrations` tagħha permezz tal-entrata ta 'kompatibilità minflok terġa' tħaddem; il-bieb jgħaddi l-isem il-ġdid `--must-not-apply`, għalhekk il-kontroll ifalli jekk it-tieni boot tapplikah. Jekk migrazzjoni ta 'talba ta' ġibda tonqos milli tapplika fuq il-mogħdija aġġornata, jiġifieri, wara kull migrazzjoni bażi (kemm jekk tonqos ukoll fuq installazzjoni ġdida jew le), il-bieb jirrapporta `migration do PR não aplica` u jistaqsik biex tiffissa l- SQL kontra l-iskema attwali tal-bażi; jekk il-fajl jiddependi fuq migrazzjoni oħra ta 'pull request b'timestamp aktar tard, riġenera ismu `npm run db:new-migration`.

Biex tmexxi l-istess paragun lokalment, għaddi l-bażi b'mod espliċitu, pereżempju `npm run check:migration-numbering -- --base origin/<base-branch>`, jew `npm run check:migration-numbering -- --base-latest-tag` biex tqabbel mal-aħħar rilaxx.

### Konverżjoni ta' Migrazzjoni `NNN` ta' PR Miftuħ

Talba ta' ġibda miftuħa qabel is-swiċċ xorta tista' ġġorr fajl sekwenzjali bħal `242_add_widgets.sql`. Numri qodma 'l fuq minn `241` huma miċħuda, għalhekk ikkonverti qabel ma tingħaqad:

1. **Semmi mill-ġdid il-fajl bil-ġeneratur, filwaqt li żżomm id-deskrizzjoni.** Mexxi `npm run db:new-migration -- <same description>` biex tikseb l-isem il-ġdid, ċċaqlaq iż- SQL fih, u ħassar il-fajl `NNN_` l-antik. Id-deskrizzjoni trid tibqa' identika: id-dħul ta' kompatibilità hawn taħt taqbel magħha.
2. **Żid dħul ta 'kompatibilità jekk database persistenti mexxiet in-numru l-antik.** Jekk xi database li tinżamm (homolog, a VPS, installazzjoni ta' kontributur stess) mexxa build ta' PR bil-fajl `NNN_`, żid `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` ma `RENAMED_MIGRATION_COMPATIBILITY` `src/lib/db/migrationRunner/constants.ts`. Dan hu** meħtieġa għal `237` sa `241`** : dawk is-slots issa jżommu l-kanoniku `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` u `241_seen_models.sql`, u mingħajr id-dħul tali database taqbeż il-migrazzjoni kanonika għal dejjem u terġa 'tmexxi dik konvertita. Taħdem ukoll għal slot li jibqa' vojt, bħal `242`, meta d-destinazzjoni tkun timestamp. Meta għandek dubju, żid l-entrata. Fejn iżżidha fl-array ma jimpurtax: meta slot fil-mira ta' dħul ikun għadu jżomm ringiela li dħul ieħor jitbiegħed (per eżempju `237` li jżomm ringiela PR waqt li ringiela `usage_history_calculated_cost` anzjana tistenna li timxi fi `237`), ir-runner iħalli dik id-dħul tistenna sakemm is-slot ikun ħieles. Konflitt reali biss, bħal slot miżmum minn ringiela l-ebda dħul ma jiċċaqlaq, jew żewġ entrati li jbiddlu slots, iwaqqaf il-boot `Cannot reconcile ...`.
3. **Żomm SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), minħabba li l-migrazzjoni kkonvertita tista' tilħaq database fejn l-iskema tagħha diġà teżisti.
4. **Ċaqlaq każijiet speċjali verżjoni keyed.** Jekk iż- PR żiedet każ għan-numru l-antik tagħha `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) jew `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), ibdel iċ-ċavetta għall-timestamp il-ġdid.

`tests/unit/db/codex-fence-migration-rename.test.ts` huwa eżempju ta' ħidma ta' test għal migrazzjoni b'isem ġdid.

### Backports għal Fergħat Qabel l-Iswiċċ

Qatt ma tiġbor ċirasa jew tagħti lura fajl `YYYYMMDDHHMMSS_` għal fergħa li tkun qabel is-swiċċ (pereżempju fergħa `release/v*` eqdem). Ir-runner hemmhekk jagħżel l-ismijiet tal-fajls bħala test, għalhekk fajl b'timbra taż-żmien ikun għaddej bejn `201_` u `202_` fuq database ġdida, u l-bieb l-antik hemmhekk ma jifhimx prefissi ta '14-il ċifra. Fuq fergħa bħal din, ikteb il-bidla bħala l-fajl `NNN_` li jmiss ta' dik il-fergħa stess, idempotent, għalhekk huwa no-op meta l-verżjoni bit-timestamp tasal aktar tard.

### Kif Jiġru l-Migrazzjonijiet

Fl-istartjar, `migrationRunner.ts`:

1. Johloq tabella `_omniroute_migrations` jekk ma tezistix
2. Mistoqsijiet għal migrazzjonijiet diġà applikati
3. Japplika kwalunkwe migrazzjoni ġdida fl-ordni, kull waħda fi tranżazzjoni
4. Jirreġistra kull migrazzjoni applikata b'timestamp

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

### Idempotenza

Il-migrazzjonijiet iridu jkunu** idempotenti** — li jmexxihom darbtejn għandu jkun no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Uża klawżoli `IF NOT EXISTS`, `IF EXISTS`, u `OR IGNORE` / `OR REPLACE` liberali.

### Żieda ta' Migrazzjoni Ġdida

1. **Oħloq il-fajl bil-ġeneratur** : `npm run db:new-migration -- <description>` (per eżempju `npm run db:new-migration -- add combo priority`). Jikteb `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` bil-ħin UTC kurrenti u header tal-kumment, jimxi 'l quddiem sekonda jekk jittieħed dak it-timestamp, u qatt ma jikteb fuq fajl. Tagħżelx numru bl-idejn.
2. **DDL sigur** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Imla d-data bir-reqqa** : uża `UPDATE ... WHERE ...` biex timmaniġġja ringieli eżistenti
4. **Iċċekkja l-ordni u l-ismijiet** : `npm run test:migrations:fresh` (il-migrazzjoni kollha fuq database vojta) u `npm run check:migration-numbering`
5. **Test fuq kopja** : qatt ma tmexxi migrazzjonijiet mhux ittestjati fuq il-produzzjoni

Eżempju:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bidliet inkompatibbli b'lura** (eż., twaqqa' kolonni) huma delikati. OmniRoute ma NOT jappoġġa downgrade — ladarba migrazzjoni tiġi applikata, il-bidla skema hija permanenti. Ippjana kif xieraq.

---

## Kriptaġġ tad-Data Maħżuna

Oqsma sensittivi (ċwievet tal-API, tokens OAuth, strings tal-konnessjoni) jiġu kriptati waqt li jkunu maħżuna bl-użu ta’ **AES-256-GCM**.

### Kif Jaħdem

```ts
// src/lib/db/encryption.ts (issimplifikat)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Fejn Jintuża

- `provider_connections.api_key` — kriptat fil-livell tal-applikazzjoni
- `provider_connections.access_token`, `refresh_token`, `id_token` — kriptati fil-livell tal-applikazzjoni
- Entrati `key_value` b’`namespace = "secrets"` — kriptati fil-livell tal-applikazzjoni
- `proxy_registry.auth` — kriptat fil-livell tal-applikazzjoni (jekk preżenti)

### Ċavetta tal-Kriptaġġ

Iċ-ċavetta tal-kriptaġġ tiġi derivata minn **passphrase** (issettjata permezz tal-varjabbli tal-ambjent `STORAGE_ENCRYPTION_KEY`) u **salt** (maħżun fid-DB). It-tnejn huma meħtieġa biex tiġi dekriptata d-data.

```bash
# Iġġenera passphrase sigura
openssl rand -hex 32

# Issettjaha f'.env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiku**: Jekk titlef iċ-ċavetta tal-kriptaġġ, titlef l-aċċess għad-data kriptata kollha. **Żomm kopja ta’ riżerva taċ-ċavetta separatament mid-database**.

### X’MHUX Kriptat

Għal raġunijiet ta’ prestazzjoni, dawn li ġejjin jinħażnu bħala test sempliċi:

- Ismijiet għall-wiri tal-fornituri
- Definizzjonijiet tal-mudelli (diġà pubbliċi)
- Regoli tar-routing
- Rekords tal-użu (mingħajr PII)

---

## Twissijiet dwar il-Kriptaġġ (v3.8.16+)

OmniRoute juża **`migrateLegacyEncryptedString()`** biex jittratta żewġ skemi ta’ kriptaġġ b’mod trasparenti:

- **Preċedenti** (qabel v3.5.0): “kriptaġġ” ibbażat fuq XOR (mhux kriptografija vera)
- **Attwali**: AES-256-GCM b’IV u tikketta ta’ awtentikazzjoni xierqa

L-għodda awżiljarja tal-migrazzjoni tinduna bil-format preċedenti u terġa’ tikkriptah bl-iskema l-ġdida mal-ewwel qari. Dan ifisser li tista’ taġġorna database qadima mingħajr ma titlef il-kredenzjali.

---

## Cache tal-Qari

Għal data li tinqara ta’ spiss (mudelli, fornituri, settings), `readCache.ts` jipprovdi **cache fil-memorja**:

```ts
// Jinħażen fil-cache waqt l-istartjar u jiġi invalidat mal-kitba
const providers = await getCachedProviders(); // Veloċi, fil-memorja
const fresh = await listProviders(); // Bil-mod, jaċċessa d-DB
```

| Entità fil-cache       | Ċavetta tal-cache | TTL                |
| ---------------------- | ----------------- | ------------------ |
| `models`               | `models:v1`       | Sakemm issir kitba |
| `provider_connections` | `providers:v1`    | Sakemm issir kitba |
| `settings`             | `settings:v1`     | Sakemm issir kitba |
| `combos`               | `combos:v1`       | Sakemm issir kitba |

Il-cache jiġi invalidat ma’ kull kitba fit-tabella korrispondenti.

---

## Backup u Rkupru

### Backup Manwali

```bash
# Uża s-CLI biex toħloq backup lokali
omniroute backup create --name pre-migration

# Jew permezz tal-API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Il-fajl tal-backup jinkludi:

- It-tabelli kollha tad-DB (serializzati għal JSON)
- Artifatti tar-reġistru tas-sejħiet (ikkodifikati b’base64, fakultattivi)
- Settings + sigrieti (ikkriptati)
- Konfigurazzjoni tal-plugin

### Restawr

```bash
# Permezz tas-CLI
omniroute restore pre-migration

# Permezz tal-API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Twissija**: Ir-restawr jissostitwixxi d-DB kollha. Waqqaf il-klijenti kollha l-ewwel.

### Backups Awtomatizzati

```bash
# Attiva backups awtomatizzati ta’ kuljum permezz tas-CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

L-iskeda tiġi eżegwita fuq in-naħa tas-server minn kompitu fl-isfond li jiġi attivat kull 30 sekonda
(b’mod awtomatiku) u jevalwa l-espressjoni cron skont il-ħin lokali tas-server.

| Varjabbli                                   | Valur awtomatiku | Deskrizzjoni                                                                                                                             |
| ------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`          | Intervall ta’ attivazzjoni f’ms (minimu `5000`). Għandu jkun iqsar minn 60 s biex jaqa’ b’mod affidabbli fil-minuta cron korrispondenti. |

### Backup Attiv ta’ SQLite

Għal backup mingħajr waqfien tas-servizz ta’ DB attiva:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dan juża l-API tal-backup online ta’ SQLite — jista’ jitħaddem b’mod sikur waqt li OmniRoute jkun qed jaħdem.

---

## Irfinar tal-Prestazzjoni

### WAL Mode

WAL huwa attivat b'mod awtomatiku. Għal xogħol ta' kitba għolja, ikkunsidra:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ma jissettjax `journal_size_limit`. Punt ta 'kontroll iċċaqlaq frames WAL fil-fajl prinċipali, iżda l-fajl WAL iżomm l-akbar daqs allokat tiegħu. Il-gwardja `OMNIROUTE_WAL_GUARD_MAX_MB` biss iwissi u tmexxi `wal_checkpoint(RESTART)`; mhuwiex għatu tad-daqs tad-diska.

### Indiċijiet

Indiċi ewlenin għall-prestazzjoni (maħluqa awtomatikament minn migrazzjonijiet):

- Lookups tal-mudell `idx_models_provider` — mill-fornitur
- `idx_combo_targets_combo_id` — espansjoni tal-mira combo
- `idx_usage_history_api_key_timestamp` — usage analytics
- `idx_quota_snapshots_api_key_window` — quota tracking
- `idx_call_logs_timestamp` — call log queries

Biex iżżid indiċi ġdid, oħloq migrazzjoni:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Għal databases kbar ħafna (> 10GB), l-immappjar tal-memorja jista’ jiġi aġġustat permezz SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Kompattazzjoni

L-istanzi OmniRoute fit-tul jibbenefikaw minn `VACUUM` okkażjonali:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Mexxi kull xahar waqt twieqi ta' traffiku baxx. (Il-mod WAL inaqqas il-ħtieġa, iżda ma jeliminahx.)

---

## Kontroll tas-Saħħa

`src/lib/db/healthCheck.ts` jipprovdi **dijanjostika tas-saħħa fil-livell tad-DB**:

Iż-żewġ verbi jeħtieġu awtentikazzjoni (`401` inkella). `GET` iwettaq dijanjosi biss; `POST` iwettaq l-istess
kontroll b’`autoRepair` attivat.

```bash
GET  /api/db/health   # wettaq dijanjosi
POST /api/db/health   # wettaq dijanjosi + tiswija
```

Ir-rispons huwa d-`DbHealthCheckResult` prodott minn `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Il-baġits tad-dominji rreferew għal ċwievet API li m’għadhomx jeżistu.",
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

| Kamp              | Tifsira                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` meta `issues` tkun vojta. `driver` qatt ma jinfluwenzaha.                                                                                                     |
| `issues[].type`   | Wieħed minn `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                         |
| `repairedCount`   | Ringieli imsewwija matul din l-eżekuzzjoni; dejjem `0` meta `autoRepair` tkun falza.                                                                                 |
| `backupCreated`   | Jekk inħoloqx backup qabel it-tiswija.                                                                                                                               |
| `checkedAt`       | Timestamp ISO kondiviż mill-eżekuzzjoni u minn kwalunkwe nota ta’ tiswija li tikteb.                                                                                 |
| `driver.name`     | Id-driver ta’ SQLite li qed iservi d-database kkontrollata.                                                                                                          |
| `driver.degraded` | `true` meta l-kitbiet ma jkunux sostnuti b’mod persistenti mill-fajl tad-database — il-fallback WASM `sql.js` (persistenza tal-fajl kollu) jew database fil-memorja. |

L-istess payload jintbagħat lura mill-għodda MCP `omniroute_db_health_check`.

Ħaddem `PRAGMA integrity_check` biex tiskopri korruzzjoni:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Għandu jistampa: ok
```

Jekk jirritorna xi ħaġa oħra għajr `ok`, **ieqaf uża d-database immedjatament** u rrestawraha minn backup.

---

## Irkupru minn Diżastru

### Xenarju 1: Il-Fajl WAL Intilef

Il-fajl `-wal` huwa nieqes, iżda `-shm` u d-DB prinċipali għadhom intatti:

```bash
# Jirkupra awtomatikament mal-ftuħ li jmiss
omniroute
```

Jekk SQLite ma jkunx jista’ jirkupra awtomatikament:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Xenarju 2: Il-Fajl tad-DB Prinċipali Ġarrab Ħsara

Irrestawra mill-backup:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` iniżżel biss arkivju sħiħ `.tar.gz` minn server li jkun qed jaħdem
(`GET /api/db-backups/exportAll`, hija meħtieġa kredenzjali ta’ operatur); ma jirrestawra xejn.

### Xenarju 3: Iċ-Ċavetta tal-Kriptaġġ Intilfet

**L-ebda rkupru mhu possibbli** mingħajr iċ-ċavetta. Il-kampijiet kriptati ma jistgħux jinqraw. Erġa’ żid il-fornituri kollha manwalment bi kredenzjali ġodda.

> **Mitigazzjoni**: Dejjem agħmel backup separat taċ-ċavetta tal-kriptaġġ, idealment f’maniġer tal-passwords jew KMS.

### Xenarju 4: Id-Diska Mimlija

SQLite se jirritorna żbalji `SQLITE_FULL`. Illibera spazju fuq id-diska, imbagħad:

```bash
# Oħloq checkpoint tal-WAL biex tillibera l-ispazju
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operazzjonijiet Komuni

### Spezzjona Tabella

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Għodd ir-Ringieli fit-Tabelli Kollha

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Irrisettja (Ħassar) id-Data Kollha

```bash
# Waqqaf OmniRoute l-ewwel
omniroute stop

# Ħassar il-fajl tad-DB
rm ~/.omniroute/storage.sqlite*

# Erġa’ ibda (se terġa’ tinħoloq DB vojta)
omniroute
```

Għal risettjar **selettiv** (żomm il-fornituri, ħassar id-data tal-użu):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Esporta Tabella Waħda

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Soluzzjoni tal-Problemi

### "Il-bażi tad-data hija msakkra"

Proċess ieħor qed iżomm lock tal-kitba. Tista’:

- Tistenna li jintemm il-proċess l-ieħor (iċċekkja `lsof | grep storage.sqlite`)
- Twaqqaf bil-forza l-proċess l-ieħor
- Jekk il-problema tippersisti, erġa’ ibda OmniRoute

### "Il-limitazzjoni taċ-ċavetta barranija falliet"

Modulu tad-dominju qed jikser l-integrità referenzjali. Iċċekkja:

- Ringieli orfni fit-tabelli dipendenti
- Tħassir kaskata li ma ġiex propagat
- Migrazzjoni reċenti li bidlet ċavetta barranija

Ħaddem `PRAGMA foreign_key_check;` biex issib il-ksur.

### "M’hemmx biżżejjed memorja"

L-I/O immappjat fil-memorja ta’ SQLite qed jaqbeż il-limitu tal-OS. Naqqsu permezz ta’ pragma ta’ SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB minflok 256MB
```

Jew iddiżattivah:

```sql
PRAGMA mmap_size = 0;
```

### "Il-migrazzjoni falliet f’nofsha"

Il-migrazzjoni twettqet fi tranżazzjoni, għalhekk suppost treġġgħet lura. Jekk le:

1. **Waqqaf OmniRoute** (evita aktar tentattivi)
2. **Iċċekkja l-istat tad-DB** b’`sqlite3`
3. **Irranġa manwalment** il-migrazzjoni parzjali
4. **Erġa’ ħaddem** OmniRoute (il-migrazzjoni terġa’ tiġi ppruvata)

Biex tevita dan, dejjem ittestja l-migrazzjonijiet fuq kopja l-ewwel.

---

## Ara Wkoll

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelli tal-użu
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoraġġ tal-istat
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluss tar-rilaxx
- Sors: `src/lib/db/` (80+ fajl, ~25K linja ta’ kodiċi)
