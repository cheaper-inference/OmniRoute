# Database Schema & Operations Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **A Taƙaice**: OmniRoute yana amfani da **SQLite tare da rubutun mujallar WAL** a matsayin ma’ajiyar sa ta farko, tare da ɓoyewar **AES-256-GCM** don muhimman filaye yayin da bayanai suke ajiye. Wannan jagorar ta ƙunshi tsarin bayanai, ƙaura, ajiyar wucin-gadi/maido da bayanai, da littattafan gudanarwa.

**Madogara:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (teburori na asali 17)
- `src/lib/db/migrationRunner.ts` — ƙaura masu lambobin siga
- `src/lib/db/migrations/` — fayilolin SQL masu lambobin siga guda 167
- `src/lib/db/encryption.ts` — kayan taimako na ɓoyewa
- `src/lib/db/backup.ts` — fitarwa/shigo da ajiyar wucin-gadi
- `src/lib/db/healthCheck.ts` — binciken lafiyar tsarin

---

## Me Ya Sa Aka Zaɓi SQLite?

OmniRoute ya zaɓi SQLite maimakon PostgreSQL/MySQL saboda dalilai da dama:

| Abu                   | SQLite                                    | PostgreSQL                                            |
| --------------------- | ----------------------------------------- | ----------------------------------------------------- |
| **Turawa**            | A ciki yake — ba ya buƙatar sabar dabam   | Yana buƙatar saita sabar                              |
| **Ɓoyewa**            | A matakin manhaja (AES-256-GCM)           | TDE da aka gina a ciki                                |
| **Aiki**              | Ya fi sauri ga ƙananan/matsakaitan ayyuka | Ya fi dacewa da rubuce-rubuce masu yawa a lokaci guda |
| **Aiki tare**         | Yanayin WAL yana ba da damar karatu tare  | Cikakken MVCC                                         |
| **Ajiyar wucin-gadi** | Kwafin fayil guda ɗaya                    | `pg_dump` ko hoton tsarin fayiloli                    |
| **Yanayin amfani**    | Shigarwa ta kowane mai amfani, a ciki     | SaaS mai masu haya da yawa                            |

Ga turawa na **mai amfani guda, da tsari guda** (babban yanayin amfani da OmniRoute), SQLite ya fi sauƙi kuma ya fi sauri.

### Rubutun Mujallar WAL

`core.ts` yana buɗe ma’ajiyar bayanai da **yanayin WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL yana ba da damar **karatu a lokaci guda** yayin rubutu — wannan yana da muhimmanci ga allon kulawa, wanda yake yin tambayoyi yayin da ake yin rajistar buƙatu.

Tsohon girman cache shi ne **65,536 KiB (64 MiB)**. SQLite yana fassara ƙimar
`cache_size` mara kyau a matsayin kimanin iyakar sama a KiB, sannan yana ware shafuka gwargwadon buƙata.
**Saituna > Tsari da Ma’ajiya > Girman Cache** yana karɓar cikakkun lambobi daga **1 zuwa
1,000,000 KiB**; adana saitin yana aiwatar da shi ga haɗin ma’ajiyar bayanai mai aiki,
kuma OmniRoute yana dawo da ƙimar da aka adana yayin farawa.

---

## Wurin Ma’ajiyar Bayanai

Ana adana fayil ɗin SQLite a:

| OS      | Hanya                                                        |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (ana iya saita shi ta `DATA_DIR`) |

Fayilolin da ke tare da shi:

- `storage.sqlite-wal` — kundin rubutu na gaba
- `storage.sqlite-shm` — fayil ɗin ƙwaƙwalwar da aka raba
- `call_logs/` — kayan bayanan buƙata (idan an kunna)

**Sauya wurin:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Tsarin Gine-ginen Module na Domain

Rumbun bayanan OmniRoute yana da **module na TypeScript guda 110 na babban mataki** a cikin `src/lib/db/`. Kowane module na domain:

- Yana kula da takamaiman table guda ɗaya ko fiye
- Yana fitar da typed CRUD functions
- Ba ya taɓa tables na wani module
- Yana amfani da `getDbInstance()` daga `core.ts` don samun damar shiga DB

### Modules na DB Guda 110 na Babban Mataki

OmniRoute yana da **fayilolin TypeScript guda 110 na babban mataki** a cikin `src/lib/db/`. A ƙasa akwai wasu daga cikin muhimman modules; duba jerin directory don cikakken jeri:

| Module                  | Tables                                                         | Alhaki                                                                    |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Rijistar provider ta OAuth/API key da bayanan shaidar shiga               |
| `models.ts`             | `key_value` (bayanan model)                                    | Ma'anar models, ƙwarewa, da farashi                                       |
| `combos.ts`             | `combos`                                                       | Saitunan routing na combo da jerewa                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Tsarin rayuwar API key, scopes, da bin diddigin quota                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Saitin tsarin da ma'ajiyar KV ta gama-gari                                |
| `backup.ts`             | —                                                              | Ayyukan fitarwa/shigarwa na backup                                        |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Saitunan proxy da ƙa'idojin routing                                       |
| `prompts.ts`            | `prompt_templates`                                             | Templates na prompt masu sake amfani da versioning                        |
| `webhooks.ts`           | `webhooks`                                                     | Biyan kuɗin webhook bisa events da logs                                   |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit logging na kowace request (na zaɓi, mai yawa)                       |
| `domainState.ts`        | `domain_*` (tables 5)                                          | Kasafin domain, circuit breakers, lockouts, fallback chains, tarihin kuɗi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API keys da aka amince da su don MCP/A2A                                  |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Tarihin amfani da quota                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Haɗa models da tsoffin combos                                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | Persistent state na musamman ga CLI                                       |
| `encryption.ts`         | —                                                              | Helpers don ɓoye da buɗe fields                                           |
| `readCache.ts`          | —                                                              | Cache na cikin memory don ayyukan karantawa masu yawa                     |
| `secrets.ts`            | `key_value` (encrypted entries)                                | Ma'ajiyar secrets da aka ɓoye                                             |
| `stateReset.ts`         | —                                                              | Goge/sake saita state na DB don gwaji                                     |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Context na session don miƙa aiki tsakanin agents                          |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Bin diddigin amfani                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Saitin compression                                                        |

### Iyakokin Module

Wata muhimmiyar ƙa'idar gine-gine ita ce: **modules ba sa shiga tables na juna kai tsaye**. Don aiki da bayanan wani module, import function ɗin daga wannan module.

```ts
// ❌ BA DAI-DAI BA: SQL kai tsaye daga wani module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DAI-DAI NE: yi amfani da function na providers module
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ana tabbatar da bin wannan ƙa'ida ta hanyar bitar code — babu static check, amma ana nuna duk wani karya ta.

---

## Tsarin Asali (teburori 17)

`core.ts` yana ayyana teburorin asali guda 17 a cikin `SCHEMA_SQL`. Migration `001_initial_schema.sql` ne ke ƙirƙirar su, kuma su ne ginshiƙin schema.

### Muhimman Teburori (waɗanda aka ƙirƙira a migration na farko)

| Tebur                      | Manufa                                           | Muhimman ginshiƙai                                                      |
| -------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Bayanan shaidar masu samarwa (rufaffu)           | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Bayanan tura zirga-zirga na node ɗin mai samarwa | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ma'ajiyar KV ta gama-gari                        | `namespace`, `key`, `value`                                             |
| `combos`                   | Ma'anoni na haɗin hanyoyin turawa                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Maɓallan API na gateway                          | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata na ma'ajiyar bayanai                    | `key`, `value`                                                          |
| `usage_history`            | Bayanan tarihin amfani da buƙatu                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Abubuwan buƙatu da martani                       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Rajistan buƙatun proxy                           | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Jerin hanyoyin model-zuwa-mai-samarwa            | `model`, `chain`                                                        |
| `domain_budgets`           | Kasafin kashe kuɗi na kowane domain              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Tarihin sake saita kasafin kuɗi                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Bibiyar kuɗin kowane domain                      | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Halin iyakance ƙimar domain                      | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Halin circuit breaker na kowane domain           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache na martanin LLM                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Tarihin hotunan rabon amfani                     | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ƙarin Teburori (waɗanda migrations na baya suka ƙara)

Migrations na gaba suna ƙara teburori kamar haka:

- `cli_tool_state` (migration 011) — halin kayan aikin CLI
- Teburorin `mcp_*` — binciken uwar-garken MCP
- Teburorin `a2a_*` — halin aikin A2A
- Teburorin `usage_*` — bibiyar amfani
- Teburorin `plugin_*` — tsarin plugin
- `skill_executions` — tarihin aiwatar da ƙwarewa
- Teburorin `memory_*` — tsarin ƙwaƙwalwa
- Teburorin `compression_*` — tsarin matsawa
- Teburorin `webhook_*` — rajistan isar da webhook
- Teburorin `acp_*` — Agent Client Protocol
- Teburorin `oneproxy_*` — kasuwar 1proxy
- `proxy_assignments` — haɗa iyakar proxy
- `detailed_call_artifacts` — metadata na kayan rajistan kira
- `quota_alert_history` — binciken faɗakarwar rabon amfani
- `command_code_auth_sessions` — zaman OAuth na Command Code

Cikakken jerin teburori ~30+ yana cikin `src/lib/db/migrations/`.

---

## Hijira

OmniRoute yana amfani** sigar, ƙaura masu ƙarfi** a `src/lib/db/migrations/`. Kowane ƙaura fayil SQL ɗaya ne. Tsarin suna guda biyu suna tare; sigar da aka rubuta a `_omniroute_migrations` ita ce prefix na lamba.

### Hijira Suna

| Tsarin                                             | Misali                               | An yi amfani da shi don                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (daidai lambobi 3)           | `241_seen_models.sql`                | Tsohon jerin `001`–`241`. Daskararre lokacin da tsarin timestamp ya sauka (`240` da `241` sun haɗe daf da shi): babu sabon fayil ɗin da ke samun lambar jeri. |
| `YYYYMMDDHHMMSS_description.sql` (lambobi 14, UTC) | `20261113120000_add_usage_index.sql` | Kowane ƙaura da aka ƙirƙira daga 2026-11-13 akan.                                                                                                             |

Me yasa aka canza: tare da lambobi masu jere, layi ɗaya PRs ya zaɓi lamba ɗaya ta gaba kuma duk sai ɗaya dole ne a sake lamba kafin haɗawa. Tambarin lokaci na UTC yana ba kowane PR sigar sa.

Dokokin tsarin tambarin lokaci (wanda `npm run check:migration-numbering` ya tilasta , wanda aka raba tare da janareta a cikin `scripts/check/lib/migrationNaming.mjs`):

- Tambarin lokaci shine ainihin UTC kwanan wata da lokaci, bai wuce `20261113000000` ba kuma bai wuce mintuna 10 ba nan gaba.
- Bayanin shine ƙananan haruffan `snake_case` waɗanda ke farawa da harafi (`a-z`, `0-9`, `_` ɗaya tsakanin kalmomi), aƙalla haruffa 80.
- Fayiloli biyu masu tambarin lokaci iri ɗaya kwafi ne.
- Ka'idar rashin rata ta shafi tsohuwar jerin: kowace lamba daga `001` zuwa `241` dole ne ta kasance, sai dai sanann gibin `026`, `055` da `121`. Share `241` (ko kowane tsohon fayil) ya kasa gate. `001` da `241` ba za a taɓa ƙara su cikin jerin izinin `KNOWN_GAPS` ba. Fayilolin da aka yiwa alama ba su taɓa haifar da tazara ba.
- Kowane shigarwa a cikin `src/lib/db/migrations/` dole ne ya zama fayil na yau da kullun tare da ingantaccen sunan `.sql` ƙarami. A directory, symlink, fayil `.SQL` ko `.sql.bak`, boye fayil ko wani suna tare da sarari ya kasa gate gate, saboda mai gudu zai tsallake shi shiru ko ya fadi a boot.

**Aiwatar da oda.** Mai gudu yana tsara ta ƙimar lambobi na prefix, ba ta hanyar rubutu ba: tsoffin fayilolin `001`–`241` na farko, sannan fayilolin lokutan da aka buga a tsarin timestamp, sannan duk kundayen adireshi da aka yi rajista da `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (sifuna kamar `ee-001`). Hijira mai jiran gado shine kowane fayil wanda sigarsa baya cikin `_omniroute_migrations`, don haka ƙaura daga tsohon reshe wanda ke haɗuwa bayan sabon wanda har yanzu yana aiki akan bayanan da ake dasu.

**Tambarin lokaci shine tsarin halitta, ba tsari na hadewa ba.** Idan ƙauranku ya dogara da tebur ko ginshiƙi wanda ƙaura ya ƙirƙira tare da a** sabo** timestamp (misali, daya daga wani PR wanda ya fara hadewa), sabobin bayanan bayanai zai fara gudanar da naku kuma ya kasa. Yayin da PR ɗinku yana buɗewa, sake sabunta sunan fayil tare da `npm run db:new-migration` don samun sabon tambarin lokaci, ko mai da shi mai zaman kansa. `npm run test:migrations:fresh` yana amfani da kowane ƙaura zuwa rumbun adana bayanai mara komai kuma ya kama wannan.

### Ba a taɓa Sharewa ko Sake suna ba

Da zarar fayil ɗin ƙaura yana kan reshen saki ko `main`, ya riga ya gudana akan bayanan homolog da masu haɓakawa, akan shigarwar VPS da kuma cikin daidaitawar Kasuwanci. Daga nan:

- **Kar a taɓa share shi.** Sabbin shigarwa za su rasa tsarin sa yayin da ingantaccen bayanan bayanai ke kiyaye shi.
- **Kar a sake suna.** Sigar a cikin `_omniroute_migrations` ba za ta ƙara yin daidai da fayil ba, don haka duk bayanan da aka riga aka yi amfani da shi zai sake gudanar da shi. SQL mara ƙarfi sannan ya kwafi bayanai ko dakatar da boot ɗin.
- **Kuna buƙatar tsari daban?** Ƙirƙiri sabon ƙaura tare da `npm run db:new-migration`.

Sake suna yana da aminci ga fayil ɗin da ba a haɗa shi ba tukuna, wanda shine yanayin alamun ƙofar. Alamar saki ba ta canza kome ba a nan: kowane turawa zuwa reshen `release/v*` yana buga hoton Docker `:next` kuma yana aiki akan homolog, VPS installs da sync na Enterprise, don haka ƙaura ta haɗu ta gudana akan ainihin bayanan bayanai kafin kowane alamar `vX.Y.Z` ta wanzu. Ƙofar ta gaza kowane cire fayil ɗin tushe, mai alama ko a'a.

- **Mayar da ƙaura mai hade.** `git revert` mai goge fayil din ya kasa gate. Ajiye fayil ɗin kuma gyara tsarinsa a cikin sabon ƙaura: `npm run db:new-migration -- <description>`, tare da `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` da sauransu. Abubuwan haɓakawa da sabobin bayanan bayanai sannan su ƙare da tsari iri ɗaya.
- **Wanda aka sake suna: shigarwar dacewa da abun ciki iri ɗaya.** Idan fayil ɗin da aka haɗa dole ne ya motsa (misali, fayilolin da aka haɗa biyu suna raba tambarin lokaci kuma mai gudu ya tsaya tare da karon sigar), sake suna na baya ba tare da taɓa SQL ba kuma ƙara `{ fromVersion, fromName, toVersion, toName }` zuwa `RENAMED_MIGRATION_COMPATIBILITY` a cikin `src/lib/db/migrationRunner/constants.ts`. Ma'ajin bayanai da suka yi amfani da tsohuwar sigar suna samun motsin layin `_omniroute_migrations` nasu maimakon sake gudanar da fayil ɗin. Ƙofar tana yin kashedi game da irin wannan sake suna kuma koyaushe tana gudanar da rajistan commutation akansa, ko wane sabon tambarin lokaci: sabobin shigarwa yana amfani da fayil ɗin a sabon matsayinsa, ingantaccen bayanan bayanai ba sa, don haka ɗauki sabon tambarin lokaci kusa da tsohon. Ƙofar ta kasa sake suna idan abun ciki ya canza (canjin tsari har yanzu yana cikin sabon ƙaura), ko kuma idan fayil ɗin manufa na shigarwa baya kan faifai.
- **Kar a taɓa sake suna a cikin tambarin lokaci guda.** Sake suna wanda ke riƙe tambarin lokaci kuma yana canza bayanin kawai ya gaza gate ɗin, tare da ko ba tare da shigarwa ba. Tare da shigarwa wanda `toVersion` yayi daidai da `fromVersion`, mai gudu yana share tsohuwar jeren `_omniroute_migrations` kuma ya sake amfani da fayil ɗin akan kowane rumbun adana bayanai da ya riga ya sarrafa shi. Ba tare da shigarwa ba, mai gudu yana bin sigar kawai: yana tsallake fayil ɗin akan waɗancan ma'ajin bayanai (sabon abun ciki baya gudana a wurin) kuma yana yin rajistar kuskuren sake lamba akan kowane taya. Yi amfani da wani tambarin lokaci tare da shigarwar dacewa, ko kiyaye sunan.
- **Ƙofar ta duba cewa fayil ɗin da aka sake masa suna baya gudu.** Ga kowane sake suna da aka rufe, ƙofar ta wuce sabon sunan fayil zuwa rajistan canji tare da `--must-not-apply`. Chek ɗin yana ƙaddamar da bayanan da aka haɓaka tare da mai gudu na gaske, kuma idan mai gudu ya sake yin amfani da wannan fayil ɗin (misali, saboda shigarwar yana da sigar da ba daidai ba ko suna, ko kuma saboda fassarar rubutun gate ɗin ya karanta `constants.ts` daban da TypeScript), ƙofar ta kasa tare da `migration renomeada rodaria de novo` kuma tana tambayarka ka duba shigarwar tsoho da sababbin sigogin da sunayen.

### Abin da Ƙofar ke dubawa a kan Tushen

A kan buƙatun ja da kuma haɗa jerin gwano, `npm run check:migration-numbering` tana kwatanta `src/lib/db/migrations/` akan faifai tare da directory iri ɗaya akan reshen tushe. Tushen shine, a cikin wannan tsari: `--base-latest-tag`, `--base <ref>`, madaidaicin `MIGRATION_BASE_REF`, ko, lokacin da `GITHUB_EVENT_NAME` shine `pull_request`, `pull_request_target` ko `merge_group`, iyayen farko na haɗakarwa, `merge_group.base_sha` na abin da aka biya, ko `git merge-base HEAD origin/$GITHUB_BASE_REF`. A cikin buƙatun ja ko haɗa jerin gwano ba tare da wani tushe mai iya warwarewa ƙofar ta gaza. A wajen CI ba tare da `--base` ba yana buga `comparação com a base: pulada (sem --base)` kuma ya tsallake waɗannan ƙa'idodi.

`--base-latest-tag` ya kwatanta da sabuwar alamar saki (`vX.Y.Z` a cikin tsari na semver; suffixed tags kamar daren dare ba sa ƙidaya) wanda ke cikin tarihin `HEAD`, tare da ƙa'idodi iri ɗaya da `--base`. Saki-Green (`scripts/quality/validate-release-green.mjs`) yana gudanar da ƙofar ta wannan hanya, saboda turawa da shirye-shiryen gudu ba su da tushen buƙatun ja kuma haɗuwa na iya ƙasa ba tare da sabon gudu CI ba. Ba tare da alamar sakin ba a cikin tarihin ƙofar ta gaza; gudu `git fetch --tags` (a cikin CI, `actions/checkout` tare da `fetch-depth: 0` ya kawo tags).

| Canja akan buƙatar ja                                                                                            | Sakamako                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fayil ɗin da ke kan tushe an sake masa suna, tare da shigarwar `RENAMED_MIGRATION_COMPATIBILITY`                 | **Gargadi** idan abun ciki iri ɗaya ne, kuma duban motsi yana gudanar da kowane sabon tambarin lokaci; ya gaza idan sabon matsayi ya canza tsarin ƙarshe (gyara sake suna, ko zaɓi wani sabon tambarin lokaci inda yake tafiya) ko kuma idan mai gudu zai sake amfani da fayil ɗin da aka sake masa suna akan ingantaccen bayanai.** Ya kasa** idan abun ciki ya canza. |
| Fayil ɗin da ke kan tushe ana sake masa suna yana kiyaye tambarin sa (kawai bayanin yana canzawa)                | **Ya kasa** , tare da ko ba tare da shigarwa ba: mai gudu zai sake amfani da shi (tare da shigarwa) ko tsallake shi ta sigar (ba tare da ɗaya ba). Yi amfani da wani tambarin lokaci tare da shigarwar dacewa, ko kiyaye sunan.                                                                                                                                         |
| Ana share fayil ɗin da ke kan tushe, ko an sake masa suna ba tare da shigarwa ba                                 | **Ya kasa** , ko fayil ɗin yana cikin alamar saki ko a'a. Don soke shi, mayar da fayil ɗin tare da `git checkout <base> -- src/lib/db/migrations/<file>`; don mayar da tsarinsa, ƙara sabon ƙaura tare da `DROP ... IF EXISTS`.                                                                                                                                         |
| Fayil ɗin da ke kan tushe yana da abun ciki daban-daban                                                          | **Gargadi** (a `::warning` annotation a cikin GitHub Actions), kuma duban motsi yana gudana. Yana kasawa idan gyaran ya canza tsari na ƙarshe, saboda ingantaccen bayanan bayanai ba sa sake amfani da fayil ɗin da aka gyara: sanya canjin a cikin sabon ƙaura. Gyara mara lahani ( sharhi, `IF NOT EXISTS`) yayi gargaɗi kawai.                                       |
| Ana ƙara fayil ɗin rikodi tare da tambarin lokaci wanda bai fi sabon tushe ba                                    | Yana gudanar da binciken motsi, wanda aka kwatanta a ƙasa.                                                                                                                                                                                                                                                                                                              |
| Ana ƙara tsohuwar fayil ɗin `NNN_` mai lamba tare da lamba a ƙasan sabuwar fayil ɗin tsohuwar tsarin tushe       | **Ya kasa** , ko da an gyara `KNOWN_GAPS` a cikin buƙatun ja iri ɗaya: tsohuwar jerin an daskare, ƙirƙirar ƙaura tare da `npm run db:new-migration`. Fayilolin tsofaffin fayiloli sama da sabuwar tushe (buƙatun cire `release/v*` zuwa `main` ) ana karɓa.                                                                                                             |
| Fayil ɗin da ba a yi oda ba, gyara ko sake masa suna ya ƙunshi `INSERT`, `UPDATE`, `DELETE` ko `REPLACE` kalamai | **Gargadi** : cak ɗin commutation baya kwatanta bayanai, don haka duba ko tsarin da aka inganta da sabbin ma'ajin bayanai ya canza sakamakon.                                                                                                                                                                                                                           |

Gudun guda ɗaya na rajistan tafiye-tafiye ya ƙunshi bayanan da ba a yi oda ba, waɗanda aka gyara da fayilolin da aka sake suna tare.

Binciken commutation (`scripts/check/migration-commutation.ts`) yana gina rumbun adana bayanai na wucin gadi biyu tare da ainihin hanyar shigarwa: an** inganta** daya (boot tare da ƙaura na tushe, sannan sake yin boot akan wannan fayil ɗin tare da ƙaurawar buƙatar ja) da** sabo** daya (boot ɗaya tare da ƙaurawar buƙatar ja). Yana kwatanta makircin da aka samu: Tables da ginshiƙai (ba kula da odar shafi), UNIQUE / PRIMARY KEY da FOREIGN KEY ƙuntatawa, daidaitaccen rubutun `CREATE TABLE` na kowane tebur (wanda ke rufe iyakokin CHECK, tarawa, ginshiƙai da aka ƙirƙira da zaɓuɓɓukan tebur), fihirisa, jawowa da ra'ayoyi. Ba a kwatanta bayanan jere ba. Idan sun yi daidai, ƙofar ta buga cewa fayil ɗin ba shi da tsari amma yana tafiya, ya wuce. Idan sun bambanta, ƙofar ta kasa tare da bambanci da alamar shari'ar: don fayil ɗin da ba a ba da izini ba, sake sabunta sunansa tare da `npm run db:new-migration`, wanda yake da aminci saboda fayil ɗin ba a haɗa shi ba tukuna; don fayil ɗin tushe da aka gyara, mayar da abun ciki na tushe kuma sanya canji a cikin sabon ƙaura; don fayil ɗin da aka sake suna, soke sake suna ko ɗauki wani sabon tambarin lokaci inda yake tafiya, ba tare da wani suna ba. Idan cak ɗin kanta ba zai iya gudana ba, ƙofar ta kasa a CI kuma tana yin gargaɗi kawai a cikin gida. Don fayil ɗin tushe da aka gyara, an gina ma'aunin bayanan da aka haɓaka tare da abun ciki na tushe na wannan fayil ɗin, kuma taya na biyu ya tsallake shi saboda an riga an rubuta sigar sa. Don fayil ɗin da aka sake suna, an gina bayanan da aka inganta tare da fayil ɗin a ƙarƙashin tsohon sunansa, kuma taya na biyu yana motsa layin `_omniroute_migrations` ta hanyar shigarwar dacewa maimakon sake kunna shi; Ƙofar ta wuce sabon suna tare da `--must-not-apply`, don haka cak ɗin ya kasa idan boot na biyu ya yi amfani da shi. Idan gudun hijirar buƙatun ya kasa aiki akan hanyar da aka ɗaukaka, wato, bayan kowace ƙaura ta tushe (ko ita ma ta gaza akan sabon shigar da ita), ƙofar ta yi rahoton `migration do PR não aplica` kuma tana buƙatar ka gyara SQL daidai da tsarin tushen yanzu; idan fayil ɗin ya dogara da wani ƙaura na buƙatar ja tare da tambarin lokaci na gaba, sabunta sunansa tare da `npm run db:new-migration`.

Don gudanar da kwatance iri ɗaya a cikin gida, wuce tushe a sarari, misali `npm run check:migration-numbering -- --base origin/<base-branch>`, ko `npm run check:migration-numbering -- --base-latest-tag` don kwatanta da sabon saki.

### Mayar da Buɗe PR's `NNN` Hijira

Buƙatun ja da aka buɗe kafin sauyawa na iya har yanzu ɗaukar fayil na jeri kamar `242_add_widgets.sql`. Tsoffin lambobi sama da `241` an ƙi, don haka juya su kafin haɗawa:

1. **Sake suna fayil ɗin tare da janareta, kiyaye bayanin.** Gudu `npm run db:new-migration -- <same description>` don samun sabon suna, matsar da SQL a ciki, kuma share tsohon fayil ɗin `NNN_`. Dole ne bayanin ya kasance iri ɗaya: shigarwar dacewa a ƙasa yayi daidai da shi.
2. **Ƙara shigarwar dacewa idan bayanan bayanai na dindindin ya gudana tsohuwar lamba.** Idan kowane bayanan da aka adana (homolog, a VPS, shigarwar mai ba da gudummawa kansa) ya gudanar da ginin PR tare da fayil ɗin `NNN_`, ƙara `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` zuwa `RENAMED_MIGRATION_COMPATIBILITY` a cikin `src/lib/db/migrationRunner/constants.ts`. Wannan shine** ake buƙata don `237` zuwa `241`** : waɗannan ramummuka yanzu suna riƙe da canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` da `241_seen_models.sql`, kuma ba tare da shigarwa ba irin wannan rumbun adana bayanai ya tsallake ƙaura na canonical har abada kuma yana sake gudanar da wanda ya tuba. Hakanan yana aiki don ramin da ke zama babu komai, kamar `242`, lokacin da wurin zama tambarin lokaci. Lokacin da ake shakka, ƙara shigarwar. Inda kuka ƙara shi a cikin tsararru ba kome ba: lokacin da ramin maƙasudin shigarwa har yanzu yana riƙe da jere cewa wata shigarwa ta motsa (misali `237` yana riƙe da layin PR yayin da tsohuwar jeren `usage_history_calculated_cost` ke jira don matsawa cikin `237`), mai gudu yana barin shigarwar ta jira har sai ramin ya kasance kyauta. Rikici na gaske kawai, kamar ramin da aka riƙe ta jere babu motsin shigarwa, ko shigarwar guda biyu waɗanda ke musanya ramummuka, yana dakatar da taya tare da `Cannot reconcile ...`.
3. **Rike SQL idem mai ƙarfi** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), saboda ƙauran da aka canza zai iya haɗuwa da bayanan bayanai inda tsarinsa ya riga ya kasance.
4. **Matsar da lokuta na musamman masu maɓalli.** Idan PR ta ƙara ƙara don tsohuwar lambarsa a `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ko a cikin `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), canza maɓalli zuwa sabon tambarin lokaci.

`tests/unit/db/codex-fence-migration-rename.test.ts` misalin aiki ne na gwaji don ƙaura mai suna.

### Komawa zuwa Reshe Kafin Sauyawa

Kada a taɓa ɗauka ko mayar da fayil ɗin `YYYYMMDDHHMMSS_` baya zuwa reshe wanda ya riga ya canza (misali tsohuwar reshen `release/v*` ). Mai gudu a wurin yana tsara sunayen fayil azaman rubutu, don haka fayil ɗin da aka rubuta lokaci zai gudana tsakanin `201_` da `202_` akan sabon ma'ajin bayanai, kuma tsohuwar ƙofar da ke wurin ba ta fahimtar prefixes mai lamba 14. A kan irin wannan reshe, rubuta canjin azaman fayil ɗin `NNN_` na gaba na reshe, idempotent, don haka babu-op lokacin da sigar zamani ta zo daga baya.

### Yadda Hijira ke Gudu

A farawa, `migrationRunner.ts`:

1. Ƙirƙirar tebur `_omniroute_migrations` idan babu
2. Tambayoyi don ƙaura da aka riga aka yi
3. Ana aiwatar da kowane sabon ƙaura cikin tsari, kowanne a cikin ma'amala
4. Yi rikodin kowane ƙaura da aka yi amfani da shi tare da tambarin lokaci

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

### Rashin ƙarfi

Dole ne hijira ta kasance** mai iko** — gudanar da su sau biyu ya zama babu-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Yi amfani da `IF NOT EXISTS`, `IF EXISTS`, da `OR IGNORE` / `OR REPLACE` jumlar kyauta.

### Ƙara Sabuwar Hijira

1. **Ƙirƙiri fayil ɗin tare da janareta** : `npm run db:new-migration -- <description>` (misali `npm run db:new-migration -- add combo priority`). Yana rubuta `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` tare da lokacin UTC na yanzu da maɓallin sharhi, yana matsar gaba ɗaya daƙiƙa ɗaya idan an ɗauki wannan tambarin lokaci, kuma baya sake rubuta fayil ɗin. Kar a ɗauki lamba da hannu.
2. **Yi amfani da aminci DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Cika bayanai a hankali** : yi amfani da `UPDATE ... WHERE ...` don sarrafa layuka da ke akwai
4. **Duba oda da suna** : `npm run test:migrations:fresh` (duk ƙaura akan rumbun adana bayanai) da `npm run check:migration-numbering`
5. **Gwaji akan kwafi** : kar a taɓa gudanar da ƙaura marasa gwaji akan samarwa
6. **Teburin da aka ƙirƙira daga lambar yana buƙatar ƙaura kuma** : idan ma'auni kuma ya ƙirƙiri tebur a kasala (`CREATE TABLE IF NOT EXISTS`, kiyaye shi azaman hanyar warkar da kai), ƙaura dole ne ya haifar da shi da DDL iri ɗaya. In ba haka ba, shigarwa mai tsabta da ingantaccen shigarwa suna ƙare tare da tsare-tsare daban-daban, dangane da ko hanyar lambar ta gudana. `tests/unit/db/lazy-table-migration-guard.test.ts` yana duba `src/` da `open-sse/` kuma ya kasa a kan malalacin `CREATE` ba tare da hijira ba (#20557). Misali: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Misali:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Canje-canje na baya-mara jituwa** (misali, faduwa ginshiƙai) suna da wayo. OmniRoute yana goyan bayan NOT rage darajar — da zarar an yi ƙaura, canjin tsari na dindindin. Tsara yadda ya kamata.

---

## Ɓoyayyen Bayani Yayin Adanawa

Ana ɓoye muhimman fields (API keys, OAuth tokens, connection strings) yayin adanawa ta amfani da **AES-256-GCM**.

### Yadda Yake Aiki

```ts
// src/lib/db/encryption.ts (an sauƙaƙa)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Inda Ake Amfani da Shi

- `provider_connections.api_key` — ana ɓoye shi a matakin manhaja
- `provider_connections.access_token`, `refresh_token`, `id_token` — ana ɓoye su a matakin manhaja
- Bayanai na `key_value` masu `namespace = "secrets"` — ana ɓoye su a matakin manhaja
- `proxy_registry.auth` — ana ɓoye shi a matakin manhaja (idan yana nan)

### Maɓallin Ɓoye Bayani

Ana samar da maɓallin ɓoye bayanin daga **passphrase** (wanda ake saita ta env var ɗin `STORAGE_ENCRYPTION_KEY`) da kuma **salt** (wanda ake adanawa a cikin DB). Ana buƙatar dukansu biyu don warware ɓoyayyun bayanai.

```bash
# Samar da passphrase mai aminci
openssl rand -hex 32

# Saita a cikin .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Muhimmi ƙwarai**: Rasa maɓallin ɓoye bayanai yana nufin rasa damar shiga dukkan bayanan da aka ɓoye. **Yi ajiyar maɓallin dabam da database**.

### Abubuwan da BA A Ɓoye Ba

Saboda dalilan ingantaccen aiki, ana adana abubuwa masu zuwa a matsayin plaintext:

- Sunayen nuni na providers
- Ma’anonin models (sun riga sun zama na jama’a)
- Ka’idojin routing
- Bayanan amfani (babu PII)

---

## Muhimman Bayanan Ɓoye Bayanai (v3.8.16+)

OmniRoute yana amfani da **`migrateLegacyEncryptedString()`** don sarrafa tsare-tsaren ɓoye bayanai guda biyu ba tare da mai amfani ya lura ba:

- **Na tsohon tsari** (kafin v3.5.0): "ɓoye bayanai" mai amfani da XOR (ba ainihin tsarin tsaro na cryptography ba)
- **Na yanzu**: AES-256-GCM tare da ingantaccen IV da alamar tabbatarwa

Mataimakin ƙaura yana gano tsarin tsohon tsari sannan ya sake ɓoye bayanan da sabon tsari a karantawa ta farko. Wannan yana nufin za ka iya ɗaukaka tsohon rumbun bayanai ba tare da rasa bayanan shaidarka ba.

---

## Ma'ajiyar Karantawa

Don bayanan da ake yawan karantawa (samfura, masu samarwa, saituna), `readCache.ts` yana samar da **ma'ajiyar cikin ƙwaƙwalwa**:

```ts
// Ana adanawa a ma'ajiya lokacin farawa, kuma ana soke ta lokacin rubutawa
const providers = await getCachedProviders(); // Mai sauri, yana cikin ƙwaƙwalwa
const fresh = await listProviders(); // Mai jinkiri, yana tuntuɓar DB
```

| Abin da aka adana      | Maɓallin ma'ajiya | TTL                  |
| ---------------------- | ----------------- | -------------------- |
| `models`               | `models:v1`       | Har sai an yi rubutu |
| `provider_connections` | `providers:v1`    | Har sai an yi rubutu |
| `settings`             | `settings:v1`     | Har sai an yi rubutu |
| `combos`               | `combos:v1`       | Har sai an yi rubutu |

Ana soke ma'ajiyar a duk lokacin da aka yi rubutu zuwa jadawalin da ya dace da ita.

---

## Ajiyar Kwafi da Farfaɗowa

### Ajiyar Kwafi da Hannu

```bash
# Yi amfani da CLI don ƙirƙirar ajiyar kwafi ta gida
omniroute backup create --name pre-migration

# Ko ta API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fayil ɗin ajiyar kwafin ya ƙunshi:

- Duk jadawalan DB (an mayar da su zuwa JSON)
- Abubuwan tarihin kira (an yi musu base64 encoding, na zaɓi)
- Saituna + sirrika (a ɓoye)
- Tsarin plugin

### Maidowa

```bash
# Ta CLI
omniroute restore pre-migration

# Ta API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Gargaɗi**: Maidowa yana maye gurbin DB gaba ɗaya. Da farko, dakatar da duk abokan hulɗa.

### Ajiyar Kwafi ta Atomatik

```bash
# Kunna ajiyar kwafi ta atomatik ta kowace rana ta CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ana aiwatar da jadawalin a ɓangaren uwar garken ta hanyar aikin bayan-fage wanda ke aiki kowane sakan 30
(na asali) kuma yana tantance furucin cron bisa lokacin gida na uwar garken.

| Canji                                       | Na asali | Bayani                                                                                                              |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Tazarar aiki a ms (mafi ƙaranci `5000`). Dole ne ya kasance ƙasa da sakan 60 don dacewa da mintin cron abin dogaro. |

### Ajiyar Kwafin SQLite Kai Tsaye

Don yin ajiyar kwafin DB mai aiki ba tare da dakatar da sabis ba:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Wannan yana amfani da API na ajiyar kwafi ta kan layi na SQLite — babu matsala a gudanar da shi yayin da OmniRoute ke aiki.

---

## Tuning Performance

### WAL Mode

WAL yana kunna ta tsohuwa. Don manyan ayyuka na rubutu, la'akari:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute baya saita `journal_size_limit`. Wurin bincike yana motsa firam ɗin WAL zuwa babban fayil, amma fayil ɗin WAL yana riƙe girman girman sa. Mai gadin `OMNIROUTE_WAL_GUARD_MAX_MB` yayi kashedi da gudu `wal_checkpoint(RESTART)`; ba hular girman faifai ba ce.

### Fihirisa

Maɓallin maɓalli don yin aiki ( ƙaura ta ƙirƙira ta atomatik):

- `idx_models_provider` — samfurin duba ta mai bayarwa
- `idx_combo_targets_combo_id` — combo manufa fadada
- `idx_usage_history_api_key_timestamp` — amfani analytics
- `idx_quota_snapshots_api_key_window` — kwatance tracking
- `idx_call_logs_timestamp` — kira log queries

Don ƙara sabon fihirisar, ƙirƙiri ƙaura:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Ƙwaƙwalwar taswira I/O

Don manyan bayanai (> 10GB), ana iya daidaita taswirar ƙwaƙwalwar ajiya ta hanyar SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Ƙarfafawa

Misalin OmniRoute masu tsayi suna amfana daga `VACUUM` lokaci-lokaci:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Gudu kowane wata a lokacin taga masu ƙarancin zirga-zirga. (Yanayin WAL yana rage buƙata, amma baya kawar da shi.)

---

## Duba Lafiya

`src/lib/db/healthCheck.ts` yana samar da **binciken lafiyar DB**:

Dukkan verbs ɗin suna buƙatar authentication (`401` idan babu). `GET` yana yin bincike kawai; `POST` yana gudanar da
binciken iri ɗaya tare da kunna `autoRepair`.

```bash
GET  /api/db/health   # yi bincike
POST /api/db/health   # yi bincike + gyara
```

Amsar ita ce `DbHealthCheckResult` da `runDbHealthCheck()` ya samar
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Kasafin domain sun yi nuni ga API keys waɗanda babu su kuma.",
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

| Fili              | Ma’ana                                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` ne idan `issues` babu komai a ciki. `driver` ba ya taɓa yin tasiri a kansa.                                                                                                  |
| `issues[].type`   | Ɗaya daga cikin `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                    |
| `repairedCount`   | Layukan da aka gyara yayin wannan gudanarwar; koyaushe `0` ne idan `autoRepair` false ne.                                                                                           |
| `backupCreated`   | Ko an ɗauki backup kafin gyarawa.                                                                                                                                                   |
| `checkedAt`       | ISO timestamp da gudanarwar da duk wani bayanin gyara da ta rubuta suke amfani da shi tare.                                                                                         |
| `driver.name`     | SQLite driver da ke hidimar ma’ajiyar bayanan da aka bincika.                                                                                                                       |
| `driver.degraded` | `true` ne idan rubuce-rubuce ba su da tabbataccen kariya daga fayil ɗin ma’ajiyar bayanai — `sql.js` WASM fallback (adana gabaɗayan fayil) ko ma’ajiyar bayanai ta cikin ƙwaƙwalwa. |

Kayan aikin MCP na `omniroute_db_health_check` ma yana dawo da wannan payload ɗin.

Gudanar da `PRAGMA integrity_check` don gano lalacewa:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ya kamata ya buga: ok
```

Idan ya dawo da wani abu ban da `ok`, **dakatar da amfani da ma’ajiyar bayanan nan take** sannan a dawo da ita daga backup.

---

## Farfadowa Daga Bala’i

### Yanayi na 1: Fayil ɗin WAL Ya Ɓace

Fayil ɗin `-wal` ya ɓace amma `-shm` da babban DB suna nan yadda suke:

```bash
# Yana farfadowa ta atomatik a buɗewa ta gaba
omniroute
```

Idan SQLite ba zai iya farfadowa ta atomatik ba:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Yanayi na 2: Babban Fayil ɗin DB Ya Lalace

Mayar daga madadin ajiya:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` yana sauke cikakken rumbun `.tar.gz` ne kawai daga sabar da ke aiki
(`GET /api/db-backups/exportAll`, ana buƙatar shaidar mai gudanarwa); ba ya mayar da komai.

### Yanayi na 3: An Rasa Maɓallin Ɓoyewa

**Ba za a iya farfadowa ba** ba tare da maɓallin ba. Ba za a iya karanta filayen da aka ɓoye ba. Sake ƙara duk masu samarwa da hannu tare da sabbin bayanan shaida.

> **Matakin kariya**: Koyaushe ajiye madadin maɓallin ɓoyewa daban, zai fi kyau a cikin manajan kalmomin sirri ko KMS.

### Yanayi na 4: Faifai Ya Cika

SQLite zai mayar da kurakuran `SQLITE_FULL`. Samar da sarari a faifai, sannan:

```bash
# Yi checkpoint na WAL don samar da sarari
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Ayyukan da Aka Saba Yi

### Duba Tebur

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Ƙirga Layuka a Duk Teburori

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Sake Saiti (Goge) Duk Bayanai

```bash
# Da farko dakatar da OmniRoute
omniroute stop

# Goge fayil ɗin DB
rm ~/.omniroute/storage.sqlite*

# Sake farawa (zai sake ƙirƙirar DB mara komai)
omniroute
```

Don sake saiti na **zaɓi** (a bar masu samarwa, a goge bayanan amfani):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Fitar da Tebur Guda

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Warware Matsaloli

### "An kulle rumbun bayanai"

Wani tsari yana riƙe da makullin rubutu. Yi ɗaya daga cikin waɗannan:

- Jira ɗayan tsarin ya gama (duba `lsof | grep storage.sqlite`)
- Kashe ɗayan tsarin
- Idan matsalar ta ci gaba, sake kunna OmniRoute

### "Ƙa'idar maɓallin waje ta gaza"

Wani tsarin yanki yana karya daidaiton alaƙa. Duba:

- Layuka marasa alaƙa a cikin teburori masu dogaro
- Gogewar cascading da ba ta yaɗu ba
- Ƙaura ta kwanan nan da ta canza maɓallin waje

Gudanar da `PRAGMA foreign_key_check;` don gano keta ƙa'idodi.

### "Ƙwaƙwalwa ta ƙare"

I/O na SQLite da aka danganta da ƙwaƙwalwa yana wuce iyakar OS. Rage shi ta amfani da pragma na SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB maimakon 256MB
```

Ko a kashe shi:

```sql
PRAGMA mmap_size = 0;
```

### "Ƙaura ta gaza a tsakiyar aiki"

An gudanar da ƙaurar a cikin transaction, don haka ya kamata a ce an mayar da ita baya. Idan ba haka ba:

1. **Dakatar da OmniRoute** (don hana ƙarin yunƙuri)
2. **Duba yanayin DB** ta amfani da `sqlite3`
3. **Gyara da hannu** ɓangaren ƙaurar da aka yi
4. **Sake gudanar da** OmniRoute (za a sake gwada ƙaurar)

Don hana wannan, koyaushe fara gwada ƙaura a kan kwafi.

---

## Duba Kuma

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — teburorin amfani
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — sa ido kan lafiyar tsarin
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — tsarin fitarwa
- Tushe: `src/lib/db/` (fayiloli 80+, ~25K LOC)
