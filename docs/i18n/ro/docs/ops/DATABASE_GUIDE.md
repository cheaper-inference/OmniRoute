# Database Schema & Operations Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Pe scurt**: OmniRoute utilizează **SQLite cu jurnalizare WAL** ca stocare principală, cu criptare **AES-256-GCM** pentru datele sensibile stocate. Acest ghid prezintă schema, migrările, copierea de siguranță/recuperarea și procedurile operaționale.

**Surse:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabele de bază)
- `src/lib/db/migrationRunner.ts` — migrări cu versiuni
- `src/lib/db/migrations/` — 167 de fișiere SQL cu versiuni
- `src/lib/db/encryption.ts` — funcții auxiliare pentru criptare
- `src/lib/db/backup.ts` — exportul/importul copiilor de siguranță
- `src/lib/db/healthCheck.ts` — diagnosticarea stării de funcționare

---

## De ce SQLite?

OmniRoute a ales SQLite în locul PostgreSQL/MySQL din mai multe motive:

| Factor                 | SQLite                                | PostgreSQL                                         |
| ---------------------- | ------------------------------------- | -------------------------------------------------- |
| **Implementare**       | Încorporat — fără server separat      | Necesită configurarea unui server                  |
| **Criptare**           | La nivelul aplicației (AES-256-GCM)   | TDE încorporat                                     |
| **Performanță**        | Mai rapid pentru sarcini mici/medii   | Mai bun pentru un volum mare de scrieri simultane  |
| **Concurență**         | Modul WAL permite citiri simultane    | MVCC complet                                       |
| **Copie de siguranță** | Copierea unui singur fișier           | `pg_dump` sau instantaneu al sistemului de fișiere |
| **Caz de utilizare**   | Instalare per utilizator, încorporată | SaaS multi-chiriaș                                 |

Pentru implementările cu **un singur utilizator și o singură instanță** (principalul caz de utilizare OmniRoute), SQLite este mai simplu și mai rapid.

### Jurnalizare WAL

`core.ts` deschide baza de date în **modul WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL permite **citiri simultane** în timpul scrierilor — un aspect important pentru panoul de control, care execută interogări în timp ce solicitările sunt înregistrate.

Dimensiunea implicită a memoriei cache este de **65.536 KiB (64 MiB)**. SQLite interpretează o valoare negativă pentru
`cache_size` drept o limită superioară aproximativă în KiB și alocă pagini la cerere.
**Setări > Sistem și stocare > Dimensiunea memoriei cache** acceptă valori întregi de la **1 la
1.000.000 KiB**; salvarea setării o aplică conexiunii active la baza de date,
iar OmniRoute restabilește valoarea persistentă la pornire.

---

## Locația bazei de date

Fișierul SQLite este stocat la:

| Sistem de operare | Cale                                                       |
| ----------------- | ---------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                              |
| macOS             | `~/.omniroute/storage.sqlite`                              |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                  |
| Docker            | `/app/data/storage.sqlite` (configurabilă prin `DATA_DIR`) |

Fișiere și directoare asociate:

- `storage.sqlite-wal` — jurnal de scriere anticipată
- `storage.sqlite-shm` — fișier de memorie partajată
- `call_logs/` — artefacte ale sarcinilor utile ale solicitărilor (dacă opțiunea este activată)

**Suprascrieți locația:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitectura modulelor de domeniu

Baza de date OmniRoute are **110 module TypeScript de nivel superior** în `src/lib/db/`. Fiecare modul de domeniu:

- Deține unul sau mai multe tabele specifice
- Exportă funcții CRUD tipizate
- Nu accesează niciodată tabelele altui modul
- Utilizează `getDbInstance()` din `core.ts` pentru a accesa baza de date

### Cele 110 module DB de nivel superior

OmniRoute are **110 fișiere TypeScript de nivel superior** în `src/lib/db/`. Mai jos este o selecție de module de bază; consultați listarea directorului pentru lista completă:

| Modul                   | Tabele                                                         | Responsabilitate                                                                                  |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Înregistrarea furnizorilor prin OAuth/chei API și gestionarea acreditărilor                       |
| `models.ts`             | `key_value` (date despre modele)                               | Definiții, capabilități și prețuri ale modelelor                                                  |
| `combos.ts`             | `combos`                                                       | Configurații de rutare pentru combinații și ordonarea acestora                                    |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclul de viață al cheilor API, domenii de acces și urmărirea cotelor                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configurarea sistemului și stocarea KV partajată                                                  |
| `backup.ts`             | —                                                              | Operațiuni de export/import al copiilor de siguranță                                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurații proxy și reguli de rutare                                                            |
| `prompts.ts`            | `prompt_templates`                                             | Șabloane reutilizabile de prompturi și gestionarea versiunilor                                    |
| `webhooks.ts`           | `webhooks`                                                     | Abonamente webhook bazate pe evenimente și jurnale                                                |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Jurnalizare de audit pentru fiecare solicitare (opțională, volum ridicat)                         |
| `domainState.ts`        | `domain_*` (5 tabele)                                          | Bugete de domeniu, întrerupătoare de circuit, blocări, lanțuri de rezervă și istoricul costurilor |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chei API din lista permisă pentru MCP/A2A                                                         |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Istoricul utilizării cotelor                                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Asocierea modelelor cu combinațiile implicite                                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | Stare persistentă specifică CLI                                                                   |
| `encryption.ts`         | —                                                              | Funcții auxiliare pentru criptarea/decriptarea câmpurilor                                         |
| `readCache.ts`          | —                                                              | Cache în memorie pentru operațiunile cu citire intensivă                                          |
| `secrets.ts`            | `key_value` (intrări criptate)                                 | Stocarea criptată a secretelor                                                                    |
| `stateReset.ts`         | —                                                              | Ștergerea/resetarea stării bazei de date pentru testare                                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contextul sesiunii pentru transferul între agenți                                                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Urmărirea utilizării                                                                              |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configurarea compresiei                                                                           |

### Limitele modulelor

O regulă arhitecturală esențială: **modulele nu accesează direct tabelele altor module**. Pentru a lucra cu datele altui modul, importați funcția din modulul respectiv.

```ts
// ❌ GREȘIT: SQL direct dintr-un alt modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORECT: utilizați funcția modulului providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Această regulă este aplicată prin revizuirea codului — nu există nicio verificare statică, dar încălcările sunt semnalate.

---

## Schema de bază (17 tabele)

`core.ts` definește cele 17 tabele de bază în `SCHEMA_SQL`. Acestea sunt create de migrarea `001_initial_schema.sql` și formează schema principală.

### Tabele principale (create în migrarea inițială)

| Tabel                      | Scop                                          | Coloane-cheie                                                           |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credențiale ale furnizorilor (criptate)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informații de rutare pentru nodul furnizor    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Depozit KV general                            | `namespace`, `key`, `value`                                             |
| `combos`                   | Definiții ale combinațiilor de rutare         | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chei API pentru gateway                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadatele bazei de date                      | `key`, `value`                                                          |
| `usage_history`            | Înregistrări privind utilizarea solicitărilor | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Sarcinile utile și răspunsurile solicitărilor | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Jurnalele solicitărilor proxy                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Lanțuri model-furnizor                        | `model`, `chain`                                                        |
| `domain_budgets`           | Bugete de cheltuieli per domeniu              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Istoricul resetărilor de buget                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Urmărirea costurilor per domeniu              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Starea limitării ratei per domeniu            | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Starea disjunctorului per domeniu             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache pentru răspunsurile LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantanee istorice ale cotelor              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabele suplimentare (adăugate prin migrări ulterioare)

Migrările ulterioare adaugă tabele precum:

- `cli_tool_state` (migrarea 011) — starea instrumentului CLI
- Tabele `mcp_*` — auditul serverului MCP
- Tabele `a2a_*` — starea sarcinilor A2A
- Tabele `usage_*` — urmărirea utilizării
- Tabele `plugin_*` — sistemul de pluginuri
- `skill_executions` — istoricul execuțiilor abilităților
- Tabele `memory_*` — sistemul de memorie
- Tabele `compression_*` — sistemul de compresie
- Tabele `webhook_*` — jurnalul livrărilor webhook
- Tabele `acp_*` — Agent Client Protocol
- Tabele `oneproxy_*` — marketplace-ul 1proxy
- `proxy_assignments` — asocieri ale domeniului de aplicare pentru proxy
- `detailed_call_artifacts` — metadatele artefactelor din jurnalele apelurilor
- `quota_alert_history` — auditul alertelor privind cotele
- `command_code_auth_sessions` — sesiuni OAuth Command Code

Lista completă de peste 30 de tabele se află în `src/lib/db/migrations/`.

---

## Migrații

OmniRoute folosește** migrari versionate, idempotente** în `src/lib/db/migrations/`. Fiecare migrare este un singur fișier SQL. Două formate de denumire coexistă; versiunea înregistrată în `_omniroute_migrations` este prefixul numeric.

### Denumirea migrației

| Format                                           | Exemplu                              | Folosit pentru                                                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (exact 3 cifre)            | `241_seen_models.sql`                | Vechea serie `001`–`241`. Înghețat când a aterizat formatul de marcaj temporal (`240` și `241` au fost îmbinate chiar înainte de acesta): niciun fișier nou nu primește un număr secvenţial. |
| `YYYYMMDDHHMMSS_description.sql` (14 cifre, UTC) | `20261113120000_add_usage_index.sql` | Fiecare migrație creată începând cu 2026-11-13.                                                                                                                                              |

De ce schimbarea: cu numere secvențiale, paralel PRs a ales același număr următor și toți, mai puțin unul, au trebuit să renumeroteze înainte de a fuziona. Un marcaj de timp UTC oferă fiecărui PR propria versiune.

Reguli pentru formatul de marcaj temporal (aplicat de `npm run check:migration-numbering`, partajat cu generatorul în `scripts/check/lib/migrationNaming.mjs`):

- Marca temporală este o dată și o oră UTC reale, nu mai devreme decât `20261113000000` și nu mai mult de 10 minute în viitor.
- Descrierea este `snake_case` minusculă care începe cu o literă (`a-z`, `0-9`, un singur `_` între cuvinte), cel mult 80 de caractere.
- Două fișiere cu același marcaj temporal sunt duplicate.
- Regula fără decalaj se aplică numai seriilor vechi: trebuie să existe fiecare număr de la `001` la `241`, cu excepția golurilor cunoscute `026`, `055` și `121`. Ștergerea `241` (sau a oricărui fișier vechi) eșuează. `001` și `241` nu pot fi adăugate niciodată la lista de permisiuni `KNOWN_GAPS`. Fișierele marcate de timp nu creează niciodată un gol.
- Fiecare intrare din `src/lib/db/migrations/` trebuie să fie un fișier obișnuit cu un nume `.sql` valid cu minuscule. Un director, un link simbolic, un fișier `.SQL` sau `.sql.bak`, un fișier ascuns sau un nume cu un spațiu eșuează poarta, pentru că alergătorul ar sări peste el în tăcere sau se prăbușește la pornire.

**Aplicați comanda.** Runnerul sortează după valoarea numerică a prefixului, nu după text: mai întâi fișierele vechi `001`–`241`, apoi fișierele marcate de timp în ordinea marcajului de timp, apoi orice directoare cu spații de nume înregistrate cu `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versiuni precum `ee-001`). O migrare în așteptare este orice fișier a cărui versiune nu este în `_omniroute_migrations`, deci o migrare dintr-o ramură mai veche care fuzionează după una mai nouă se aplică în continuare bazelor de date existente.

**Marca temporală este ordinea de creare, nu ordinea de îmbinare.** Dacă migrarea dvs. depinde de un tabel sau de o coloană creată de o migrare cu a** mai nou** timestamp (de exemplu, unul de la un alt PR care a fuzionat primul), o bază de date proaspătă ar rula prima a ta și ar eșua. În timp ce PR dvs. este încă deschis, regenerați numele fișierului cu `npm run db:new-migration` astfel încât să primească un marcaj de timp mai nou sau să îl faceți independent. `npm run test:migrations:fresh` aplică fiecare migrare la o bază de date goală și prinde acest lucru.

### O migrare îmbinată nu este niciodată ștearsă sau redenumită

Odată ce un fișier de migrare se află pe o ramură de lansare sau `main`, acesta a rulat deja pe baze de date de omologi și dezvoltatori, pe instalări VPS și în sincronizarea Enterprise. De atunci înainte:

- **Nu-l șterge niciodată.** Instalările noi și-ar pierde schema în timp ce bazele de date actualizate o păstrează.
- **Nu-l redenumi niciodată.** Versiunea din `_omniroute_migrations` nu s-ar mai potrivi cu un fișier, așa că fiecare bază de date care a aplicat-o deja o va rula din nou. SQL non-idempotent duplică apoi datele sau oprește pornirea.
- **Ai nevoie de o schemă diferită?** Creați o nouă migrare cu `npm run db:new-migration`.

Redenumirea este sigură numai pentru un fișier care nu este încă îmbinat, la care se referă indicațiile porții. O etichetă de lansare nu schimbă nimic aici: fiecare apăsare către o ramură `release/v*` publică imaginea Docker `:next` și rulează pe omolog, instalări VPS și sincronizare Enterprise, așa că o migrare îmbinată a rulat pe baze de date reale înainte de a exista orice etichetă `vX.Y.Z`. Poarta eșuează la fiecare ștergere a unui fișier de bază, etichetat sau nu.

- **Revenire la o migrare îmbinată.** Un `git revert` care șterge fișierul eșuează. Păstrați fișierul și anulați schema într-o nouă migrare: `npm run db:new-migration -- <description>`, cu `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` și așa mai departe. Bazele de date actualizate și proaspete se termină apoi cu aceeași schemă.
- **Redenumirea cea acceptată: o intrare de compatibilitate și conținut identic.** Dacă un fișier îmbinat trebuie să se mute (de exemplu, două fișiere îmbinate partajează un marcaj de timp, iar runner-ul se oprește cu o coliziune de versiune), redenumiți-l pe cel mai târziu fără a-l atinge SQL și adăugați `{ fromVersion, fromName, toVersion, toName }` la `RENAMED_MIGRATION_COMPATIBILITY` în `src/lib/db/migrationRunner/constants.ts`. Bazele de date care au aplicat versiunea veche își mută rândul `_omniroute_migrations` în loc să ruleze din nou fișierul. Poarta avertizează despre o astfel de redenumire și rulează întotdeauna verificarea comutării pe ea, indiferent de noua marca temporală: instalările proaspete aplică fișierul în noua sa poziție, bazele de date actualizate nu, așa că alegeți un nou marcaj temporal lângă cel vechi. Poarta nu reușește redenumirea dacă conținutul s-a schimbat (o schimbare de schemă are loc în continuare într-o nouă migrare) sau dacă fișierul țintă al intrării nu este pe disc.
- **Nu redenumiți niciodată în același timp și marcaj.** O redenumire care păstrează marca temporală și schimbă doar descrierea eșuează la poartă, cu sau fără o intrare. Cu o intrare a cărei `toVersion` este egală cu `fromVersion`, runnerul șterge vechiul rând `_omniroute_migrations` și aplică fișierul din nou pe fiecare bază de date care a rulat-o deja. Fără o intrare, alergătorul urmărește doar versiunea: omite fișierul din acele baze de date (conținut nou nu rulează niciodată acolo) și înregistrează o eroare de renumerotare la fiecare pornire. Utilizați un alt marcaj temporal plus o intrare de compatibilitate sau păstrați numele.
- **Poarta verifică dacă fișierul redenumit nu rulează din nou.** Pentru fiecare redenumire acoperită, poarta trece noul nume de fișier la verificarea comutației cu `--must-not-apply`. Verificarea pornește baza de date actualizată cu runnerul real, iar dacă runnerul aplică din nou acel fișier (de exemplu, pentru că intrarea are o versiune sau un nume greșit sau pentru că parserul de text al porții citește `constants.ts` diferit de TypeScript), poarta eșuează cu `migration renomeada rodaria de novo` și vă cere să verificați versiunile și numele vechi și noi ale intrării.

### Ce verifică poarta împotriva bazei

La rulările pull request și merge-queue, `npm run check:migration-numbering` compară `src/lib/db/migrations/` de pe disc cu același director de pe ramura de bază. Baza este, în această ordine: `--base-latest-tag`, `--base <ref>`, variabila `MIGRATION_BASE_REF` sau, când `GITHUB_EVENT_NAME` este `pull_request`, `pull_request_target` sau `merge_group`, primul părinte al comiterii de îmbinare, `merge_group.base_sha` al sarcinii utile de eveniment sau `git merge-base HEAD origin/$GITHUB_BASE_REF`. Într-o cerere de extragere sau rulare în coadă de îmbinare fără o bază rezolvabilă, poarta eșuează. În afara CI fără `--base`, imprimă `comparação com a base: pulada (sem --base)` și omite aceste reguli.

`--base-latest-tag` se compară cu cea mai nouă etichetă de lansare (`vX.Y.Z` în ordinea semver; etichetele sufixate, cum ar fi nightlies, nu contează) care se află în istoria `HEAD`, cu aceleași reguli ca `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) rulează poarta în acest fel, deoarece rulările push și programate nu au o bază de solicitare pull și o îmbinare poate ajunge fără o nouă rulare CI. Fără nicio etichetă de eliberare în istorie, poarta eșuează; rulați `git fetch --tags` (în CI, `actions/checkout` cu `fetch-depth: 0` aduce etichetele).

| Modificare la cererea de tragere                                                                           | Rezultat                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Un fișier care există pe bază este redenumit, cu o intrare `RENAMED_MIGRATION_COMPATIBILITY`               | **Avertizare** dacă conținutul este identic, iar verificarea de comutare se execută indiferent de noul timestamp; nu reușește dacă noua poziție modifică schema finală (anulați redenumirea sau alegeți un alt nou marcaj temporal în care face naveta) sau dacă alergătorul ar aplica fișierul redenumit din nou pe o bază de date actualizată.** Eșuează** dacă conținutul s-a schimbat. |
| Un fișier care există pe bază este redenumit păstrându-și marca temporală (se schimbă doar descrierea)     | **Eșuează** , cu sau fără o intrare: alergătorul l-ar aplica din nou (cu intrarea) sau o sări peste versiune (fără una). Utilizați un alt marcaj temporal plus o intrare de compatibilitate sau păstrați numele.                                                                                                                                                                           |
| Un fișier care există pe bază este șters sau redenumit fără o intrare                                      | **Eșuează** , indiferent dacă fișierul se află sau nu într-o etichetă de lansare. Pentru a o anula, restaurați fișierul cu `git checkout <base> -- src/lib/db/migrations/<file>`; pentru a-și reveni schema, adăugați o nouă migrare cu `DROP ... IF EXISTS`.                                                                                                                              |
| Un fișier care există pe bază are conținut diferit                                                         | **Avertizare** (o adnotare `::warning` în Acțiuni GitHub ), iar verificarea comutației rulează. Eșuează dacă editarea modifică schema finală, deoarece bazele de date actualizate nu aplică din nou fișierul editat: puneți modificarea într-o nouă migrare. O editare inofensivă (un comentariu, `IF NOT EXISTS`) doar avertizează.                                                       |
| Se adaugă un fișier marcat de timp cu un marcaj de timp nu mai nou decât cel mai nou al bazei              | Execută verificarea comutării, descrisă mai jos.                                                                                                                                                                                                                                                                                                                                           |
| Un fișier `NNN_` în format vechi este adăugat cu un număr sub cel mai nou fișier în format vechi al bazei  | **Eșuează** , chiar dacă `KNOWN_GAPS` este editat în aceeași cerere de extragere: seria veche este înghețată, creați migrarea cu `npm run db:new-migration`. Fișierele în format vechi de deasupra celui mai nou al bazei (o cerere de extragere `release/v*` la `main` ) sunt acceptate.                                                                                                  |
| Un fișier necomandat, editat sau redenumit conține instrucțiuni `INSERT`, `UPDATE`, `DELETE` sau `REPLACE` | **Avertizare** : verificarea comutării nu compară datele, deci verificați dacă ordinea în care se aplică bazele de date actualizate și proaspete modifică rezultatul.                                                                                                                                                                                                                      |

O execuție a verificării de comutare acoperă împreună fișierele neregulate, editate și redenumite.

Verificarea comutației (`scripts/check/migration-commutation.ts`) construiește două baze de date temporare cu calea reală de instalare: a** actualizat** unul (porniți cu migrațiile de bază, apoi porniți din nou pe același fișier cu migrațiile cererii de extragere) și un** proaspăt** unul (un boot cu migrarea cererii de extragere). Se compară schemele rezultate: tabele și coloanele (ignorând ordinea coloanelor), constrângerile UNIQUE / PRIMARY KEY și FOREIGN KEY, textul `CREATE TABLE` normalizat al fiecărui tabel (care acoperă constrângerile CHECK, colațiile, coloanele generate și opțiunile de tabel), indici, declanșatoare și vizualizări. Datele de rând nu sunt comparate. Dacă se potrivesc, poarta afișează că fișierul nu este în ordine, dar face naveta și trece. Dacă diferă, poarta eșuează cu diferența și un indiciu pentru caz: pentru un fișier necomandat, regenerează-i numele cu `npm run db:new-migration`, ceea ce este sigur deoarece fișierul nu este încă îmbinat; pentru un fișier de bază editat, restaurați conținutul de bază și puneți modificarea într-o nouă migrare; pentru un fișier redenumit, anulați redenumirea sau alegeți un alt nou marcaj de timp în care comută, niciodată același marcaj de timp cu alt nume. Dacă verificarea în sine nu poate rula, poarta eșuează în CI și avertizează doar local. Pentru un fișier de bază editat, baza de date actualizată este construită cu conținutul bazei acelui fișier, iar a doua pornire îl omite deoarece versiunea sa este deja înregistrată. Pentru un fișier redenumit, baza de date actualizată este construită cu fișierul sub numele său vechi, iar a doua pornire își mută rândul `_omniroute_migrations` prin intrarea de compatibilitate în loc să-l ruleze din nou; poarta trece noul nume cu `--must-not-apply`, deci verificarea eșuează dacă al doilea boot îl aplică. Dacă o migrare a cererii de extragere nu reușește să se aplice pe calea actualizată, adică după fiecare migrare de bază (indiferent dacă eșuează sau nu și la o instalare nouă), poarta raportează `migration do PR não aplica` și vă solicită să remediați SQL ul față de schema curentă a bazei; dacă fișierul depinde de o altă migrare a cererii de extragere cu un marcaj temporal ulterioară, regenerează-i numele cu `npm run db:new-migration`.

Pentru a rula aceeași comparație la nivel local, transmiteți baza explicit, de exemplu `npm run check:migration-numbering -- --base origin/<base-branch>` sau `npm run check:migration-numbering -- --base-latest-tag` pentru a compara cu cea mai recentă versiune.

### Convertirea unei Migrații `NNN` a unui Open PR

O solicitare de extragere deschisă înainte de comutare poate încă transporta un fișier secvenţial, cum ar fi `242_add_widgets.sql`. Numerele vechi de deasupra `241` sunt respinse, așa că convertiți-le înainte de îmbinare:

1. **Redenumiți fișierul cu generatorul, păstrând descrierea.** Rulați `npm run db:new-migration -- <same description>` pentru a obține noul nume, mutați SQL în el și ștergeți vechiul fișier `NNN_`. Descrierea trebuie să rămână identică: intrarea de compatibilitate de mai jos se potrivește cu ea.
2. **Adăugați o intrare de compatibilitate dacă o bază de date persistentă a rulat numărul vechi.** Dacă orice bază de date păstrată (homolog, a VPS, instalarea proprie a unui colaborator) a rulat o versiune a PR cu fișierul `NNN_`, adăugați `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` la `RENAMED_MIGRATION_COMPATIBILITY` în `src/lib/db/migrationRunner/constants.ts`. Aceasta este** necesar pentru `237` la `241`** : acele sloturi dețin acum `237_usage_history_calculated_cost.sql` canonic , `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` și `241_seen_models.sql`, iar fără intrare o astfel de bază de date omite migrarea canonică pentru totdeauna și rulează din nou cea convertită. De asemenea, funcționează pentru un slot care rămâne gol, cum ar fi `242`, când destinația este un marcaj de timp. Când aveți îndoieli, adăugați intrarea. Unde îl adăugați în matrice nu contează: atunci când slotul țintă al unei intrări încă mai deține un rând pe care o altă intrare se deplasează (de exemplu `237` ținând un rând PR în timp ce un rând `usage_history_calculated_cost` mai vechi așteaptă să se mute în `237`), alergătorul lasă intrarea să aștepte până când slotul este liber. Doar un conflict real, cum ar fi un slot deținut de un rând fără mișcări de intrare sau două intrări care schimbă sloturi, oprește boot-ul cu `Cannot reconcile ...`.
3. **Păstrați SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), deoarece migrarea convertită poate întâlni o bază de date în care schema sa există deja.
4. **Mutați cazurile speciale cu cheie de versiune.** Dacă PR a adăugat o majuscule pentru numărul său vechi în `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) sau în `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), schimbați cheia la noul marcaj temporal.

`tests/unit/db/codex-fence-migration-rename.test.ts` este un exemplu de lucru al unui test pentru o migrare redenumită.

### Backporturi către ramuri înainte de comutare

Nu alegeți niciodată sau nu portați înapoi un fișier `YYYYMMDDHHMMSS_` într-o ramură care precede comutarea (de exemplu, o ramură `release/v*` mai veche). Runnerul de acolo sortează numele fișierelor ca text, astfel încât un fișier marcat de timp ar rula între `201_` și `202_` pe o bază de date proaspătă, iar vechea poartă de acolo nu înțelege prefixele de 14 cifre. Pe o astfel de ramură, scrieți modificarea ca următorul fișier `NNN_` al acelei ramuri, idempotent, deci este o opțiune fără opțiune atunci când versiunea marcată temporală sosește mai târziu.

### Cum se desfășoară migrațiile

La pornire, `migrationRunner.ts`:

1. Creează tabel `_omniroute_migrations` dacă nu există
2. Interogări pentru migrarea deja aplicată
3. Aplica orice migrare noua in ordine, fiecare intr-o tranzactie
4. Înregistrează fiecare migrare aplicată cu marca temporală

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

### Idempotenta

Migrațiile trebuie să fie** idempotent** — să le ruleze de două ori ar trebui să fie un nu-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Folosiți cu generozitate clauzele `IF NOT EXISTS`, `IF EXISTS` și `OR IGNORE` / `OR REPLACE`.

### Adăugarea unei noi migrari

1. **Creați fișierul cu generatorul** : `npm run db:new-migration -- <description>` (de exemplu `npm run db:new-migration -- add combo priority`). Scrie `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` cu ora UTC curentă și un antet de comentariu, înaintează cu o secundă dacă este luată marca temporală și nu suprascrie niciodată un fișier. Nu alegeți un număr manual.
2. **Utilizați DDL sigur** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Completați cu atenție datele** : utilizați `UPDATE ... WHERE ...` pentru a gestiona rândurile existente
4. **Verificați ordinea și denumirea** : `npm run test:migrations:fresh` (toate migrările pe o bază de date goală) și `npm run check:migration-numbering`
5. **Testați pe o copie** : nu rulați niciodată migrări netestate în producție
6. **Un tabel creat din cod are nevoie și de o migrare** : dacă un modul creează și tabelul leneș (`CREATE TABLE IF NOT EXISTS`, păstrat ca o cale de auto-vindecare), o migrare trebuie să o creeze cu același DDL. În caz contrar, o instalare curată și o instalare actualizată ajung cu scheme diferite, în funcție de a rula calea codului. `tests/unit/db/lazy-table-migration-guard.test.ts` scanează `src/` și `open-sse/` și eșuează pe un `CREATE` leneș fără o migrare (#20557). Exemplu: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Exemplu:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Schimbări incompatibile cu înapoi** (de exemplu, aruncarea coloanelor) sunt complicate. OmniRoute NOT acceptă downgrade — odată ce o migrare este aplicată, schimbarea schemei este permanentă. Planificați în consecință.

---

## Criptarea datelor stocate

Câmpurile sensibile (chei API, tokenuri OAuth, șiruri de conexiune) sunt criptate atunci când sunt stocate, utilizând **AES-256-GCM**.

### Cum funcționează

```ts
// src/lib/db/encryption.ts (simplificat)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Unde este utilizată

- `provider_connections.api_key` — criptat la nivelul aplicației
- `provider_connections.access_token`, `refresh_token`, `id_token` — criptate la nivelul aplicației
- Intrările `key_value` cu `namespace = "secrets"` — criptate la nivelul aplicației
- `proxy_registry.auth` — criptat la nivelul aplicației (dacă este prezent)

### Cheia de criptare

Cheia de criptare este derivată dintr-o **frază de acces** (setată prin variabila de mediu `STORAGE_ENCRYPTION_KEY`) și un **salt** (stocat în baza de date). Ambele sunt necesare pentru decriptarea datelor.

```bash
# Generați o frază de acces securizată
openssl rand -hex 32

# Setați în .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Important**: Pierderea cheii de criptare înseamnă pierderea accesului la toate datele criptate. **Faceți o copie de siguranță a cheii separat de baza de date**.

### Ce NU este criptat

Din motive de performanță, următoarele sunt stocate în text clar:

- Numele afișate ale furnizorilor
- Definițiile modelelor (deja publice)
- Regulile de rutare
- Înregistrările de utilizare (fără PII)

---

## Aspecte importante privind criptarea (v3.8.16+)

OmniRoute utilizează **`migrateLegacyEncryptedString()`** pentru a gestiona în mod transparent două scheme de criptare:

- **Moștenită** (anterioară versiunii v3.5.0): „criptare” bazată pe XOR (nu este criptografie reală)
- **Actuală**: AES-256-GCM cu IV și etichetă de autentificare corespunzătoare

Funcția auxiliară de migrare detectează formatul moștenit și îl recriptează folosind noua schemă la prima citire. Aceasta înseamnă că puteți actualiza o bază de date veche fără a pierde acreditările.

---

## Cache de citire

Pentru datele citite frecvent (modele, furnizori, setări), `readCache.ts` oferă un **cache în memorie**:

```ts
// Stocat în cache la pornire, invalidat la scriere
const providers = await getCachedProviders(); // Rapid, în memorie
const fresh = await listProviders(); // Lent, accesează baza de date
```

| Entitate stocată în cache | Cheie cache    | TTL             |
| ------------------------- | -------------- | --------------- |
| `models`                  | `models:v1`    | Până la scriere |
| `provider_connections`    | `providers:v1` | Până la scriere |
| `settings`                | `settings:v1`  | Până la scriere |
| `combos`                  | `combos:v1`    | Până la scriere |

Cache-ul este invalidat la fiecare scriere în tabelul corespunzător.

---

## Copiere de siguranță și recuperare

### Copiere de siguranță manuală

```bash
# Utilizați CLI-ul pentru a crea o copie de siguranță locală
omniroute backup create --name pre-migration

# Sau prin API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fișierul copiei de siguranță include:

- Toate tabelele bazei de date (serializate în JSON)
- Artefactele jurnalului de apeluri (codificate în base64, opțional)
- Setările + secretele (criptate)
- Configurația pluginurilor

### Restaurare

```bash
# Prin CLI
omniroute restore pre-migration

# Prin API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Avertisment**: Restaurarea suprascrie întreaga bază de date. Opriți mai întâi toți clienții.

### Copii de siguranță automatizate

```bash
# Activați copiile de siguranță zilnice automatizate prin CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Programarea este executată pe server de o sarcină de fundal care rulează la fiecare 30 de secunde
(implicit) și evaluează expresia cron în raport cu ora locală a serverului.

| Variabilă                                   | Valoare implicită | Descriere                                                                                                                                      |
| ------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`           | Intervalul de rulare în ms (minimum `5000`). Trebuie să fie mai scurt de 60 s pentru a se încadra în mod fiabil în minutul cron corespunzător. |

### Copie de siguranță SQLite la cald

Pentru copierea de siguranță fără întreruperi a unei baze de date active:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Aceasta utilizează API-ul SQLite pentru copii de siguranță online — poate fi executată în siguranță în timp ce OmniRoute rulează.

---

## Tuning de performanță

### Modul WAL

WAL este activat în mod implicit. Pentru sarcinile de lucru cu scriere mare, luați în considerare:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute nu setează `journal_size_limit`. Un punct de control mută cadrele WAL în fișierul principal, dar fișierul WAL își păstrează dimensiunea cea mai mare alocată. Paznicul `OMNIROUTE_WAL_GUARD_MAX_MB` doar avertizează și rulează `wal_checkpoint(RESTART)`; nu este un capac de dimensiunea unui disc.

### Indici

Indici cheie pentru performanță (creați automat prin migrații):

- Căutări de model `idx_models_provider` — după furnizor
- `idx_combo_targets_combo_id` — combo extindere țintă
- `idx_usage_history_api_key_timestamp` — analize de utilizare
- Urmărirea cotei `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — interogări în jurnalul de apeluri

Pentru a adăuga un index nou, creați o migrare:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Pentru bazele de date foarte mari (> 10GB), maparea memoriei poate fi ajustată prin SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactare

Instanțele OmniRoute de lungă durată beneficiază de `VACUUM` ocazional:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Rulați lunar în timpul ferestrelor cu trafic redus. (Modul WAL reduce nevoia, dar nu o elimină.)

---

## Verificarea stării

`src/lib/db/healthCheck.ts` oferă **diagnosticare la nivelul bazei de date**:

Ambele verbe necesită autentificare (`401` în caz contrar). `GET` doar diagnostichează; `POST` execută aceeași verificare cu `autoRepair` activat.

```bash
GET  /api/db/health   # diagnostichează
POST /api/db/health   # diagnostichează + repară
```

Răspunsul este obiectul `DbHealthCheckResult` produs de `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Bugetele domeniilor făceau referire la chei API care nu mai există.",
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

| Câmp              | Semnificație                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` când `issues` este gol. `driver` nu îl influențează niciodată.                                                                                                                   |
| `issues[].type`   | Una dintre valorile `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                    |
| `repairedCount`   | Rândurile reparate în timpul acestei execuții; întotdeauna `0` când `autoRepair` este false.                                                                                            |
| `backupCreated`   | Indică dacă a fost creată o copie de rezervă înainte de reparare.                                                                                                                       |
| `checkedAt`       | Marcaj temporal ISO utilizat atât pentru execuție, cât și pentru orice notă de reparare pe care aceasta o scrie.                                                                        |
| `driver.name`     | Driverul SQLite care deservește baza de date verificată.                                                                                                                                |
| `driver.degraded` | `true` când scrierile nu sunt stocate în mod durabil în fișierul bazei de date — soluția de rezervă WASM `sql.js` (persistența întregului fișier) sau o bază de date aflată în memorie. |

Același conținut este returnat de instrumentul MCP `omniroute_db_health_check`.

Rulați `PRAGMA integrity_check` pentru a detecta coruperea datelor:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ar trebui să afișeze: ok
```

Dacă returnează orice altceva decât `ok`, **opriți imediat utilizarea bazei de date** și restaurați-o din copia de rezervă.

---

## Recuperare în caz de dezastru

### Scenariul 1: Fișierul WAL a fost pierdut

Fișierul `-wal` lipsește, dar fișierul `-shm` și baza de date principală sunt intacte:

```bash
# Se recuperează automat la următoarea deschidere
omniroute
```

Dacă SQLite nu poate efectua recuperarea automată:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenariul 2: Fișierul principal al bazei de date este corupt

Restaurați din copia de rezervă:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` doar descarcă o arhivă `.tar.gz` completă de pe un server în execuție
(`GET /api/db-backups/exportAll`, sunt necesare acreditările operatorului); nu restaurează nimic.

### Scenariul 3: Cheia de criptare a fost pierdută

**Recuperarea nu este posibilă** fără cheie. Câmpurile criptate nu pot fi citite. Adăugați din nou manual toți furnizorii, folosind acreditări noi.

> **Măsură de protecție**: Efectuați întotdeauna separat o copie de rezervă a cheii de criptare, de preferință într-un manager de parole sau într-un KMS.

### Scenariul 4: Discul este plin

SQLite va returna erori `SQLITE_FULL`. Eliberați spațiu pe disc, apoi:

```bash
# Efectuați un checkpoint WAL pentru a elibera spațiu
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operațiuni uzuale

### Inspectarea unui tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Numărarea rândurilor din toate tabelele

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetarea (ștergerea) tuturor datelor

```bash
# Opriți mai întâi OmniRoute
omniroute stop

# Ștergeți fișierul bazei de date
rm ~/.omniroute/storage.sqlite*

# Reporniți (baza de date goală va fi recreată)
omniroute
```

Pentru o resetare **selectivă** (păstrați furnizorii, ștergeți datele de utilizare):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportarea unui singur tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Depanare

### „Baza de date este blocată”

Un alt proces deține un blocaj de scriere. Puteți:

- Aștepta finalizarea celuilalt proces (verificați cu `lsof | grep storage.sqlite`)
- Opri forțat celălalt proces
- Dacă problema persistă, reporniți OmniRoute

### „Constrângerea de cheie externă a eșuat”

Un modul de domeniu încalcă integritatea referențială. Verificați:

- Rândurile orfane din tabelele dependente
- Ștergerile în cascadă care nu s-au propagat
- O migrare recentă care a modificat o cheie externă

Rulați `PRAGMA foreign_key_check;` pentru a găsi încălcările.

### „Memorie insuficientă”

Operațiile I/O ale SQLite mapate în memorie depășesc limita sistemului de operare. Reduceți valoarea printr-o pragmă SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB în loc de 256MB
```

Sau dezactivați maparea:

```sql
PRAGMA mmap_size = 0;
```

### „Migrarea a eșuat în timpul execuției”

Migrarea a fost executată într-o tranzacție, deci modificările ar fi trebuit anulate. Dacă nu au fost:

1. **Opriți OmniRoute** (pentru a preveni alte încercări)
2. **Verificați starea bazei de date** cu `sqlite3`
3. **Remediați manual** migrarea parțială
4. **Rulați din nou** OmniRoute (migrarea va fi reîncercată)

Pentru a preveni această situație, testați întotdeauna mai întâi migrările pe o copie.

---

## Consultați și

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele de utilizare
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorizarea stării
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluxul de lansare
- Sursă: `src/lib/db/` (peste 80 de fișiere, ~25K linii de cod)
