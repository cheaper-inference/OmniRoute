# Database Schema & Operations Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kwa ufupi**: OmniRoute hutumia **SQLite yenye uandishi wa kumbukumbu wa WAL** kama hifadhi yake msingi, pamoja na usimbaji fiche wa **AES-256-GCM** kwa data nyeti iliyohifadhiwa. Mwongozo huu unashughulikia skima, uhamishaji, kuhifadhi nakala/kurejesha, na miongozo ya kiutendaji.

**Vyanzo:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (majendwali 17 ya msingi)
- `src/lib/db/migrationRunner.ts` — uhamishaji wenye matoleo
- `src/lib/db/migrations/` — faili 167 za SQL zenye matoleo
- `src/lib/db/encryption.ts` — visaidizi vya usimbaji fiche
- `src/lib/db/backup.ts` — uhamishaji wa nakala rudufu kuingia/kutoka
- `src/lib/db/healthCheck.ts` — uchunguzi wa afya

---

## Kwa Nini SQLite?

OmniRoute ilichagua SQLite badala ya PostgreSQL/MySQL kwa sababu kadhaa:

| Kipengele          | SQLite                                       | PostgreSQL                                     |
| ------------------ | -------------------------------------------- | ---------------------------------------------- |
| **Usambazaji**     | Imepachikwa — hakuna seva tofauti            | Inahitaji usanidi wa seva                      |
| **Usimbaji fiche** | Safu ya programu (AES-256-GCM)               | TDE iliyojengewa ndani                         |
| **Utendaji**       | Haraka zaidi kwa mizigo midogo/ya kati       | Bora zaidi kwa uandishi mkubwa wa wakati mmoja |
| **Ushindani**      | Hali ya WAL huruhusu usomaji wa wakati mmoja | MVCC kamili                                    |
| **Nakala rudufu**  | Kunakili faili moja                          | `pg_dump` au taswira ya mfumo wa faili         |
| **Matumizi**       | Usakinishaji kwa kila mtumiaji, imepachikwa  | SaaS yenye wapangaji wengi                     |

Kwa usambazaji wa **mtumiaji mmoja, instansi moja** (matumizi makuu ya OmniRoute), SQLite ni rahisi na ya haraka zaidi.

### Uandishi wa Kumbukumbu wa WAL

`core.ts` hufungua hifadhidata kwa **hali ya WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL huruhusu **usomaji wa wakati mmoja** wakati wa uandishi — jambo muhimu kwa dashibodi, ambayo huendesha hoja wakati maombi yanarekodiwa.

Ukubwa chaguo-msingi wa akiba ni **65,536 KiB (64 MiB)**. SQLite hufasiri thamani hasi ya
`cache_size` kama kikomo cha juu cha kukadiria katika KiB na hugawa kurasa inapohitajika.
**Settings > System & Storage > Cache Size** hukubali thamani kamili kuanzia **1 hadi
1,000,000 KiB**; kuhifadhi mpangilio huo huutekeleza kwenye muunganisho unaotumika wa hifadhidata,
na OmniRoute hurejesha thamani iliyohifadhiwa wakati wa kuanza.

---

## Eneo la Hifadhidata

Faili ya SQLite huhifadhiwa katika:

| Mfumo wa Uendeshaji | Njia                                                               |
| ------------------- | ------------------------------------------------------------------ |
| Linux               | `~/.omniroute/storage.sqlite`                                      |
| macOS               | `~/.omniroute/storage.sqlite`                                      |
| Windows             | `%USERPROFILE%\.omniroute\storage.sqlite`                          |
| Docker              | `/app/data/storage.sqlite` (inaweza kusanidiwa kupitia `DATA_DIR`) |

Faili zinazoandamana nayo:

- `storage.sqlite-wal` — kumbukumbu ya uandishi wa mapema
- `storage.sqlite-shm` — faili ya kumbukumbu iliyoshirikiwa
- `call_logs/` — mabaki ya data ya maombi (ikiwa imewezeshwa)

**Badilisha eneo:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Usanifu wa Moduli za Kikoa

Hifadhidata ya OmniRoute ina **moduli 110 za kiwango cha juu za TypeScript** katika `src/lib/db/`. Kila moduli ya kikoa:

- Inamiliki jedwali moja au zaidi mahususi
- Inasafirisha vitendaji vya CRUD vyenye aina zilizobainishwa
- Haifikii kamwe majedwali ya moduli nyingine
- Inatumia `getDbInstance()` kutoka `core.ts` kufikia hifadhidata

### Moduli 110 za Kiwango cha Juu za Hifadhidata

OmniRoute ina **faili 110 za kiwango cha juu za TypeScript** katika `src/lib/db/`. Hapa chini kuna sampuli ya moduli za msingi; tazama orodha ya saraka kwa orodha kamili:

| Moduli                  | Majedwali                                                      | Jukumu                                                                             |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Usajili na vitambulisho vya watoa huduma kwa OAuth/ufunguo wa API                  |
| `models.ts`             | `key_value` (data ya modeli)                                   | Ufafanuzi wa modeli, uwezo na bei                                                  |
| `combos.ts`             | `combos`                                                       | Mipangilio na upangaji wa uelekezaji wa michanganyiko                              |
| `apiKeys.ts`            | `api_keys`                                                     | Mzunguko wa maisha wa funguo za API, mawanda na ufuatiliaji wa mgao                |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Usanidi wa mfumo na hifadhi ya KV inayoshirikiwa                                   |
| `backup.ts`             | —                                                              | Operesheni za kuhamisha/kuingiza nakala rudufu                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Mipangilio ya proksi na kanuni za uelekezaji                                       |
| `prompts.ts`            | `prompt_templates`                                             | Violezo vya maelekezo vinavyoweza kutumika tena na usimamizi wa matoleo            |
| `webhooks.ts`           | `webhooks`                                                     | Usajili na kumbukumbu za webhook zinazoendeshwa na matukio                         |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Uwekaji kumbukumbu za ukaguzi kwa kila ombi (si lazima, ujazo mkubwa)              |
| `domainState.ts`        | `domain_*` (majedwali 5)                                       | Bajeti za vikoa, vivunja saketi, vizuizi, minyororo mbadala na historia ya gharama |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Funguo za API zilizoidhinishwa kwa MCP/A2A                                         |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historia ya matumizi ya mgao                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Kuunganisha modeli na michanganyiko chaguomsingi                                   |
| `cliToolState.ts`       | `cli_tool_state`                                               | Hali endelevu mahususi ya CLI                                                      |
| `encryption.ts`         | —                                                              | Visaidizi vya kusimba/kusimbua sehemu                                              |
| `readCache.ts`          | —                                                              | Akiba ya kumbukumbu kwa operesheni zenye usomaji mwingi                            |
| `secrets.ts`            | `key_value` (maingizo yaliyosimbwa)                            | Hifadhi ya siri iliyosimbwa                                                        |
| `stateReset.ts`         | —                                                              | Kufuta/kuweka upya hali ya hifadhidata kwa ajili ya majaribio                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Muktadha wa kipindi kwa ajili ya kukabidhi kazi kwa wakala mwingine                |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Ufuatiliaji wa matumizi                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Usanidi wa mfinyazo                                                                |

### Mipaka ya Moduli

Kanuni kuu ya usanifu: **moduli hazifikii majedwali ya moduli nyingine moja kwa moja**. Ili kufanya kazi na data ya moduli nyingine, leta kitendaji kutoka kwenye moduli hiyo.

```ts
// ❌ SI SAHIHI: SQL ya moja kwa moja kutoka moduli nyingine
db.prepare("SELECT * FROM provider_connections").all();

// ✅ SAHIHI: tumia kitendaji cha moduli ya providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Kanuni hii inatekelezwa kupitia ukaguzi wa msimbo — hakuna ukaguzi tuli, lakini ukiukaji huwekewa alama.

---

## Skema ya Msingi (majedauli 17)

`core.ts` hufafanua majedwali 17 ya msingi katika `SCHEMA_SQL`. Majedwali haya huundwa na uhamishaji `001_initial_schema.sql` na yanaunda skema kuu.

### Majedwali ya Msingi (yaliyoundwa katika uhamishaji wa awali)

| Jedwali                    | Madhumuni                                    | Safu muhimu                                                             |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Vitambulisho vya mtoa huduma (vilivyosimbwa) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Taarifa za uelekezaji za nodi za mtoa huduma | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Hifadhi ya jumla ya KV                       | `namespace`, `key`, `value`                                             |
| `combos`                   | Ufafanuzi wa michanganyiko ya uelekezaji     | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Funguo za API za lango                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata ya hifadhidata                      | `key`, `value`                                                          |
| `usage_history`            | Rekodi za matumizi ya maombi                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Data za maombi na majibu                     | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Kumbukumbu za maombi ya proksi               | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Minyororo ya modeli kwenda kwa mtoa huduma   | `model`, `chain`                                                        |
| `domain_budgets`           | Bajeti za matumizi kwa kila kikoa            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historia ya uwekaji upya wa bajeti           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Ufuatiliaji wa gharama kwa kila kikoa        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Hali ya kikomo cha kasi cha kikoa            | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Hali ya kivunja saketi kwa kila kikoa        | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Kache ya majibu ya LLM                       | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Picha za kihistoria za mgao                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Majedwali ya Ziada (yaliyoongezwa na uhamishaji wa baadaye)

Uhamishaji uliofuata huongeza majedwali kama vile:

- `cli_tool_state` (uhamishaji 011) — hali ya zana ya CLI
- Majedwali ya `mcp_*` — ukaguzi wa seva ya MCP
- Majedwali ya `a2a_*` — hali ya jukumu la A2A
- Majedwali ya `usage_*` — ufuatiliaji wa matumizi
- Majedwali ya `plugin_*` — mfumo wa programu-jalizi
- `skill_executions` — historia ya utekelezaji wa ujuzi
- Majedwali ya `memory_*` — mfumo wa kumbukumbu
- Majedwali ya `compression_*` — mfumo wa mgandamizo
- Majedwali ya `webhook_*` — kumbukumbu ya uwasilishaji wa webhook
- Majedwali ya `acp_*` — Itifaki ya Mteja wa Ajenti
- Majedwali ya `oneproxy_*` — soko la 1proxy
- `proxy_assignments` — miunganisho ya wigo wa proksi
- `detailed_call_artifacts` — metadata ya vizalia vya kumbukumbu za simu
- `quota_alert_history` — ukaguzi wa tahadhari za mgao
- `command_code_auth_sessions` — vipindi vya OAuth vya Command Code

Orodha kamili ya majedwali ~30+ ipo katika `src/lib/db/migrations/`.

---

## Uhamiaji

OmniRoute hutumia** matoleo, uhamiaji wasio na uwezo** katika `src/lib/db/migrations/`. Kila uhamiaji ni faili moja SQL. Maumbizo mawili ya majina yanashirikiana; toleo lililorekodiwa katika `_omniroute_migrations` ni kiambishi awali cha nambari.

### Jina la Uhamiaji

| Umbizo                                              | Mfano                                | Inatumika kwa                                                                                                                                                                          |
| --------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (tarakimu 3 kabisa)           | `241_seen_models.sql`                | Mfululizo wa zamani `001`-`241`. Iliyogandishwa wakati umbizo la muhuri wa muda lilipotua (`240` na `241` ziliunganishwa kabla yake): hakuna faili mpya inayopata nambari ya mfuatano. |
| `YYYYMMDDHHMMSS_description.sql` (tarakimu 14, UTC) | `20261113120000_add_usage_index.sql` | Kila uhamaji ulioundwa kuanzia 2026-11-13 na kuendelea.                                                                                                                                |

Kwa nini mabadiliko: kwa nambari zinazofuatana, PRs sambamba ilichukua nambari ifuatayo na zote isipokuwa moja ilibidi zibadilishe nambari kabla ya kuunganishwa. Muhuri wa muda wa UTC huipa kila PR toleo lake.

Sheria za umbizo la muhuri wa muda (zinazotekelezwa na `npm run check:migration-numbering`, iliyoshirikiwa na jenereta katika `scripts/check/lib/migrationNaming.mjs`):

- Muhuri wa wakati ni tarehe na wakati halisi UTC, sio mapema kuliko `20261113000000` na sio zaidi ya dakika 10 katika siku zijazo.
- Maelezo ni herufi ndogo `snake_case` inayoanza na herufi (`a-z`, `0-9`, `_` moja kati ya maneno), isiyozidi herufi 80.
- Faili mbili zilizo na muhuri wa muda sawa ni nakala.
- Sheria ya kutokuwa na pengo inatumika tu kwa mfululizo wa zamani: kila nambari kutoka `001` hadi `241` lazima iwepo, isipokuwa mapengo yanayojulikana `026`, `055` na `121`. Kufuta `241` (au faili yoyote ya zamani) kunashindwa lango. `001` na `241` kamwe haziwezi kuongezwa kwenye orodha ya ruhusa `KNOWN_GAPS`. Faili zilizowekwa alama za nyakati hazileti pengo.
- Kila ingizo katika `src/lib/db/migrations/` lazima liwe faili la kawaida lenye herufi ndogo ndogo jina `.sql`. Saraka, ulinganifu, faili ya `.SQL` au `.sql.bak`, faili iliyofichwa au jina lililo na nafasi hushindwa lango, kwa sababu mkimbiaji angeiruka kimya au kuanguka kwenye buti.

**Omba agizo.** Kiendeshaji hupanga kulingana na thamani ya nambari ya kiambishi awali, si kwa maandishi: faili za zamani za `001`-`241` kwanza, kisha faili zilizowekwa muhuri wa muda kwa mpangilio wa muhuri wa muda, kisha saraka zozote zilizowekwa nafasi kwa majina zilizosajiliwa na `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (matoleo kama vile `ee-001`). Uhamisho unaosubiri ni faili yoyote ambayo toleo lake haliko `_omniroute_migrations`, kwa hivyo uhamishaji kutoka tawi la zamani ambalo huunganishwa baada ya jipya zaidi bado linatumika kwenye hifadhidata zilizopo.

**Muhuri wa wakati ni agizo la uundaji, sio agizo la kuunganisha.** Ikiwa uhamaji wako unategemea jedwali au safu wima iliyoundwa na uhamiaji na a** mpya zaidi** timestamp (kwa mfano, moja kutoka PR nyingine iliyounganishwa kwanza), hifadhidata mpya ingeendesha yako kwanza na ikashindikana. Wakati PR yako bado imefunguliwa, tengeneza upya jina la faili na `npm run db:new-migration` ili ipate muhuri mpya wa muda, au uifanye kuwa huru. `npm run test:migrations:fresh` inatumika kila uhamiaji kwenye hifadhidata tupu na inashika hii.

### Uhamiaji Uliounganishwa Haujafutwa Kamwe au Kubadilishwa Jina

Mara faili ya uhamishaji inapokuwa kwenye tawi la toleo au `main`, tayari inaendeshwa kwenye hifadhidata ya homolog na wasanidi, kwenye usakinishaji wa VPS na katika usawazishaji wa Biashara. Kuanzia hapo na kuendelea:

- **Usiwahi kuifuta.** Sakinisho mpya zinaweza kupoteza mpangilio wake huku hifadhidata zilizoboreshwa zikiihifadhi.
- **Usiipe jina tena.** Toleo katika `_omniroute_migrations` halingelingana tena na faili, kwa hivyo kila hifadhidata ambayo tayari imeitumia ingeiendesha tena. SQL isiyo na uwezo kisha inarudia data au inasimamisha kuwasha.
- **Je, unahitaji schema tofauti?** Unda uhamiaji mpya ukitumia `npm run db:new-migration`.

Kubadilisha jina ni salama tu kwa faili ambayo haijaunganishwa, ambayo ni kesi ambayo vidokezo vya lango hurejelea. Lebo ya toleo haibadilishi chochote hapa: kila kisukuku kwenye tawi la `release/v*` huchapisha picha ya Docker `:next` na huendeshwa kwenye homolog, usakinishaji wa VPS na usawazishaji wa Enterprise, kwa hivyo uhamishaji uliounganishwa umeendeshwa kwenye hifadhidata halisi kabla ya lebo yoyote `vX.Y.Z` kuwepo. Lango linashindwa kila kuondolewa kwa faili ya msingi, iliyowekwa alama au la.

- **Inarejesha uhamiaji uliounganishwa.** `git revert` inayofuta faili inashindwa lango. Weka faili na utendue schema yake katika uhamiaji mpya: `npm run db:new-migration -- <description>`, na `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` na kadhalika. Hifadhidata zilizoboreshwa na mpya kisha malizike na schema ile ile.
- **Ile inayokubalika ibadilishe jina: ingizo la uoanifu na maudhui yanayofanana.** Ikiwa faili iliyounganishwa lazima isogezwe (kwa mfano, faili mbili zilizounganishwa hushiriki muhuri wa muda na kiendeshaji kitaacha kwa mgongano wa toleo), ipe jina jipya la baadaye bila kugusa SQL yake na uongeze `{ fromVersion, fromName, toVersion, toName }` kwa `RENAMED_MIGRATION_COMPATIBILITY` katika `src/lib/db/migrationRunner/constants.ts`. Hifadhidata zilizotumia toleo la zamani husogeza safu mlalo `_omniroute_migrations` badala ya kuendesha faili tena. Lango linaonya juu ya kubadilisha jina kama hilo na kila wakati huendesha ukaguzi juu yake, bila kujali muhuri mpya wa wakati: usakinishaji mpya hutumia faili katika nafasi yake mpya, hifadhidata iliyoboreshwa haifanyi hivyo, kwa hivyo chagua muhuri mpya wa saa karibu na ile ya zamani. Lango limeshindwa kubadili jina ikiwa yaliyomo yamebadilika (mabadiliko ya schema bado huenda katika uhamiaji mpya), au ikiwa faili inayolengwa ya kiingilio haiko kwenye diski.
- **Usibadilishe kamwe jina ndani ya muhuri wa muda sawa.** Jina jipya linaloweka muhuri wa muda na kubadilisha maelezo pekee halitafaulu lango, ikiwa na au bila ingizo. Kwa kiingilio ambacho `toVersion` yake ni sawa na `fromVersion`, mkimbiaji hufuta safu mlalo ya zamani `_omniroute_migrations` na kutumia faili tena kwenye kila hifadhidata ambayo tayari iliiendesha. Bila ingizo, mkimbiaji hufuata toleo pekee: huruka faili kwenye hifadhidata hizo (maudhui mapya hayafanyiki hapo) na huweka makosa ya kuweka hesabu kwenye kila buti. Tumia muhuri mwingine wa muda pamoja na ingizo la uoanifu, au uhifadhi jina.
- **Lango huangalia ikiwa faili iliyopewa jina haifanyi kazi tena.** Kwa kila jina lililofunikwa, lango hupitisha jina jipya la faili kwa ukaguzi wa ubadilishaji na `--must-not-apply`. Cheki hupakia hifadhidata iliyoboreshwa na mkimbiaji halisi, na ikiwa mkimbiaji atatumia faili hiyo tena (kwa mfano, kwa sababu kiingilio kina toleo lisilofaa au jina, au kwa sababu kichanganuzi cha maandishi cha lango kinasoma `constants.ts` tofauti na TypeScript), lango linashindwa na `migration renomeada rodaria de novo` na kukuuliza uangalie matoleo ya zamani na mapya na majina ya kiingilio.

### Nini Lango Linaangalia Dhidi ya Msingi

Kwa ombi la kuvuta na unganisha-foleni inaendesha, `npm run check:migration-numbering` inalinganisha `src/lib/db/migrations/` kwenye diski na saraka sawa kwenye tawi la msingi. Msingi ni, kwa mpangilio huu: `--base-latest-tag`, `--base <ref>`, kutofautisha `MIGRATION_BASE_REF`, au, wakati `GITHUB_EVENT_NAME` ni `pull_request`, `pull_request_target` au `merge_group`, mzazi wa kwanza wa ahadi ya kuunganisha, `merge_group.base_sha` ya malipo ya tukio, au `git merge-base HEAD origin/$GITHUB_BASE_REF`. Katika ombi la kuvuta au unganisha-foleni endesha bila msingi unaoweza kutatuliwa lango linashindwa. Nje CI bila `--base` inachapisha `comparação com a base: pulada (sem --base)` na kuruka sheria hizi.

`--base-latest-tag` inalinganishwa na lebo mpya zaidi ya kutolewa (`vX.Y.Z` katika mpangilio wa semver; tagi za kiambishi kama vile ndoto za usiku hazihesabiki) ambayo iko katika historia ya `HEAD`, ikiwa na sheria sawa na `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) huendesha lango kwa njia hii, kwa sababu kushinikiza na kukimbia zilizoratibiwa hazina msingi wa ombi la kuvuta na unganisho unaweza kutua bila kukimbia CI mpya. Bila lebo ya kutolewa katika historia lango linashindwa; endesha `git fetch --tags` (katika CI, `actions/checkout` na `fetch-depth: 0` huleta vitambulisho).

| Badilisha kwenye ombi la kuvuta                                                                                       | Matokeo                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Faili iliyopo kwenye msingi imepewa jina jipya, na ingizo la `RENAMED_MIGRATION_COMPATIBILITY`                        | **Onyo** ikiwa maudhui yanafanana, na ukaguzi wa ubadilishanaji huendesha chochote muhuri wa saa mpya; itashindikana ikiwa nafasi mpya itabadilisha schema ya mwisho (tendua jina jipya, au chagua muhuri mwingine wa wakati ambapo inasafiri) au ikiwa mkimbiaji angetumia faili iliyopewa jina tena kwenye hifadhidata iliyosasishwa.** Inashindwa** ikiwa maudhui yamebadilika. |
| Faili iliyopo kwenye msingi inabadilishwa jina kwa kuweka muhuri wa muda (maelezo pekee ndiyo yanabadilika)           | **Inashindwa** , ikiwa na au bila kiingilio: mkimbiaji angeitumia tena (pamoja na kiingilio) au kuiruka kwa toleo (bila moja). Tumia muhuri mwingine wa muda pamoja na ingizo la uoanifu, au uhifadhi jina.                                                                                                                                                                        |
| Faili iliyopo kwenye msingi inafutwa, au kubadilishwa jina bila ingizo                                                | **Inashindwa** , ikiwa faili iko kwenye lebo ya kutolewa au la. Ili kutendua, rejesha faili na `git checkout <base> -- src/lib/db/migrations/<file>`; ili kurudisha schema yake, ongeza uhamiaji mpya na `DROP ... IF EXISTS`.                                                                                                                                                     |
| Faili iliyopo kwenye msingi ina maudhui tofauti                                                                       | **Onyo** (ufafanuzi `::warning` katika Vitendo vya GitHub ), na ukaguzi wa ubadilishaji unaendeshwa. Inashindwa ikiwa hariri itabadilisha schema ya mwisho, kwa sababu hifadhidata zilizoboreshwa hazitumii faili iliyohaririwa tena: weka mabadiliko katika uhamiaji mpya. Uhariri usio na madhara (maoni, `IF NOT EXISTS`) huonya tu.                                            |
| Faili iliyo na muhuri wa muda huongezwa kwa muhuri wa muda ambao sio mpya zaidi kuliko msingi mpya zaidi              | Huendesha ukaguzi wa usafiri, uliofafanuliwa hapa chini.                                                                                                                                                                                                                                                                                                                           |
| Faili `NNN_` umbizo la zamani imeongezwa na nambari iliyo chini ya msingi ya faili mpya ya umbizo la zamani           | **Inashindwa** , hata kama `KNOWN_GAPS` imehaririwa katika ombi sawa la kuvuta: mfululizo wa zamani umegandishwa, unda uhamiaji na `npm run db:new-migration`. Faili za umbizo la zamani juu ya ile mpya kabisa ya msingi (ombi la kuvuta `release/v*` hadi `main` ) zinakubaliwa.                                                                                                 |
| Faili ambayo haijaagizwa, iliyohaririwa au iliyopewa jina jipya ina taarifa `INSERT`, `UPDATE`, `DELETE` au `REPLACE` | **Onyo** : ukaguzi wa ubadilishaji haulinganishi data, kwa hivyo kagua ikiwa mpangilio ambao hifadhidata zilizoboreshwa na mpya zitatumika hubadilisha matokeo.                                                                                                                                                                                                                    |

Uendeshaji mmoja wa ukaguzi wa ubadilishaji unashughulikia agizo la nje, faili zilizohaririwa na zilizopewa jina kwa pamoja.

Ukaguzi wa mabadiliko (`scripts/check/migration-commutation.ts`) huunda hifadhidata mbili za muda na njia halisi ya kusakinisha: an** imeboreshwa** moja (boot na uhamiaji wa msingi, kisha uwashe tena kwenye faili moja na uhamiaji wa ombi la kuvuta) na a** safi** moja ( buti moja na uhamiaji wa ombi la kuvuta). Inalinganisha miundo inayotokana: majedwali na safu wima (kupuuza mpangilio wa safu), UNIQUE / PRIMARY KEY na vikwazo vya FOREIGN KEY, maandishi ya kawaida `CREATE TABLE` ya kila jedwali (ambayo inashughulikia vikwazo vya CHECK, migongano, safu wima zinazozalishwa na chaguzi za jedwali), faharisi, vichochezi na maoni. Data ya safu mlalo hailinganishwi. Ikiwa yanalingana, lango huchapisha kuwa faili haiko katika mpangilio lakini husafiri na kupita. Ikiwa zinatofautiana, lango linashindwa na tofauti na kidokezo kwa kesi: kwa faili ya nje ya utaratibu, fanya upya jina lake na `npm run db:new-migration`, ambayo ni salama kwa sababu faili haijaunganishwa bado; kwa faili ya msingi iliyohaririwa, kurejesha maudhui ya msingi na kuweka mabadiliko katika uhamiaji mpya; kwa faili iliyopewa jina jipya, tendua jina jipya au chagua muhuri mwingine wa wakati ambapo inasafirishwa, kamwe usiwe muhuri sawa wa muda na jina lingine. Ikiwa hundi yenyewe haiwezi kukimbia, lango litashindwa katika CI na huonya tu ndani ya nchi. Kwa faili ya msingi iliyohaririwa, hifadhidata iliyoboreshwa imeundwa kwa maudhui ya msingi ya faili hiyo, na boot ya pili inairuka kwa sababu toleo lake tayari limerekodiwa. Kwa faili iliyopewa jina, hifadhidata iliyoboreshwa imejengwa na faili chini ya jina lake la zamani, na boot ya pili inasonga safu yake `_omniroute_migrations` kupitia kiingilio cha utangamano badala ya kuiendesha tena; lango hupitisha jina jipya na `--must-not-apply`, kwa hivyo cheki itashindwa ikiwa buti ya pili itaitumia. Ikiwa uhamishaji wa ombi la kuvuta utashindwa kutumika kwenye njia iliyoboreshwa, yaani, baada ya kila uhamishaji wa msingi (ikiwa pia hautafaulu kwenye usakinishaji mpya), lango linaripoti `migration do PR não aplica` na kukuuliza urekebishe SQL dhidi ya schema ya sasa ya msingi; ikiwa faili inategemea uhamishaji mwingine wa ombi la kuvuta na muhuri wa wakati wa baadaye, tengeneza upya jina lake na `npm run db:new-migration`.

Ili kutekeleza ulinganisho sawa ndani ya nchi, pitisha msingi kwa uwazi, kwa mfano `npm run check:migration-numbering -- --base origin/<base-branch>`, au `npm run check:migration-numbering -- --base-latest-tag` ili kulinganisha na toleo jipya zaidi.

### Converting an Open PR's `NNN` Migration

Ombi la kuvuta lililofunguliwa kabla ya swichi bado inaweza kubeba faili mfuatano kama vile `242_add_widgets.sql`. Nambari za zamani juu ya `241` zimekataliwa, kwa hivyo zibadilishe kabla ya kuunganishwa:

1. **Badilisha jina la faili na jenereta, ukihifadhi maelezo.** Endesha `npm run db:new-migration -- <same description>` ili kupata jina jipya, sogeza SQL ndani yake, na ufute faili ya zamani `NNN_`. Maelezo lazima yabaki sawa: ingizo la uoanifu lililo hapa chini linalingana nayo.
2. **Ongeza ingizo la uoanifu ikiwa hifadhidata inayoendelea iliendesha nambari ya zamani.** Ikiwa hifadhidata yoyote ambayo imehifadhiwa (homolog, a VPS, usakinishaji wa mchangiaji mwenyewe) iliendesha muundo wa PR na faili ya `NNN_`, ongeza `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` kwa `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. Hii ni** inahitajika kwa `237` hadi `241`** : nafasi hizo sasa zinashikilia kanuni `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` na `241_seen_models.sql`, na bila ingizo hifadhidata kama hiyo huruka uhamiaji wa kisheria milele na kuendesha iliyobadilishwa tena. Pia hufanya kazi kwa nafasi ambayo inakaa tupu, kama vile `242`, wakati marudio ni muhuri wa muda. Unapokuwa na shaka, ongeza kiingilio. Ambapo unaiongeza katika safu haijalishi: wakati nafasi inayolengwa ya ingizo bado inashikilia safu ambayo ingizo lingine linasogea (kwa mfano `237` iliyoshikilia safu mlalo PR huku safu ya `usage_history_calculated_cost` ya zamani ikingoja kuingia `237`), mkimbiaji huruhusu ingizo hilo kusubiri hadi nafasi iwe huru. Mzozo wa kweli pekee, kama vile nafasi inayoshikiliwa na safu mlalo hakuna ingizo linalosogezwa, au maingizo mawili ambayo hubadilishana nafasi, husimamisha buti na `Cannot reconcile ...`.
3. **Weka SQL kutokuwa na uwezo** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), kwa sababu uhamiaji uliogeuzwa unaweza kukutana na hifadhidata ambapo schema yake tayari ipo.
4. **Sogeza vipochi maalum vilivyo na ufunguo wa toleo.** Ikiwa PR iliongeza kipochi kwa nambari yake ya zamani katika `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) au katika `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), badilisha kitufe hadi muhuri mpya wa saa.

`tests/unit/db/codex-fence-migration-rename.test.ts` ni mfano wa kufanya kazi wa jaribio la uhamiaji uliopewa jina jipya.

### Backports kwa Matawi Kabla ya Kubadili

Usichague kamwe au kurudisha faili `YYYYMMDDHHMMSS_` kwa tawi ambalo linatanguliza swichi (kwa mfano tawi kuu `release/v*` ). Kiendeshaji hapo hupanga majina ya faili kama maandishi, kwa hivyo faili iliyowekwa alama ya nyakati ingeendesha kati ya `201_` na `202_` kwenye hifadhidata mpya, na lango la zamani hapo halielewi viambishi vya tarakimu 14. Kwenye tawi kama hilo, andika mabadiliko kama faili ya `NNN_` inayofuata ya tawi hilo, idempotent, kwa hivyo ni hakuna-op wakati toleo la muhuri wa muda linakuja baadaye.

### Jinsi Uhamiaji Huendeshwa

Wakati wa kuanza, `migrationRunner.ts`:

1. Inaunda jedwali `_omniroute_migrations` ikiwa haipo
2. Hoja za uhamishaji ambao tayari umetumika
3. Hutumia uhamishaji wowote mpya kwa mpangilio, kila moja katika muamala
4. Hurekodi kila uhamishaji uliotumika kwa muhuri wa muda

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

### Upungufu

Uhamiaji lazima iwe** asiye na uwezo** — kuziendesha mara mbili kunapaswa kuwa hakuna-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Tumia vifungu vya `IF NOT EXISTS`, `IF EXISTS`, na `OR IGNORE` / `OR REPLACE` kwa wingi.

### Kuongeza Uhamiaji Mpya

1. **Unda faili na jenereta** : `npm run db:new-migration -- <description>` (kwa mfano `npm run db:new-migration -- add combo priority`). Huandika `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` na saa ya sasa UTC na kichwa cha maoni, kusonga mbele kwa sekunde moja ikiwa muhuri huo wa muda umechukuliwa, na kamwe haubadilishi faili. Usichague nambari kwa mkono.
2. **Tumia DDL salama** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Jaza data kwa uangalifu** : tumia `UPDATE ... WHERE ...` kushughulikia safu mlalo zilizopo
4. **Angalia utaratibu na jina** : `npm run test:migrations:fresh` (uhamiaji wote kwenye hifadhidata tupu) na `npm run check:migration-numbering`
5. **Jaribu kwenye nakala** : usiwahi kuendesha uhamaji ambao haujajaribiwa kwenye uzalishaji
6. **Jedwali lililoundwa kutoka kwa msimbo linahitaji uhamishaji pia** : ikiwa moduli pia inaunda meza kwa uvivu (`CREATE TABLE IF NOT EXISTS`, iliyohifadhiwa kama njia ya kujiponya), uhamiaji lazima uunde kwa DDL sawa. Vinginevyo usakinishaji safi na usakinishaji ulioboreshwa huishia na schemas tofauti, kulingana na ikiwa njia hiyo ya msimbo ilienda. `tests/unit/db/lazy-table-migration-guard.test.ts` huchanganua `src/` na `open-sse/` na kushindwa kwenye `CREATE` mvivu bila kuhama (#20557). Mfano: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Mfano:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Mabadiliko ya nyuma-yasiyoendana** (kwa mfano, kuangusha nguzo) ni gumu. OmniRoute hairuhusu NOT kuteremsha — mara uhamiaji unapotumika, mabadiliko ya schema ni ya kudumu. Panga ipasavyo.

---

## Usimbaji Fiche wa Data Iliyohifadhiwa

Sehemu nyeti (funguo za API, tokeni za OAuth, mifuatano ya muunganisho) husimbwa kwa njia fiche wakati zimehifadhiwa kwa kutumia **AES-256-GCM**.

### Jinsi Inavyofanya Kazi

```ts
// src/lib/db/encryption.ts (imerahisishwa)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Mahali Inapotumika

- `provider_connections.api_key` — imesimbwa kwa njia fiche katika kiwango cha programu
- `provider_connections.access_token`, `refresh_token`, `id_token` — zimesimbwa kwa njia fiche katika kiwango cha programu
- Maingizo ya `key_value` yenye `namespace = "secrets"` — yamesimbwa kwa njia fiche katika kiwango cha programu
- `proxy_registry.auth` — imesimbwa kwa njia fiche katika kiwango cha programu (ikiwa ipo)

### Ufunguo wa Usimbaji Fiche

Ufunguo wa usimbaji fiche hutokana na **kaulisiri** (iliyowekwa kupitia kigezo cha mazingira cha `STORAGE_ENCRYPTION_KEY`) na **salt** (iliyohifadhiwa katika hifadhidata). Vyote viwili vinahitajika ili kusimbua data.

```bash
# Tengeneza kaulisiri salama
openssl rand -hex 32

# Weka katika .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Muhimu sana**: Kupoteza ufunguo wa usimbaji fiche kunamaanisha kupoteza uwezo wa kufikia data yote iliyosimbwa kwa njia fiche. **Hifadhi nakala ya ufunguo kando na hifadhidata**.

### Vitu Ambavyo HAVIJASIMBWA kwa Njia Fiche

Kwa sababu za utendaji, yafuatayo huhifadhiwa kama maandishi wazi:

- Majina ya kuonyesha ya watoa huduma
- Ufafanuzi wa modeli (tayari ni wa umma)
- Kanuni za uelekezaji
- Rekodi za matumizi (hazina PII)

---

## Tahadhari za Usimbaji Fiche (v3.8.16+)

OmniRoute hutumia **`migrateLegacyEncryptedString()`** kushughulikia mifumo miwili ya usimbaji fiche kwa uwazi:

- **Ya zamani** (kabla ya v3.5.0): "usimbaji fiche" unaotegemea XOR (si usimbaji fiche halisi)
- **Ya sasa**: AES-256-GCM yenye IV sahihi na lebo ya uthibitishaji

Kisaidizi cha uhamishaji hutambua muundo wa zamani na kusimba upya kwa kutumia mfumo mpya wakati wa usomaji wa kwanza. Hii inamaanisha unaweza kusasisha hifadhidata ya zamani bila kupoteza vitambulisho.

---

## Akiba ya Usomaji

Kwa data inayosomwa mara kwa mara (miundo, watoa huduma, mipangilio), `readCache.ts` hutoa **akiba ya ndani ya kumbukumbu**:

```ts
// Imehifadhiwa kwenye akiba wakati wa kuanzisha, hubatilishwa wakati wa kuandika
const providers = await getCachedProviders(); // Haraka, ndani ya kumbukumbu
const fresh = await listProviders(); // Polepole, hufikia DB
```

| Huluki iliyohifadhiwa kwenye akiba | Ufunguo wa akiba | TTL                     |
| ---------------------------------- | ---------------- | ----------------------- |
| `models`                           | `models:v1`      | Hadi wakati wa kuandika |
| `provider_connections`             | `providers:v1`   | Hadi wakati wa kuandika |
| `settings`                         | `settings:v1`    | Hadi wakati wa kuandika |
| `combos`                           | `combos:v1`      | Hadi wakati wa kuandika |

Akiba hubatilishwa kila mara jedwali linalohusika linapoandikiwa.

---

## Hifadhi Nakala na Urejeshaji

### Hifadhi Nakala ya Kujitengenezea

```bash
# Tumia CLI kuunda hifadhi nakala ya ndani
omniroute backup create --name pre-migration

# Au kupitia API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Faili ya hifadhi nakala inajumuisha:

- Majedwali yote ya DB (yaliyowekwa katika mfuatano wa JSON)
- Mabaki ya kumbukumbu za miito (yaliyosimbwa kwa base64, ya hiari)
- Mipangilio + siri (zilizosimbwa kwa njia fiche)
- Usanidi wa programu-jalizi

### Urejeshaji

```bash
# Kupitia CLI
omniroute restore pre-migration

# Kupitia API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Onyo**: Urejeshaji huandika juu ya DB nzima. Simamisha viteja vyote kwanza.

### Hifadhi Nakala za Kiotomatiki

```bash
# Washa hifadhi nakala za kila siku za kiotomatiki kupitia CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ratiba hutekelezwa upande wa seva na kazi ya chinichini inayotekelezwa kila sekunde 30
(chaguo-msingi) na kutathmini usemi wa cron kulingana na saa ya ndani ya seva.

| Kigezo                                      | Chaguo-msingi | Maelezo                                                                                                                                                     |
| ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Kipindi cha utekelezaji katika ms (kiwango cha chini `5000`). Lazima kiwe chini ya sekunde 60 ili kuingia kwa uhakika ndani ya dakika inayolingana ya cron. |

### Hifadhi Nakala Moja kwa Moja ya SQLite

Kwa hifadhi nakala ya DB inayotumika bila muda wa kusitisha huduma:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Hii hutumia API ya hifadhi nakala ya mtandaoni ya SQLite — ni salama kutekeleza wakati OmniRoute inaendelea kufanya kazi.

---

## Urekebishaji wa Utendaji

### WAL Mode

WAL imewezeshwa kwa chaguo-msingi. Kwa mzigo wa maandishi ya juu, zingatia:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute haiweki `journal_size_limit`. Sehemu ya ukaguzi huhamisha fremu WAL hadi kwenye faili kuu, lakini faili WAL huhifadhi saizi yake kubwa zaidi iliyotengwa. Mlinzi wa `OMNIROUTE_WAL_GUARD_MAX_MB` anaonya tu na kukimbia `wal_checkpoint(RESTART)`; sio kofia ya ukubwa wa diski.

### Fahirisi

Faharasa muhimu za utendakazi (zilizoundwa kiotomatiki na uhamaji):

- `idx_models_provider` — mifano ya utafutaji na mtoaji
- upanuzi wa lengo la `idx_combo_targets_combo_id` —
- `idx_usage_history_api_key_timestamp` — uchanganuzi wa matumizi
- Ufuatiliaji wa mgawo wa `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — maswali ya kumbukumbu ya simu

Ili kuongeza faharasa mpya, tengeneza uhamishaji:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Kumbukumbu-Ramani I/O

Kwa hifadhidata kubwa sana (> 10GB), ramani ya kumbukumbu inaweza kubadilishwa kupitia SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Mshikamano

Matukio OmniRoute ya muda mrefu yananufaika na mara kwa mara `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Endesha kila mwezi wakati wa madirisha yenye trafiki ya chini. (Njia WAL inapunguza hitaji, lakini haiondoi.)

---

## Ukaguzi wa Afya

`src/lib/db/healthCheck.ts` hutoa **uchunguzi wa afya katika kiwango cha DB**:

Vitenzi vyote viwili vinahitaji uthibitishaji (`401` vinginevyo). `GET` hufanya uchunguzi pekee; `POST` huendesha
ukaguzi uleule huku `autoRepair` ikiwa imewezeshwa.

```bash
GET  /api/db/health   # fanya uchunguzi
POST /api/db/health   # fanya uchunguzi + rekebisha
```

Jibu ni `DbHealthCheckResult` inayozalishwa na `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Bajeti za vikoa zilirejelea funguo za API ambazo hazipo tena.",
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

| Sehemu            | Maana                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Ni `true` wakati `issues` ni tupu. `driver` haiathiri thamani hii kamwe.                                                                                                   |
| `issues[].type`   | Moja kati ya `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                              |
| `repairedCount`   | Safu mlalo zilizorekebishwa wakati wa utekelezaji huu; daima ni `0` wakati `autoRepair` ni false.                                                                          |
| `backupCreated`   | Ikiwa nakala rudufu iliundwa kabla ya kurekebisha.                                                                                                                         |
| `checkedAt`       | Muhuri wa muda wa ISO unaoshirikiwa na utekelezaji na dokezo lolote la marekebisho linaloandikwa.                                                                          |
| `driver.name`     | Kiendeshi cha SQLite kinachohudumia hifadhidata iliyokaguliwa.                                                                                                             |
| `driver.degraded` | Ni `true` wakati maandishi hayajahifadhiwa kwa kudumu na faili ya hifadhidata — mbadala wa `sql.js` WASM (uhifadhi wa faili nzima) au hifadhidata iliyo katika kumbukumbu. |

Mzigo huohuo wa data hurejeshwa na zana ya MCP ya `omniroute_db_health_check`.

Tekeleza `PRAGMA integrity_check` ili kugundua uharibifu:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Inapaswa kuchapisha: ok
```

Ikiwa inarejesha chochote tofauti na `ok`, **acha kutumia hifadhidata mara moja** na uirejeshe kutoka kwenye nakala rudufu.

---

## Urejeshaji Baada ya Maafa

### Hali ya 1: Faili la WAL Limepotea

Faili la `-wal` halipo, lakini `-shm` na hifadhidata kuu bado ziko salama:

```bash
# Hujirejesha kiotomatiki inapofunguliwa tena
omniroute
```

Ikiwa SQLite haiwezi kujirejesha kiotomatiki:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Hali ya 2: Faili Kuu la Hifadhidata Limeharibika

Rejesha kutoka kwenye nakala rudufu:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` hupakua tu jalada kamili la `.tar.gz` kutoka kwenye seva inayoendeshwa
(`GET /api/db-backups/exportAll`, kitambulisho cha mwendeshaji kinahitajika); hairejeshi chochote.

### Hali ya 3: Ufunguo wa Usimbaji Fiche Umepotea

**Urejeshaji hauwezekani** bila ufunguo. Sehemu zilizosimbwa kwa njia fiche haziwezi kusomeka. Ongeza tena watoa huduma wote wewe mwenyewe ukitumia vitambulisho vipya.

> **Hatua ya kupunguza athari**: Daima hifadhi nakala rudufu ya ufunguo wa usimbaji fiche kando, ikiwezekana kwenye kidhibiti cha nywila au KMS.

### Hali ya 4: Diski Imejaa

SQLite itarudisha hitilafu za `SQLITE_FULL`. Futa nafasi kwenye diski, kisha:

```bash
# Weka kituo hakikishi cha WAL ili kufungua nafasi
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operesheni za Kawaida

### Kagua Jedwali

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Hesabu Safu katika Majedwali Yote

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Weka Upya (Futa) Data Yote

```bash
# Simamisha OmniRoute kwanza
omniroute stop

# Futa faili ya DB
rm ~/.omniroute/storage.sqlite*

# Anzisha upya (itaunda upya DB tupu)
omniroute
```

Kwa uwekaji upya **wa kuchagua** (hifadhi watoa huduma, futa data ya matumizi):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Hamisha Jedwali Moja

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Utatuzi wa Matatizo

### "Hifadhidata imefungwa"

Mchakato mwingine unashikilia kufuli ya uandishi. Fanya mojawapo ya yafuatayo:

- Subiri mchakato mwingine ukamilike (kagua `lsof | grep storage.sqlite`)
- Sitisha mchakato mwingine
- Ikiwa hali hiyo inaendelea, anzisha OmniRoute upya

### "Kizuizi cha ufunguo wa kigeni kimeshindwa"

Moduli ya kikoa inakiuka uadilifu wa marejeleo. Kagua:

- Safu zisizo na marejeleo katika majedwali tegemezi
- Ufutaji wa mfululizo ambao haukuenea
- Uhamishaji wa hivi karibuni uliobadilisha ufunguo wa kigeni

Endesha `PRAGMA foreign_key_check;` ili kupata ukiukaji.

### "Kumbukumbu haitoshi"

I/O ya SQLite iliyopangwa kwenye kumbukumbu inazidi kikomo cha OS. Ipunguze kupitia pragma ya SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB badala ya 256MB
```

Au izime:

```sql
PRAGMA mmap_size = 0;
```

### "Uhamishaji umeshindwa katikati"

Uhamishaji uliendeshwa ndani ya muamala, kwa hivyo ulipaswa kutenduliwa. Ikiwa haukutenduliwa:

1. **Simamisha OmniRoute** (zuia majaribio zaidi)
2. **Kagua hali ya DB** kwa kutumia `sqlite3`
3. **Rekebisha wewe mwenyewe** uhamishaji usiokamilika
4. **Endesha OmniRoute tena** (uhamishaji utajaribiwa tena)

Ili kuzuia hali hii, daima jaribu uhamishaji kwenye nakala kwanza.

---

## Angalia Pia

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — majedwali ya matumizi
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ufuatiliaji wa hali
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — mtiririko wa utoaji
- Chanzo: `src/lib/db/` (faili 80+, takriban LOC 25K)
