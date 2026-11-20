# Database Schema & Operations Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Go hachomair**: Úsáideann OmniRoute **SQLite le dialannú WAL** mar a phríomhstór, agus criptiú **AES-256-GCM** á úsáid aige le haghaidh réimsí íogaire atá á stóráil. Clúdaíonn an treoir seo an scéimre, ascnaimh, cúltaca/aisghabháil, agus treoirleabhair oibríochtúla.

**Foinsí:**

- `src/lib/db/core.ts` — aonarán + SCHEMA_SQL (17 mbuntábla)
- `src/lib/db/migrationRunner.ts` — ascnaimh le leaganacha
- `src/lib/db/migrations/` — 167 comhad SQL le leaganacha
- `src/lib/db/encryption.ts` — feidhmeanna cúnta criptithe
- `src/lib/db/backup.ts` — easpórtáil/iompórtáil cúltaca
- `src/lib/db/healthCheck.ts` — diagnóisic sláinte

---

## Cén fáth SQLite?

Roghnaigh OmniRoute SQLite seachas PostgreSQL/MySQL ar roinnt cúiseanna:

| Fachtóir           | SQLite                                      | PostgreSQL                                       |
| ------------------ | ------------------------------------------- | ------------------------------------------------ |
| **Imscaradh**      | Leabaithe — gan freastalaí ar leith         | Socrú freastalaí de dhíth                        |
| **Criptiú**        | Ciseal feidhmchláir (AES-256-GCM)           | TDE ionsuite                                     |
| **Feidhmíocht**    | Níos tapa d'ualaí oibre beaga/meánmhéide    | Níos fearr do scríbhinní ollmhóra comhthráthacha |
| **Comhthráthacht** | Ceadaíonn mód WAL léamha comhthráthacha     | MVCC iomlán                                      |
| **Cúltaca**        | Cóip aonchomhaid                            | `pg_dump` nó seat den chóras comhad              |
| **Cás úsáide**     | Suiteáil in aghaidh an úsáideora, leabaithe | SaaS ilthionónta                                 |

I gcás imscaradh **aonúsáideora, aonáis** (príomhchás úsáide OmniRoute), tá SQLite níos simplí agus níos tapa.

### Dialannú WAL

Osclaíonn `core.ts` an bunachar sonraí i **mód WAL (Logáil Réamhscríofa)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

Ceadaíonn WAL **léamha comhthráthacha** le linn scríbhinní — rud atá tábhachtach don deais, a dhéanann iarratais agus iarrataí á dtaifeadadh.

Is é **65,536 KiB (64 MiB)** méid réamhshocraithe na taisce. Léirmhíníonn SQLite
`cache_size` diúltach mar neasteorainn uachtarach in KiB agus leithdháileann sé leathanaigh de réir mar is gá.
Glacann **Socruithe > Córas & Stóras > Méid na Taisce** le luachanna slánuimhreacha ó **1 go
1,000,000 KiB**; nuair a shábháiltear an socrú, cuirtear i bhfeidhm é ar an gceangal beo leis an mbunachar sonraí,
agus athchóiríonn OmniRoute an luach marthanach ag am tosaithe.

---

## Suíomh an Bhunachair Sonraí

Stóráiltear an comhad SQLite ag:

| OS      | Conair                                                   |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (inchumraithe trí `DATA_DIR`) |

Comhaid ghaolmhara:

- `storage.sqlite-wal` — loga réamhscríofa
- `storage.sqlite-shm` — comhad cuimhne comhroinnte
- `call_logs/` — déantáin phálasta iarratais (má tá siad cumasaithe)

**Sáraigh an suíomh:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Ailtireacht Modúl Fearainn

Tá **110 modúl TypeScript ardleibhéil** i mbunachar sonraí OmniRoute in `src/lib/db/`. Déanann gach modúl fearainn na nithe seo a leanas:

- Tá tábla sonrach amháin nó níos mó faoina chúram
- Easpórtálann sé feidhmeanna CRUD clóscríofa
- Ní dhéanann sé teagmháil choíche le táblaí modúil eile
- Úsáideann sé `getDbInstance()` ó `core.ts` chun rochtain a fháil ar an mbunachar sonraí

### Na 110 Modúl Ardleibhéil Bunachair Sonraí

Tá **110 comhad TypeScript ardleibhéil** ag OmniRoute in `src/lib/db/`. Seo thíos sampla de na croímhodúil; féach liostú na comhadlainne chun an liosta iomlán a fháil:

| Modúl                   | Táblaí                                                         | Freagracht                                                                           |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Clárú soláthraithe OAuth/eochrach API agus dintiúir                                  |
| `models.ts`             | `key_value` (sonraí samhla)                                    | Sainmhínithe samhlacha, cumais, praghsáil                                            |
| `combos.ts`             | `combos`                                                       | Cumraíochtaí ródaithe teaglama agus ordú                                             |
| `apiKeys.ts`            | `api_keys`                                                     | Saolré eochracha API, scóip, rianú cuóta                                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Cumraíocht córais agus stór comhroinnte KV                                           |
| `backup.ts`             | —                                                              | Oibríochtaí easpórtála/iompórtála cúltaca                                            |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Cumraíochtaí seachfhreastalaithe agus rialacha ródaithe                              |
| `prompts.ts`            | `prompt_templates`                                             | Teimpléid leid in-athúsáidte, leaganú                                                |
| `webhooks.ts`           | `webhooks`                                                     | Síntiúis agus logaí crúca gréasáin faoi thiomáint imeachtaí                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Logáil iniúchta in aghaidh na hiarrata (roghnach, ardtoirte)                         |
| `domainState.ts`        | `domain_*` (5 thábla)                                          | Buiséid fearainn, scoradáin chiorcaid, frithdhúnadh, slabhraí cúltaca, stair costais |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Eochracha API ar an liosta ceadaithe le haghaidh MCP/A2A                             |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Úsáid stairiúil cuóta                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapáil samhlacha chuig réamhshocruithe teaglama                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | Staid mharthanach a bhaineann go sonrach le CLI                                      |
| `encryption.ts`         | —                                                              | Feidhmeanna cúnta chun réimsí a chriptiú/a dhíchriptiú                               |
| `readCache.ts`          | —                                                              | Taisce cuimhne le haghaidh oibríochtaí diantéagartha                                 |
| `secrets.ts`            | `key_value` (iontrálacha criptithe)                            | Stóráil rúin chriptithe                                                              |
| `stateReset.ts`         | —                                                              | Staid an bhunachair sonraí a ghlanadh/a athshocrú le haghaidh tástála                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Comhthéacs seisiúin le haghaidh aistriú idir gníomhairí                              |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Rianú úsáide                                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Cumraíocht comhbhrúite                                                               |

### Teorainneacha Modúl

Croí-riail ailtireachta: **ní fhaigheann modúil rochtain dhíreach ar tháblaí a chéile**. Chun oibriú le sonraí modúil eile, iompórtáil an fheidhm ón modúl sin.

```ts
// ❌ MÍCHEART: SQL díreach ó mhodúl eile
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CEART: úsáid feidhm an mhodúil providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Cuirtear an riail seo i bhfeidhm trí athbhreithniú cód — níl aon seiceáil statach ann, ach cuirtear sáruithe in iúl.

---

## Bunscéimre (17 dtábla)

Sainmhíníonn `core.ts` na 17 mbuntábla in `SCHEMA_SQL`. Cruthaítear iad seo leis an asc迁ú `001_initial_schema.sql` agus is iad croílár na scéime iad.

### Croítháblaí (cruthaithe sa chéad asc迁ú)

| Tábla                      | Cuspóir                                    | Príomhcholúin                                                           |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Dintiúir soláthraí (criptithe)             | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Faisnéis ródúcháin nóid soláthraí          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Stór ginearálta KV                         | `namespace`, `key`, `value`                                             |
| `combos`                   | Sainmhínithe teaglama ródúcháin            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Eochracha API don gheata                   | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Meiteashonraí an bhunachair sonraí         | `key`, `value`                                                          |
| `usage_history`            | Taifid úsáide iarratas                     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Ualaí pá iarratas agus freagraí            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logaí iarratas seachfhreastalaí            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Slabhraí samhail-go-soláthraí              | `model`, `chain`                                                        |
| `domain_budgets`           | Buiséid chaiteachais de réir fearainn      | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Stair athshocraithe buiséid                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Rianú costas de réir fearainn              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Staid teorannaithe ráta fearainn           | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Staid scoradáin chiorcaid de réir fearainn | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Taisce freagartha LLM                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Seatanna stairiúla cuóta                   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Táblaí Breise (curtha leis ag asc迁uithe níos déanaí)

Cuireann asc迁uithe ina dhiaidh sin táblaí leis amhail:

- `cli_tool_state` (asc迁ú 011) — staid uirlis CLI
- Táblaí `mcp_*` — iniúchadh freastalaí MCP
- Táblaí `a2a_*` — staid taisc A2A
- Táblaí `usage_*` — rianú úsáide
- Táblaí `plugin_*` — córas breiseán
- `skill_executions` — stair rite scileanna
- Táblaí `memory_*` — córas cuimhne
- Táblaí `compression_*` — córas comhbhrúite
- Táblaí `webhook_*` — loga seachadta crúca gréasáin
- Táblaí `acp_*` — Prótacal Cliant Gníomhaire
- Táblaí `oneproxy_*` — margadh 1proxy
- `proxy_assignments` — ceangail scóipe seachfhreastalaí
- `detailed_call_artifacts` — meiteashonraí déantán loga glao
- `quota_alert_history` — iniúchadh foláirimh cuóta
- `command_code_auth_sessions` — seisiúin OAuth Command Code

Tá an liosta iomlán de thart ar 30+ tábla in `src/lib/db/migrations/`.

---

## Imirce

úsáideann OmniRoute** ascnaimh leagan, mífhoighneach** i `src/lib/db/migrations/`. Is comhad SQL amháin é gach ascnamh. Tá dhá fhormáid ainmniúcháin taobh le chéile; is é an réimír uimhriúil an leagan a thaifeadtar in `_omniroute_migrations`.

### Ainmniú Imirce

| Formáid                                           | Sampla                               | A úsáidtear le haghaidh                                                                                                                                                                         |
| ------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (díreach 3 dhigit)          | `241_seen_models.sql`                | An sean sraith `001`–`241`. Reoite nuair a tháinig an fhormáid stampa ama i dtír ( rinneadh `240` agus `241` a chumasc díreach roimhe seo): ní fhaigheann aon chomhad nua uimhir sheicheamhach. |
| `YYYYMMDDHHMMSS_description.sql` (14 dhigit, UTC) | `20261113120000_add_usage_index.sql` | Gach imirce a cruthaíodh ó 2026-11-13 ar aghaidh.                                                                                                                                               |

Cén fáth a bhfuil an t-athrú: le huimhreacha seicheamhacha, roghnaigh comhthreomhar PRs an chéad uimhir eile agus bhí ar gach duine seachas ceann amháin a athuimhriú roimh chumasc. Tugann stampa ama UTC a leagan féin do gach PR.

Rialacha formáid an stampa ama (arna fhorfheidhmiú ag `npm run check:migration-numbering`, roinnte leis an ngineadóir in `scripts/check/lib/migrationNaming.mjs`):

- Is dáta agus am UTC fíor é an stampa ama, tráth nach luaithe ná `20261113000000` agus nach mó ná 10 nóiméad sa todhchaí.
- `snake_case` atá sa chás íochtair ag tosú le litir (`a-z`, `0-9`, `_` singil idir focail), 80 carachtar ar a mhéad.
- Is dúblach iad dhá chomhad leis an stampa ama céanna.
- Ní bhaineann an riail gan bhearna ach leis an tseansraith: ní mór go mbeadh gach uimhir ó `001` go `241` ann, ach amháin na bearnaí aitheanta `026`, `055` agus `121`. Má scriostar `241` (nó aon seanchomhad) ní theipeann ar an geata. Ní féidir `001` agus `241` a chur leis an liosta ceadaithe `KNOWN_GAPS` choíche. Ní chruthaíonn comhaid le stampa ama bearna riamh.
- Caithfidh gach iontráil in `src/lib/db/migrations/` a bheith ina chomhad rialta le hainm `.sql` litreacha beaga bailí. Teipeann ar eolaire, nasc simplí, comhad `.SQL` nó `.sql.bak`, comhad folaithe nó ainm le spás, toisc go ndéanfadh an reathaí é a scipeáil go ciúin nó go dtimpisteálfadh sé ag an tosaithe.

**Cuir ordú i bhfeidhm.** Déanann an rádala sórtáil de réir luach uimhriúil an réimír, ní trí théacs: na sean `001`– comhaid `241` ar dtús, ansin na comhaid le stampa ama in ord stampa ama, ansin aon chomhaid le spásanna ainm atá cláraithe le `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (leaganacha ar nós `ee-001`). Is éard is ascnamh ar feitheamh ann ná comhad ar bith nach bhfuil a leagan in `_omniroute_migrations`, mar sin tá feidhm ag ascnamh ó bhrainse níos sine a chumaisc tar éis ceann níos nuaí ar bhunachair shonraí atá ann cheana féin.

**Is é an stampa ama ná ordú cruthú, ní ordú cumaisc.** Má bhraitheann do imirce ar thábla nó colún cruthaithe ag imirce le a** níos nuaí** stampa ama (mar shampla, ceann ó PR eile a chumasc ar dtús), rithfidh bunachar sonraí úr do cheannsa ar dtús agus theipeann air. Cé go bhfuil do PR fós oscailte, athghin ainm an chomhaid le `npm run db:new-migration` ionas go bhfaighidh sé stampa ama níos nuaí, nó déan neamhspleách é. Baineann `npm run test:migrations:fresh` gach ascnamh chuig bunachar sonraí folamh agus glacann sé seo.

### Ní Scriostar nó Ní Athainmnítear Imirce Chomhcheangailte

Nuair a bhíonn comhad ascnaimh ar bhrainse eisithe nó `main`, tá sé ar siúl cheana féin ar bhunachair sonraí homalog agus forbróra, ar shuiteálacha VPS agus sa sioncronú Enterprise. As sin amach:

- **Ná scrios riamh é.** Chaillfeadh suiteálacha úra a scéimre fad is a choimeádann bunachair shonraí uasghrádaithe é.
- **Ná athainmnigh riamh é.** Ní bheadh an leagan in `_omniroute_migrations` ag teacht le comhad a thuilleadh, agus mar sin reáchtálfadh gach bunachar sonraí a chuir i bhfeidhm é arís é. Ansin déanann SQL neamh-impire sonraí a dhúbailt nó stopann sé an tosaithe.
- **Scéimre difriúil uait?** Cruthaigh ascnamh nua le `npm run db:new-migration`.

Níl an t-athainmniú sábháilte ach do chomhad nach bhfuil cumaiscthe fós, agus is é sin an cás a thagraíonn leideanna an gheata. Ní athraíonn clib scaoileadh rud ar bith anseo: foilsíonn gach brú chuig brainse `release/v*` an íomhá Docker `:next` agus ritheann sé ar homolog, suiteálann VPS agus an sioncronú Enterprise, agus mar sin tá ascnamh cumaisc ar siúl ar bhunachair shonraí iarbhír sula mbíonn aon chlib `vX.Y.Z` ann. Teipeann ar an geata gach bhaint de chomhad bonn, clib nó nach bhfuil.

- **Aistriú cumaiscthe ar ais.** Teipeann ar `git revert` a scriosann an comhad an geata. Coinnigh an comhad agus cealaigh a scéimre in ascnamh nua: `npm run db:new-migration -- <description>`, le `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` agus mar sin de. Críochnaíonn bunachair shonraí uasghrádaithe agus úra ansin leis an scéimre céanna.
- **Glactar leis an gceann a athainmniú: iontráil comhoiriúnachta agus ábhar comhionann.** Más gá comhad cumaisc a bhogadh (mar shampla, roinneann dhá chomhad chumasc stampa ama agus stopann an reathaí le himbhualadh leagain), athainmnigh an ceann is déanaí gan teagmháil a dhéanamh lena SQL agus cuir `{ fromVersion, fromName, toVersion, toName }` le `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Bogtar a ró `_omniroute_migrations` ó bhunachair shonraí a chuir an seanleagan i bhfeidhm in ionad an comhad a rith arís. Tugann an geata foláireamh faoi athainmniú den sórt sin agus reáchtálann sé an tseiceáil comaitéireachta air i gcónaí, is cuma cén stampa ama nua: cuireann suiteálacha úra an comhad i bhfeidhm sa suíomh nua, ní dhéanann bunachair shonraí uasghrádaithe, mar sin roghnaigh stampa ama nua in aice leis an seancheann. Theipeann ar an geata an t-athainmniú má athraigh an t-ábhar (tá athrú scéimre fós ag dul in ascnamh nua), nó mura bhfuil spriocchomhad an iontrála ar an diosca.
- **Ná athainmnigh laistigh den stampa ama céanna riamh.** Teipeann an geata ar athainm a choinníonn an stampa ama agus nach n-athraíonn ach an tuairisc, bíodh iontráil nó gan iontráil ann. Le hiontráil arb ionann a `toVersion` agus a `fromVersion`, scriosann an rádala an t-sean tsraith `_omniroute_migrations` agus cuireann sé an comhad i bhfeidhm arís ar gach bunachar sonraí a bhí ar siúl cheana féin. Gan iontráil, ní rianaíonn an rádala ach an leagan: scipeann sé an comhad ar na bunachair shonraí sin (ní ritheann ábhar nua ann riamh) agus logálann sé earráid athuimhrithe ar gach tosaithe. Úsáid stampa ama eile chomh maith le hiontráil chomhoiriúnachta, nó coinnigh an t-ainm.
- **Seiceálann an geata nach ritheann an comhad athainmnithe arís.** I gcás gach athainmnithe clúdaithe, cuireann an geata an t-ainm comhaid nua ar aghaidh chuig an seic comaitéireachta le `--must-not-apply`. Cuireann an seic an bunachar uasghrádaithe leis an bhfíor-rádala, agus má chuireann an rádala an comhad sin i bhfeidhm arís (mar shampla, toisc go bhfuil leagan nó ainm mícheart ar an iontráil, nó toisc go léann parsálaí téacs an gheata `constants.ts` difriúil ó TypeScript), teipeann an geata le `migration renomeada rodaria de novo` agus iarrann sé ort leaganacha agus ainmneacha sean agus nua an iontrála a sheiceáil.

### Cad a Sheiceáil an Geata i gCoinne an Bhunáit

Ar iarratas tarraingt agus ritheann scuaine chumasc, déanann `npm run check:migration-numbering` comparáid idir `src/lib/db/migrations/` ar diosca leis an eolaire céanna ar an mbunbhrainse. Is é an bonn, san ord seo: `--base-latest-tag`, `--base <ref>`, an t-athróg `MIGRATION_BASE_REF`, nó, nuair a bhíonn `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` nó `merge_group`, an chéad tuismitheoir den tiomantas cumaisc, `merge_group.base_sha` pálasta an imeachta, nó `git merge-base HEAD origin/$GITHUB_BASE_REF`. In iarratas tarraingthe nó reáchtáil scuaine chumasc gan aon bhun inréitithe teipeann an geata. Lasmuigh de CI gan `--base` priontaíonn sé `comparação com a base: pulada (sem --base)` agus scipeann sé na rialacha seo.

cuireann `--base-latest-tag` i gcomparáid leis an gclib scaoilte is nuaí (`vX.Y.Z` in ord semver; ní áirítear clibeanna iarmhír amhail oícheanta) atá i stair `HEAD`, leis na rialacha céanna le `--base`. Ritheann Release-Green (`scripts/quality/validate-release-green.mjs`) an geata ar an mbealach seo, toisc nach bhfuil bonn iarratais tarraingthe ag ritheanna brú agus sceidealta agus is féidir le cumasc teacht i dtír gan rith úr CI. Gan aon chlib scaoileadh sa stair theipeann ar an geata; rith `git fetch --tags` (i CI, tugann `actions/checkout` le `fetch-depth: 0` na clibeanna).

| Athrú ar an iarratas tarraingt                                                                               | Toradh                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Athainmnítear comhad atá ar an mbonn, le hiontráil `RENAMED_MIGRATION_COMPATIBILITY`                         | **Rabhadh** má tá an t-ábhar comhionann, agus go ritheann an tseiceáil comaitéireachta is cuma cén stampa ama nua; theipeann air má athraíonn an suíomh nua an scéimre deiridh (cealaigh an t-athainmnigh, nó roghnaigh stampa ama nua eile nuair a bhíonn sé ag taisteal) nó dá gcuirfeadh an reathaí an comhad athainmnithe i bhfeidhm arís ar bhunachar sonraí uasghrádaithe.** Theipeann** má d'athraigh an t-ábhar. |
| Athainmnítear comhad atá ar an mbonn agus a stampa ama á choinneáil (ní athraíonn ach an cur síos)           | **Theipeann** , le hiontráil nó gan é: chuirfeadh an reathaí i bhfeidhm arís é (leis an iontráil) nó scipeáilfeadh sé é trí leagan (gan ceann amháin). Úsáid stampa ama eile chomh maith le hiontráil chomhoiriúnachta, nó coinnigh an t-ainm.                                                                                                                                                                           |
| Scriostar comhad atá ar an mbonn, nó athainmnítear é gan iontráil                                            | **Theipeann** , cibé an bhfuil nó nach bhfuil an comhad i gclib scaoileadh. Chun é a chealú, cuir an comhad ar ais le `git checkout <base> -- src/lib/db/migrations/<file>`; chun a scéimre a chur ar ais, cuir imirce nua leis `DROP ... IF EXISTS`.                                                                                                                                                                    |
| Tá ábhar difriúil ag comhad atá ar an mbonn                                                                  | **Rabhadh** (nótáil `::warning` i nGníomhartha GitHub ), agus ritheann an tseiceáil comaitéireachta. Teipeann air má athraíonn an t-eagar an scéimre deiridh, mar ní chuireann bunachair shonraí uasghrádaithe an comhad atheagraithe i bhfeidhm arís: cuir an t-athrú in ascnamh nua. Ní thugann ach eagarthóireacht neamhdhíobhálach (trácht, `IF NOT EXISTS`) ach rabhadh.                                            |
| Cuirtear comhad le stampa ama leis agus stampa ama nach bhfuil níos nuaí ná an ceann is nuaí ar an mbonn     | Ritheann an seic comaitéireachta, a gcuirtear síos air thíos.                                                                                                                                                                                                                                                                                                                                                            |
| Cuirtear comhad `NNN_` seanfhormáid leis agus uimhir faoi bhun an chomhaid seanfhormáide is nuaí ag an mbonn | **Theipeann** , fiú má tá `KNOWN_GAPS` curtha in eagar san iarratas tarraingt céanna: tá an sean-sraith reoite, cruthaigh an imirce le `npm run db:new-migration`. Glactar le comhaid seanfhormáide os cionn na cinn is nuaí den bhunáit (iarratas ar tharraingt `release/v*` go `main` ).                                                                                                                               |
| Tá ráitis `INSERT`, `UPDATE`, `DELETE` nó `REPLACE` i gcomhad as ord, curtha in eagar nó athainmnithe        | **Rabhadh** : ní dhéanann an tseiceáil comaitéireachta sonraí a chur i gcomparáid, mar sin athbhreithnigh cibé an athraíonn an t-ord ina gcuirtear bunachair shonraí uasghrádaithe agus úra i bhfeidhm an toradh.                                                                                                                                                                                                        |

Clúdaíonn rith amháin den tseiceáil comaitéireachta na comhaid as ord, na comhaid a cuireadh in eagar agus na comhaid athainmnithe le chéile.

Tógann an tseiceáil comaitéireachta (`scripts/check/migration-commutation.ts`) dhá bhunachar sonraí sealadacha leis an bhfíorchosán suiteála: an** uasghrádaithe** ceann amháin (tosaithe leis na bunaistrithe, ansin tosaithe arís ar an gcomhad céanna agus ascnaimh an iarratais tarraingte) agus a** úr** ceann amháin (tosaithe amháin agus ascnaimh an iarratais tarraingte). Déanann sé comparáid idir na scéimeanna a eascraíonn as: táblaí agus colúin (gan aird a thabhairt ar ord na gcolún), srianta UNIQUE / PRIMARY KEY agus FOREIGN KEY, téacs normalaithe `CREATE TABLE` gach tábla (a chlúdaíonn srianta CHECK, comhbhailiúcháin, colúin ghinte agus roghanna tábla), innéacsanna, truicear agus tuairimí. Ní dhéantar comparáid idir sonraí ró. Má mheaitseálann siad, prionnaíonn an geata go bhfuil an comhad as ord ach go n-imoibríonn sé, agus go n-imíonn sé. Má tá difríocht eatarthu, teipeann ar an geata leis an difríocht agus leid ar an gcás: i gcás comhad as-ordú, a athghiniúint a ainm le `npm run db:new-migration`, atá sábháilte toisc nach bhfuil an comhad a chumasc fós; le haghaidh bunchomhad curtha in eagar, cuir an bunábhar ar ais agus cuir an t-athrú ar imirce nua; i gcás comhad athainmnithe, cealaigh an t-athainm nó roghnaigh stampa ama nua eile nuair a bhíonn sé ag comaitéireacht, ná cuir an stampa ama céanna ar a dtugtar ainm eile riamh. Murar féidir leis an tseic féin a rith, teipeann ar an ngeata i CI agus ní thugann sé rabhadh ach go háitiúil. Le haghaidh bunchomhad curtha in eagar, tógtar an bunachar sonraí uasghrádaithe le bunábhar an chomhaid sin, agus scipeann an dara tosaithe é toisc go bhfuil a leagan taifeadta cheana féin. Le haghaidh comhad athainmnithe, tógtar an bunachar sonraí uasghrádaithe leis an gcomhad faoina sheanainm, agus bogann an dara tosaithe a sraith `_omniroute_migrations` tríd an iontráil comhoiriúnachta seachas é a rith arís; Gabhann an geata an t-ainm nua le `--must-not-apply`, mar sin ní theipeann ar an seic má chuireann an dara tosaithe é. Má theipeann ar imirce iarratas tarraingt a chur i bhfeidhm ar an gcosán uasghrádaithe, is é sin, tar éis gach imirce bonn (cibé an dteipeann air freisin ar shuiteáil úr nó nach ea), tuairiscíonn an geata `migration do PR não aplica` agus iarrann ort an SQL a shocrú i gcoinne scéimre reatha an bhoinn; má tá an comhad ag brath ar iarratas tarraingt eile a aistriú le stampa ama níos déanaí, athghin a ainm le `npm run db:new-migration`.

Chun an chomparáid chéanna a reáchtáil go háitiúil, cuir an bonn ar aghaidh go sainráite, mar shampla `npm run check:migration-numbering -- --base origin/<base-branch>`, nó `npm run check:migration-numbering -- --base-latest-tag` chun comparáid a dhéanamh leis an eisiúint is déanaí.

### Imirce Oscailte PR's `NNN` a thiontú

D'fhéadfadh go mbeadh comhad seicheamhach ar nós `242_add_widgets.sql` fós ag gabháil le hiarratas tarraingthe a osclaíodh roimh an lasc. Diúltaítear do sheanuimhreacha os cionn `241`, mar sin déan é a thiontú roimh chumasc:

1. **Athainmnigh an comhad leis an gineadóir, ag coinneáil an tuairisc.** Rith `npm run db:new-migration -- <same description>` chun an t-ainm nua a fháil, bog an SQL isteach ann, agus scrios an seanchomhad `NNN_`. Caithfidh an cur síos fanacht mar a chéile: tá an iontráil chomhoiriúnachta thíos ag teacht leis.
2. **Cuir iontráil comhoiriúnachta leis má rith bunachar sonraí leanúnach an tseanuimhir.** Má reáchtáil aon bhunachar sonraí a choinnítear (homolog, VPS, suiteáil an rannchuiditheora féin) tógáil an PR leis an gcomhad `NNN_`, cuir `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` le `RENAMED_MIGRATION_COMPATIBILITY` i `src/lib/db/migrationRunner/constants.ts`. Tá sé seo** ag teastáil le haghaidh `237` go `241`** : seilbh na sliotán anois ar an canonical `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` agus `241_seen_models.sql`, agus gan an iontráil a leithéid de bhunachar sonraí skips an imirce canonical go deo agus ritheann an chomhshó amháin arís. Oibríonn sé freisin le haghaidh sliotán a fhanann folamh, mar `242`, nuair is stampa ama an ceann scríbe. Nuair a bhíonn amhras ort, cuir an iontráil leis. Nuair a chuireann tú san eagar é: nuair a choinníonn sliotán sprice iontrála fós sraith a bhogann iontráil eile ar shiúl (mar shampla `237` a bhfuil sraith PR aige agus an tsraith `usage_history_calculated_cost` níos sine ag fanacht le bogadh isteach i `237`), ligeann an rádala don iontráil sin fanacht go dtí go mbeidh an sliotán saor in aisce. Ní stopann ach fíorchoimhlint, mar shliotán a choinnítear as a chéile aon iontráil, nó dhá iontráil a mhalartaíonn sliotáin, an tosaithe le `Cannot reconcile ...`.
3. **Coinnigh an SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`) , toisc go bhféadfadh an t-aistriú tiontaithe teacht le chéile le bunachar sonraí ina bhfuil a scéimre ann cheana féin.
4. **Bog cásanna speisialta le heochrach leagan.** Má chuir an PR cás dá sheanuimhir in `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) nó i `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), athraigh an eochair go dtí an stampa ama nua.

Is sampla oibre é `tests/unit/db/codex-fence-migration-rename.test.ts` de thástáil le haghaidh imirce athainmnithe.

### Tacaíochtaí do Chraobhacha Roimh an Athrú

Ná roghnaigh comhad `YYYYMMDDHHMMSS_` ná silín ná tabhair thar n-ais chuig brainse a tháinig roimh an lasc (mar shampla brainse `release/v*` níos sine). Déanann an reathaí ansin ainmneacha comhaid a shórtáil mar théacs, mar sin rithfeadh comhad le stampa ama idir `201_` agus `202_` ar bhunachar sonraí úr, agus ní thuigeann an sean-gheata ansin réimírí 14 dhigit. Ar bhrainse den sórt sin, scríobh an t-athrú mar an chéad chomhad `NNN_` eile de chuid an bhrainse sin féin, idempotent, agus mar sin ní haon op é nuair a thagann an leagan le stampa ama níos déanaí.

### Conas a Ritheann Imirce

Ag am tosaithe, `migrationRunner.ts`:

1. Cruthaíonn tábla `_omniroute_migrations` mura bhfuil sé ann
2. Ceisteanna maidir le himscrúduithe a cuireadh i bhfeidhm cheana féin
3. Cuirtear aon aistrithe nua i bhfeidhm in ord, gach ceann acu in idirbheart
4. Taifeadtar gach ascnamh feidhmeach le stampa ama

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

### Neamhláithreacht

Ní mór imirceacha** díomhaoin** ba cheart go mbeadh — á rith faoi dhó ina rogha neamhfhabhrach:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Úsáid clásail `IF NOT EXISTS`, `IF EXISTS`, agus `OR IGNORE` / `OR REPLACE` go liobrálach.

### Imirce Nua a Chur Leis

1. **Cruthaigh an comhad leis an gineadóir** : `npm run db:new-migration -- <description>` (mar shampla `npm run db:new-migration -- add combo priority`). Scríobhann sé `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` leis an am UTC reatha agus ceanntásc nóta tráchta, bogtar ar aghaidh soicind amháin má ghlactar leis an stampa ama sin, agus ní fhorscríobhtar comhad riamh. Ná roghnaigh uimhir de láimh.
2. **Bain úsáid DDL sábháilte** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Sonraí aislíonta go cúramach** : bain úsáid as `UPDATE ... WHERE ...` chun na sraitheanna atá ann cheana a láimhseáil
4. **Seiceáil ordú agus ainmniú** : `npm run test:migrations:fresh` (gach ascnamh ar bhunachar sonraí folamh) agus `npm run check:migration-numbering`
5. **Tástáil ar chóip** : níor rith riamh ascnaimh neamhthástála ar tháirgeadh
6. **Teastaíonn aistriú freisin ó thábla a chruthaítear ó chód** : má chruthaíonn modúl freisin an tábla leisciúil (`CREATE TABLE IF NOT EXISTS`, coinnithe mar chonair féin-leigheas), caithfidh imirce é a chruthú leis an DDL céanna . Seachas sin, críochnóidh suiteáil ghlan agus suiteáil uasghrádaithe le scéimeanna éagsúla, ag brath ar cé acu an raibh cosán an chóid sin ar siúl. Déanann `tests/unit/db/lazy-table-migration-guard.test.ts` scanadh `src/` agus `open-sse/` agus teipeann ar `CREATE` leisciúil gan ascnamh (#20557). Sampla: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Sampla:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Athruithe ar gcúl-neamh-chomhoiriúnach** (m.sh., titim colúin) fánach. tacaíonn OmniRoute le NOT íosghrádú — nuair a chuirtear imirce i bhfeidhm, tá an t-athrú scéimre buan. Pleanáil dá réir.

---

## Criptiú Sonraí ar Diosca

Déantar réimsí íogaire (eochracha API, comharthaí OAuth, teaghráin cheangail) a chriptiú ar diosca le **AES-256-GCM**.

### Conas a Oibríonn Sé

```ts
// src/lib/db/encryption.ts (simplithe)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### An Áit a nÚsáidtear É

- `provider_connections.api_key` — criptithe ag leibhéal an fheidhmchláir
- `provider_connections.access_token`, `refresh_token`, `id_token` — criptithe ag leibhéal an fheidhmchláir
- Iontrálacha `key_value` ina bhfuil `namespace = "secrets"` — criptithe ag leibhéal an fheidhmchláir
- `proxy_registry.auth` — criptithe ag leibhéal an fheidhmchláir (má tá sé ann)

### Eochair Chriptithe

Díorthaítear an eochair chriptithe ó **phasfhrása** (socraithe tríd an athróg timpeallachta `STORAGE_ENCRYPTION_KEY`) agus ó **shalann** (stóráilte sa bhunachar sonraí). Tá an dá cheann riachtanach chun na sonraí a dhíchriptiú.

```bash
# Gin pasfhrása slán
openssl rand -hex 32

# Socraigh in .env
STORAGE_ENCRYPTION_KEY=<d'eochair>
```

> **Ríthábhachtach**: Má chailltear an eochair chriptithe, caillfear rochtain ar na sonraí criptithe go léir. **Déan cóip chúltaca den eochair ar leithligh ón mbunachar sonraí**.

### Na Rudaí NACH bhfuil Criptithe

Ar chúiseanna feidhmíochta, stóráiltear na nithe seo a leanas mar ghnáth-théacs:

- Ainmneacha taispeána soláthraithe
- Sainmhínithe samhlacha (poiblí cheana)
- Rialacha ródúcháin
- Taifid úsáide (gan PII)

---

## Forchoimeádais maidir le Criptiú (v3.8.16+)

Úsáideann OmniRoute **`migrateLegacyEncryptedString()`** chun dhá scéim chriptithe a láimhseáil go trédhearcach:

- **Oidhreachta** (roimh v3.5.0): "criptiú" bunaithe ar XOR (ní fíorchripteagrafaíocht é)
- **Reatha**: AES-256-GCM le IV ceart agus clib fíordheimhnithe

Aimsíonn an cúntóir imirce an fhormáid oidhreachta agus athchriptíonn sé í leis an scéim nua ar an gcéad léamh. Ciallaíonn sé seo gur féidir leat seanbhunachar sonraí a uasghrádú gan dintiúir a chailleadh.

---

## Taisce Léite

I gcás sonraí a léitear go minic (samhlacha, soláthraithe, socruithe), soláthraíonn `readCache.ts` **taisce sa chuimhne**:

```ts
// Taiscthe ag am tosaithe, neamhbhailíochtaithe nuair a scríobhtar
const providers = await getCachedProviders(); // Tapa, sa chuimhne
const fresh = await listProviders(); // Mall, téann chuig an mbunachar sonraí
```

| Aonán taiscthe         | Eochair thaisce | TTL                  |
| ---------------------- | --------------- | -------------------- |
| `models`               | `models:v1`     | Go dtí go scríobhtar |
| `provider_connections` | `providers:v1`  | Go dtí go scríobhtar |
| `settings`             | `settings:v1`   | Go dtí go scríobhtar |
| `combos`               | `combos:v1`     | Go dtí go scríobhtar |

Déantar an taisce a neamhbhailíochtú gach uair a scríobhtar sa tábla comhfhreagrach.

---

## Cúltaca agus Aisghabháil

### Cúltaca de Láimh

```bash
# Úsáid an CLI chun cúltaca áitiúil a chruthú
omniroute backup create --name pre-migration

# Nó tríd an API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Áirítear sa chomhad cúltaca:

- Gach tábla sa bhunachar sonraí (srathaithe go JSON)
- Déantáin loga glaonna (ionchódaithe le base64, roghnach)
- Socruithe + rúin (criptithe)
- Cumraíocht breiseán

### Athchóiriú

```bash
# Tríd an CLI
omniroute restore pre-migration

# Tríd an API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Rabhadh**: Forscríobhann an t-athchóiriú an bunachar sonraí iomlán. Stop gach cliant ar dtús.

### Cúltacaí Uathoibrithe

```bash
# Cumasaigh cúltacaí laethúla uathoibrithe tríd an CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ritheann jab cúlra an sceideal ar thaobh an fhreastalaí gach 30 soicind
(de réir réamhshocraithe) agus déanann sé an slonn cron a mheas de réir am áitiúil an fhreastalaí.

| Athróg                                      | Réamhshocrú | Cur síos                                                                                                                                                |
| ------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | Eatramh ticeáilte ina ms (`5000` ar a laghad). Caithfidh sé a bheith níos giorra ná 60 s chun teacht go hiontaofa laistigh den nóiméad cron meaitseála. |

### Cúltaca Beo SQLite

Chun cúltaca a dhéanamh de bhunachar sonraí beo gan aga neamhfhónaimh:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Úsáideann sé seo API cúltaca ar líne SQLite — tá sé sábháilte é a rith agus OmniRoute ar siúl.

---

## Tiúnadh Feidhmíochta

### Mód WAL

Tá WAL cumasaithe de réir réamhshocraithe. Le haghaidh ualaí oibre ardscríofa, smaoinigh ar:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

Ní shocraíonn OmniRoute `journal_size_limit`. Bogann seicphointe frámaí WAL isteach sa phríomhchomhad, ach coinníonn an comhad WAL an méid leithdháilte is mó. Ní thugann an garda `OMNIROUTE_WAL_GUARD_MAX_MB` ach rabhadh agus ritheann `wal_checkpoint(RESTART)`; ní caipín méid diosca é.

### Innéacsanna

Príomhinnéacsanna feidhmíochta (uathchruthaithe ag aistrithe):

- cuardaigh samhail `idx_models_provider` — ag soláthraí
- leathnú sprice teaglama `idx_combo_targets_combo_id` —
- anailísíocht úsáide `idx_usage_history_api_key_timestamp` —
- rianú cuóta `idx_quota_snapshots_api_key_window` —
- fiosrúcháin logáil glaonna `idx_call_logs_timestamp` —

Chun innéacs nua a chur leis, cruthaigh ascnamh:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Cuimhne-Mapáilte I/O

I gcás bunachair shonraí an-mhór (> 10GB), is féidir mapáil chuimhne a choigeartú trí SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Comhdhlúthú

Baineann cásanna fadtéarmacha OmniRoute leas as uaireanta `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Rith go míosúil le linn fuinneoga tráchta íseal. (Laghdaíonn modh WAL an gá, ach ní chuireann sé deireadh leis.)

---

## Seiceáil Sláinte

Soláthraíonn `src/lib/db/healthCheck.ts` **diagnóisic sláinte ar leibhéal an bhunachair sonraí**:

Teastaíonn fíordheimhniú ón dá bhriathar (`401` murach sin). Ní dhéanann `GET` ach diagnóis; ritheann `POST` an tseiceáil chéanna agus `autoRepair` cumasaithe.

```bash
GET  /api/db/health   # diagnóisigh
POST /api/db/health   # diagnóisigh + deisigh
```

Is é an freagra an `DbHealthCheckResult` a tháirgeann `runDbHealthCheck()`
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

| Réimse            | Brí                                                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` nuair atá `issues` folamh. Ní bhíonn tionchar ag `driver` air riamh.                                                                                                   |
| `issues[].type`   | Ceann amháin de `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                              |
| `repairedCount`   | Rónna a deisíodh le linn an rite seo; `0` i gcónaí nuair atá `autoRepair` bréagach.                                                                                           |
| `backupCreated`   | Ar cruthaíodh cúltaca roimh an deisiú.                                                                                                                                        |
| `checkedAt`       | Stampa ama ISO atá comhroinnte ag an rith agus ag aon nóta deisiúcháin a scríobhann sé.                                                                                       |
| `driver.name`     | An tiománaí SQLite a fhreastalaíonn ar an mbunachar sonraí a seiceáladh.                                                                                                      |
| `driver.degraded` | `true` nuair nach bhfuil scríbhinní tacaithe go buan ag comhad an bhunachair sonraí — cúltaca WASM `sql.js` (marthanacht an chomhaid iomláin) nó bunachar sonraí sa chuimhne. |

Tugann uirlis MCP `omniroute_db_health_check` an pálasta céanna ar ais.

Rith `PRAGMA integrity_check` chun éilliú a bhrath:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ba cheart dó seo a phriontáil: ok
```

Má thugann sé aon rud seachas `ok` ar ais, **stop den bhunachar sonraí a úsáid láithreach** agus aisghabh ó chúltaca é.

---

## Athshlánú ó Thubaiste

### Cás 1: Comhad WAL Caillte

Tá an comhad `-wal` ar iarraidh ach tá `-shm` agus an príomhbhunachar sonraí slán:

```bash
# Athshlánaítear go huathoibríoch é an chéad uair eile a osclaítear é
omniroute
```

Mura féidir le SQLite athshlánú go huathoibríoch:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Cás 2: Príomhchomhad an Bhunachair Sonraí Truaillithe

Athchóirigh ó chúltaca:

```bash
omniroute backup restore <backup-id>
```

Ní dhéanann `omniroute sync pull [outPath]` ach cartlann iomlán `.tar.gz` a íoslódáil ó fhreastalaí atá ag rith
(`GET /api/db-backups/exportAll`, dintiúr oibreora de dhíth); ní dhéanann sé aon rud a athchóiriú.

### Cás 3: Eochair Chriptithe Caillte

**Ní féidir athshlánú a dhéanamh** gan an eochair. Ní féidir na réimsí criptithe a léamh. Cuir gach soláthraí leis arís de láimh le dintiúir nua.

> **Maolú**: Déan cúltaca den eochair chriptithe ar leithligh i gcónaí, i mbainisteoir focal faire nó in KMS más féidir.

### Cás 4: Diosca Lán

Tabharfaidh SQLite earráidí `SQLITE_FULL` ar ais. Saor spás diosca, ansin:

```bash
# Déan seicphointe ar WAL chun spás a shaoradh
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Oibríochtaí Coitianta

### Iniúchadh ar Thábla

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Líon na Rónna i ngach Tábla

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Athshocrú (Glanadh) na Sonraí Uile

```bash
# Stop OmniRoute ar dtús
omniroute stop

# Scrios an comhad DB
rm ~/.omniroute/storage.sqlite*

# Atosaigh (athchruthófar DB folamh)
omniroute
```

Le haghaidh athshocrú **roghnach** (coinnigh soláthraithe, glan úsáid):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Easpórtáil Tábla Aonair

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Fabhtcheartú

### "Tá an bunachar sonraí glasáilte"

Tá glas scríofa á choinneáil ag próiseas eile. Déan ceann díobh seo:

- Fan go gcríochnóidh an próiseas eile (seiceáil `lsof | grep storage.sqlite`)
- Cuir deireadh leis an bpróiseas eile
- Má mhaireann an fhadhb, atosaigh OmniRoute

### "Theip ar shrian na heochrach coigríche"

Tá modúl fearainn ag sárú sláine thagartha. Seiceáil:

- Rónna dílleachtacha i dtáblaí spleácha
- Scriosanna cascáideacha nár forleathnaíodh
- Ascnamh le déanaí a d'athraigh eochair choigríche

Rith `PRAGMA foreign_key_check;` chun sáruithe a aimsiú.

### "Cuimhne ídithe"

Tá I/A cuimhne-mhapáilte SQLite ag dul thar theorainn an chórais oibriúcháin. Laghdaigh í trí pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB in ionad 256MB
```

Nó díchumasaigh í:

```sql
PRAGMA mmap_size = 0;
```

### "Theip ar an ascnamh leath bealaigh tríd"

Rith an t-ascnamh in idirbheart, mar sin ba cheart gur rolladh siar é. Murar rolladh:

1. **Stop OmniRoute** (cuir cosc ar iarrachtaí breise)
2. **Seiceáil staid an DB** le `sqlite3`
3. **Deisigh de láimh** an t-ascnamh páirteach
4. **Rith OmniRoute arís** (bainfear triail eile as an ascnamh)

Chun é seo a chosc, déan ascnaimh a thástáil ar chóip ar dtús i gcónaí.

---

## Féach Freisin

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — táblaí úsáide
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monatóireacht sláinte
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — sreabhadh eisiúna
- Foinse: `src/lib/db/` (80+ comhad, ~25K líne chóid)
