# Database Schema & Operations Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Lyhyesti**: OmniRoute käyttää ensisijaisena tietovarastonaan **SQLitea WAL-lokikirjauksella** ja arkaluonteisten kenttien levossa olevan tiedon salaukseen **AES-256-GCM**-salausta. Tässä oppaassa käsitellään skeemaa, migraatioita, varmuuskopiointia ja palautusta sekä operatiivisia toimintaohjeita.

**Lähteet:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 perustaulua)
- `src/lib/db/migrationRunner.ts` — versioidut migraatiot
- `src/lib/db/migrations/` — 167 versioitua SQL-tiedostoa
- `src/lib/db/encryption.ts` — salauksen apufunktiot
- `src/lib/db/backup.ts` — varmuuskopioiden vienti/tuonti
- `src/lib/db/healthCheck.ts` — kuntodiagnostiikka

---

## Miksi SQLite?

OmniRoute valitsi SQLiten PostgreSQL:n/MySQL:n sijaan useista syistä:

| Tekijä               | SQLite                                          | PostgreSQL                                                   |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| **Käyttöönotto**     | Upotettu — ei erillistä palvelinta              | Edellyttää palvelimen määritystä                             |
| **Salaus**           | Sovelluskerroksessa (AES-256-GCM)               | Sisäänrakennettu TDE                                         |
| **Suorituskyky**     | Nopeampi pienillä ja keskisuurilla työkuormilla | Parempi erittäin suurilla samanaikaisilla kirjoituskuormilla |
| **Samanaikaisuus**   | WAL-tila mahdollistaa samanaikaiset luvut       | Täysi MVCC                                                   |
| **Varmuuskopiointi** | Yhden tiedoston kopio                           | `pg_dump` tai tiedostojärjestelmän tilannevedos              |
| **Käyttötapaus**     | Käyttäjäkohtainen asennus, upotettu             | Monen vuokralaisen SaaS                                      |

**Yhden käyttäjän yhden instanssin** käyttöönotossa (OmniRouten ensisijainen käyttötapaus) SQLite on yksinkertaisempi ja nopeampi.

### WAL-lokikirjaus

`core.ts` avaa tietokannan **WAL (Write-Ahead Logging) -tilassa**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL mahdollistaa **samanaikaiset lukutoiminnot** kirjoitusten aikana — tämä on tärkeää hallintapaneelille, joka tekee kyselyitä samalla, kun pyyntöjä tallennetaan.

Välimuistin oletuskoko on **65 536 KiB (64 MiB)**. SQLite tulkitsee negatiivisen
`cache_size`-arvon likimääräiseksi ylärajaksi kibitavuina ja varaa sivuja tarpeen mukaan.
**Asetukset > Järjestelmä ja tallennustila > Välimuistin koko** hyväksyy kokonaislukuarvot väliltä **1–
1 000 000 KiB**; asetuksen tallentaminen ottaa sen käyttöön aktiivisessa tietokantayhteydessä,
ja OmniRoute palauttaa pysyvästi tallennetun arvon käynnistyksen yhteydessä.

---

## Tietokannan sijainti

SQLite-tiedosto tallennetaan seuraavaan sijaintiin:

| Käyttöjärjestelmä | Polku                                                               |
| ----------------- | ------------------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                                       |
| macOS             | `~/.omniroute/storage.sqlite`                                       |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker            | `/app/data/storage.sqlite` (määritettävissä muuttujalla `DATA_DIR`) |

Liitännäistiedostot:

- `storage.sqlite-wal` — ennakkokirjausloki
- `storage.sqlite-shm` — jaetun muistin tiedosto
- `call_logs/` — pyyntöjen hyötykuorma-artefaktit (jos käytössä)

**Sijainnin ohittaminen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Toimialuemoduulien arkkitehtuuri

OmniRouten tietokannassa on **110 ylimmän tason TypeScript-moduulia** hakemistossa `src/lib/db/`. Jokainen toimialuemoduuli:

- Omistaa yhden tai useamman tietyn taulun
- Vie tyypitettyjä CRUD-funktioita
- Ei koskaan käsittele muiden moduulien tauluja
- Käyttää `core.ts`-tiedoston `getDbInstance()`-funktiota tietokannan käyttämiseen

### 110 ylimmän tason tietokantamoduulia

OmniRoutessa on **110 ylimmän tason TypeScript-tiedostoa** hakemistossa `src/lib/db/`. Alla on otos keskeisistä moduuleista; täydellinen luettelo löytyy hakemiston tiedostolistauksesta:

| Moduuli                 | Taulut                                                         | Vastuu                                                                      |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth- ja API-avainpalveluntarjoajien rekisteröinti sekä tunnistetiedot     |
| `models.ts`             | `key_value` (mallitiedot)                                      | Mallien määritelmät, ominaisuudet ja hinnoittelu                            |
| `combos.ts`             | `combos`                                                       | Yhdistelmäreitityksen määritykset ja järjestys                              |
| `apiKeys.ts`            | `api_keys`                                                     | API-avainten elinkaari, käyttöalueet ja kiintiöiden seuranta                |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Järjestelmän määritykset ja jaettu avain-arvotietovarasto                   |
| `backup.ts`             | —                                                              | Varmuuskopioiden vienti- ja tuontitoiminnot                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Välityspalvelinmääritykset ja reitityssäännöt                               |
| `prompts.ts`            | `prompt_templates`                                             | Uudelleenkäytettävät kehotemallit ja versiointi                             |
| `webhooks.ts`           | `webhooks`                                                     | Tapahtumapohjaiset webhook-tilaukset ja lokit                               |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Pyyntökohtainen tarkastuslokitus (valinnainen, suuri tietomäärä)            |
| `domainState.ts`        | `domain_*` (5 taulua)                                          | Toimialueiden budjetit, katkaisijat, lukitukset, varaketjut ja kuluhistoria |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP:n/A2A:n sallittujen API-avainten luettelo                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historiallinen kiintiöiden käyttö                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mallien yhdistäminen oletusyhdistelmiin                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-kohtainen pysyvä tila                                                   |
| `encryption.ts`         | —                                                              | Apufunktiot kenttien salaamiseen ja salauksen purkamiseen                   |
| `readCache.ts`          | —                                                              | Muistinsisäinen välimuisti paljon lukutoimintoja käyttäville operaatioille  |
| `secrets.ts`            | `key_value` (salatut tietueet)                                 | Salattu salaisuuksien tallennus                                             |
| `stateReset.ts`         | —                                                              | Tietokannan tilan tyhjentäminen ja palauttaminen testausta varten           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Istuntokonteksti agentin vaihdosta varten                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Käytön seuranta                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Pakkausmääritykset                                                          |

### Moduulien rajat

Keskeinen arkkitehtuurisääntö: **moduulit eivät käytä toistensa tauluja suoraan**. Kun tarvitset toisen moduulin tietoja, tuo funktio kyseisestä moduulista.

```ts
// ❌ VÄÄRIN: suora SQL-kysely toisen moduulin tauluun
db.prepare("SELECT * FROM provider_connections").all();

// ✅ OIKEIN: käytä providers-moduulin funktiota
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Tämän säännön noudattamista valvotaan koodikatselmoinneissa — staattista tarkistusta ei ole, mutta rikkomukset merkitään.

---

## Perusskeema (17 taulua)

`core.ts` määrittelee 17 perustaulua `SCHEMA_SQL`:ssä. Migraatio `001_initial_schema.sql` luo nämä taulut, jotka muodostavat ydinskeeman.

### Ydintaulut (luodaan ensimmäisessä migraatiossa)

| Taulu                      | Tarkoitus                                  | Keskeiset sarakkeet                                                     |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Palveluntarjoajan tunnistetiedot (salatut) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Palveluntarjoajan solmujen reititystiedot  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Yleinen KV-säilö                           | `namespace`, `key`, `value`                                             |
| `combos`                   | Reititysyhdistelmien määritykset           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Yhdyskäytävän API-avaimet                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Tietokannan metatiedot                     | `key`, `value`                                                          |
| `usage_history`            | Pyyntöjen käyttötietueet                   | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Pyyntöjen hyötykuormat ja vastaukset       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Välityspyyntöjen lokit                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Mallien ja palveluntarjoajien ketjut       | `model`, `chain`                                                        |
| `domain_budgets`           | Verkkotunnuskohtaiset kulutusbudjetit      | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budjettien nollaushistoria                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Verkkotunnuskohtainen kuluseuranta         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Verkkotunnuksen nopeusrajoituksen tila     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Verkkotunnuskohtainen katkaisijan tila     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM-vastausvälimuisti                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historialliset kiintiötilannekuvat         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Lisätaulut (lisätty myöhemmissä migraatioissa)

Myöhemmät migraatiot lisäävät muun muassa seuraavia tauluja:

- `cli_tool_state` (migraatio 011) — CLI-työkalun tila
- `mcp_*`-taulut — MCP-palvelimen auditointi
- `a2a_*`-taulut — A2A-tehtävien tila
- `usage_*`-taulut — käytön seuranta
- `plugin_*`-taulut — liitännäisjärjestelmä
- `skill_executions` — taitojen suoritushistoria
- `memory_*`-taulut — muistijärjestelmä
- `compression_*`-taulut — pakkausjärjestelmä
- `webhook_*`-taulut — webhook-toimitusloki
- `acp_*`-taulut — Agent Client Protocol
- `oneproxy_*`-taulut — 1proxy-markkinapaikka
- `proxy_assignments` — välityspalvelinten käyttöalueiden sidonnat
- `detailed_call_artifacts` — kutsulokien artefaktien metatiedot
- `quota_alert_history` — kiintiöhälytysten auditointihistoria
- `command_code_auth_sessions` — Command Code OAuth -istunnot

Täydellinen luettelo yli 30 taulusta sijaitsee hakemistossa `src/lib/db/migrations/`.

---

## Muuttoliikkeet

OmniRoute käyttää** versioidut, idempotentit siirrot** `src/lib/db/migrations/` ssä. Jokainen siirto on yksi SQL tiedosto. Kaksi nimeämismuotoa on rinnakkain; `_omniroute_migrations` ssä tallennettu versio on numeerinen etuliite.

### Siirron nimeäminen

| Muoto                                              | Esimerkki                            | Käytetään                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (täsmälleen 3 numeroa)       | `241_seen_models.sql`                | Vanha sarja `001`–`241`. Jäädytetty, kun aikaleimamuoto laskeutui (`240` ja `241` yhdistettiin juuri ennen sitä): mikään uusi tiedosto ei saa järjestysnumeroa. |
| `YYYYMMDDHHMMSS_description.sql` (14 numeroa, UTC) | `20261113120000_add_usage_index.sql` | Jokainen siirto, joka on luotu 2026-11-13 alkaen.                                                                                                               |

Miksi muutos: peräkkäisillä numeroilla rinnakkainen PRs valitsi saman seuraavan numeron ja kaikki paitsi yksi piti numeroida uudelleen ennen yhdistämistä. UTC -aikaleima antaa jokaiselle PR lle oman versionsa.

Aikaleimamuodon säännöt (suorittaa `npm run check:migration-numbering`, jaettu generaattorin kanssa `scripts/check/lib/migrationNaming.mjs`:ssä):

- Aikaleima on todellinen UTC päivämäärä ja -aika, aikaisintaan `20261113000000` ja enintään 10 minuuttia tulevaisuudessa.
- Kuvaus on pieni `snake_case` joka alkaa kirjaimella (`a-z`, `0-9`, yksi `_` sanojen välissä), enintään 80 merkkiä.
- Kaksi tiedostoa, joilla on sama aikaleima, ovat kaksoiskappaleita.
- No-gap-sääntö koskee vain vanhoja sarjoja: jokaisen luvun välillä `001` - `241` on oltava olemassa, paitsi tunnetut aukot `026`, `055` ja `121`. `241` (tai minkä tahansa vanhan tiedoston) poistaminen epäonnistuu portissa. `001` ja `241` ta ei voi koskaan lisätä `KNOWN_GAPS` sallittujen luetteloon. Aikaleimatut tiedostot eivät koskaan luo aukkoa.
- Jokaisen `src/lib/db/migrations/` merkinnän on oltava tavallinen tiedosto, jolla on kelvollinen pienillä kirjaimilla kirjoitettu `.sql` nimi. Hakemisto, symlink, `.SQL` tai `.sql.bak` -tiedosto, piilotettu tiedosto tai nimi, jossa on välilyönti, rikkoo portin, koska juoksija ohittaa sen hiljaa tai kaatuu käynnistyksen yhteydessä.

**Ota tilaus käyttöön.** Runner lajittelee etuliitteen numeerisen arvon mukaan, ei tekstin mukaan: ensin vanhat `001`–`241` -tiedostot, sitten aikaleimatut tiedostot aikaleimajärjestyksessä, sitten kaikki `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` llä rekisteröidyt nimiavaroidut hakemistot (versiot kuten `ee-001`). Odottava siirto on mikä tahansa tiedosto, jonka versio ei ole `_omniroute_migrations`-muodossa, joten siirto vanhemmasta haarasta, joka sulautuu uudemman jälkeen, koskee edelleen olemassa olevia tietokantoja.

**Aikaleima on luomisjärjestys, ei yhdistämisjärjestys.** Jos siirtosi riippuu taulukosta tai sarakkeesta, joka on luotu siirrolla a** uudempi** aikaleima (esimerkiksi toisesta PR, joka yhdistettiin ensin), uusi tietokanta ajaisi sinun ensin ja epäonnistuu. Kun PR on vielä auki, luo tiedostonimi uudelleen `npm run db:new-migration` llä, jotta se saa uudemman aikaleiman, tai tee siitä itsenäinen. `npm run test:migrations:fresh` käyttää jokaista siirtoa tyhjään tietokantaan ja ottaa tämän kiinni.

### Yhdistettyä siirtoa ei koskaan poisteta tai nimetä uudelleen

Kun siirtotiedosto on julkaisuhaarassa tai `main` ssa, se on jo ajettu homologi- ja kehittäjätietokannassa, VPS asennuksissa ja Enterprise-synkronointissa. Siitä eteenpäin:

- **Älä koskaan poista sitä.** Tuoreet asennukset menettäisivät mallinsa, kun taas päivitetyt tietokannat säilyttävät sen.
- **Älä koskaan nimeä sitä uudelleen.** `_omniroute_migrations` :n versio ei enää vastaisi tiedostoa, joten jokainen tietokanta, joka on jo käyttänyt sitä, ajaisi sen uudelleen. Ei-idempotentti SQL kopioi sitten tiedot tai pysäyttää käynnistyksen.
- **Tarvitsetko erilaisen kaavan?** Luo uusi siirto `npm run db:new-migration` avulla.

Uudelleennimeäminen on turvallista vain tiedostolle, jota ei ole vielä yhdistetty, mihin portin vihjeet viittaavat. Julkaisutunniste ei muuta tässä mitään: jokainen `release/v*` haaran työntö julkaisee Docker `:next` -kuvan ja toimii homologilla, VPS asennuksilla ja Enterprise-synkronoinnissa, joten yhdistetty siirto on suoritettu oikeissa tietokannoista ennen `vX.Y.Z` tunnisteen olemassaoloa. Portti epäonnistuu jokaisessa perustiedoston poistamisessa, olipa se merkitty tai ei.

- **Yhdistetyn siirron palauttaminen.** Tiedoston poistava `git revert` rikkoo portin. Säilytä tiedosto ja kumoa sen skeema uudessa siirrossa: `npm run db:new-migration -- <description>`, `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` ja niin edelleen. Päivitetyt ja tuoreet tietokannat päättyvät sitten samaan skeemaan.
- **Yksi hyväksytty uudelleennimi: yhteensopivuusmerkintä ja identtinen sisältö.** Jos yhdistetyn tiedoston on siirrettävä (esimerkiksi kahdella yhdistetyllä tiedostolla on yhteinen aikaleima ja juoksija pysähtyy versiotörmäyksessä), nimeä myöhempi tiedosto uudelleen koskematta sen SQL ja lisää `{ fromVersion, fromName, toVersion, toName }` `RENAMED_MIGRATION_COMPATIBILITY` :hen `src/lib/db/migrationRunner/constants.ts`. Vanhaa versiota käyttävien tietokantojen `_omniroute_migrations` rivi siirretään sen sijaan, että tiedosto suoritettaisiin uudelleen. Portti varoittaa tällaisesta nimeämisestä ja suorittaa sille aina kommutoinnin tarkistuksen, oli uusi aikaleima mikä tahansa: tuoreet asennukset käyttävät tiedostoa uudessa paikassa, päivitetyt tietokannat eivät, joten valitse uusi aikaleima läheltä vanhaa. Portti epäonnistuu uudelleennimeämisessä, jos sisältö muuttuu (skeeman muutos tapahtuu edelleen uudessa siirrossa) tai jos merkinnän kohdetiedosto ei ole levyllä.
- **Älä koskaan nimeä uudelleen saman aikaleiman sisällä.** Uudelleennimi, joka säilyttää aikaleiman ja muuttaa vain kuvauksen, epäonnistuu portissa, merkinnällä tai ilman. Kun merkintä, jonka `toVersion` on yhtä kuin sen `fromVersion`, juoksija poistaa vanhan `_omniroute_migrations` rivin ja käyttää tiedostoa uudelleen jokaisessa tietokannassa, jossa se on jo suoritettu. Ilman merkintää juoksija seuraa vain versiota: se ohittaa tiedoston kyseisissä tietokannoissa (uusi sisältö ei koskaan toimi siellä) ja kirjaa uudelleen numerointivirheen jokaisessa käynnistyksessä. Käytä toista aikaleimaa ja yhteensopivuusmerkintää tai säilytä nimi.
- **Portti tarkistaa, ettei uudelleennimettyä tiedostoa suoriteta uudelleen.** Jokaisen katetun uudelleennimeämisen kohdalla portti välittää uuden tiedostonimen kommutointitarkistukseen `--must-not-apply`-toiminnolla. Tarkistus käynnistää päivitetyn tietokannan oikealla juoksijalla, ja jos juoksija käyttää kyseistä tiedostoa uudelleen (esimerkiksi koska merkinnällä on väärä versio tai nimi tai koska portin tekstin jäsentäjä lukee `constants.ts` eri tavalla kuin TypeScript), portti epäonnistuu `migration renomeada rodaria de novo` kanssa ja pyytää sinua tarkistamaan merkinnän vanhat ja uudet versiot ja nimet.

### Mitä portti vastustaa tukikohtaa

Kun vetopyyntö ja yhdistämisjono suoritetaan, `npm run check:migration-numbering` vertaa levyllä olevaa `src/lib/db/migrations/` samaan perushaaran hakemistoon. Kanta on tässä järjestyksessä: `--base-latest-tag`, `--base <ref>`, `MIGRATION_BASE_REF` muuttuja tai, kun `GITHUB_EVENT_NAME` on `pull_request`, `pull_request_target` tai `merge_group`, yhdistämistoimituksen ensimmäinen vanhempi, tapahtuman hyötykuorman `merge_group.base_sha` tai `git merge-base HEAD origin/$GITHUB_BASE_REF`. Vetopyynnössä tai yhdistämisjonossa ilman selvitettävää kantaa portti epäonnistuu. CI ulkopuolella ilman `--base` se tulostaa `comparação com a base: pulada (sem --base)` ja ohittaa nämä säännöt.

`--base-latest-tag` vertaa uusimpaan julkaisutunnisteeseen (`vX.Y.Z` semver-järjestyksessä; jälkiliitteitä, kuten yöpaitaa, ei lasketa), joka on `HEAD`:n historiassa, samoilla säännöillä kuin `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) suorittaa portin tällä tavalla, koska push- ja ajoitetuilla ajoilla ei ole vetopyyntöpohjaa ja yhdistäminen voi laskeutua ilman uutta CI ajoa. Ilman julkaisutunnistetta historiassa portti epäonnistuu; suorita `git fetch --tags` (in CI, `actions/checkout` ja `fetch-depth: 0` tuo tunnisteet).

| Muutos vetopyyntöön                                                                                                           | Tulos                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kantaessa oleva tiedosto nimetään uudelleen `RENAMED_MIGRATION_COMPATIBILITY` -merkinnällä                                    | **Varoitus** jos sisältö on identtinen ja kommutaatiotarkistus suoritetaan uudesta aikaleimasta riippumatta; se epäonnistuu, jos uusi sijainti muuttaa lopullista skeemaa (kumoa uudelleennimeäminen tai valitse toinen uusi aikaleima, jossa se liikkuu) tai jos juoksija käyttäisi uudelleennimettyä tiedostoa uudelleen päivitetyssä tietokannassa.** Epäonnistui** jos sisältö muuttuu. |
| Pohjalla oleva tiedosto nimetään uudelleen siten, että sen aikaleima säilyy (vain kuvaus muuttuu)                             | **Epäonnistui** , merkinnällä tai ilman: juoksija käyttäisi sitä uudelleen (merkinnän kanssa) tai ohitti sen version mukaan (ilman yhtä). Käytä toista aikaleimaa ja yhteensopivuusmerkintää tai säilytä nimi.                                                                                                                                                                              |
| Kantaessa oleva tiedosto poistetaan tai nimetään uudelleen ilman merkintää                                                    | **Epäonnistui** , onko tiedosto julkaisutunnisteessa vai ei. Kumoa se palauttamalla tiedosto komennolla `git checkout <base> -- src/lib/db/migrations/<file>`; Jos haluat palauttaa sen skeeman, lisää uusi siirto komennolla `DROP ... IF EXISTS`.                                                                                                                                         |
| Pohjassa olevalla tiedostolla on erilainen sisältö                                                                            | **Varoitus** ( `::warning` -merkintä GitHub toiminnoissa), ja kommutoinnin tarkistus suoritetaan. Se epäonnistuu, jos muokkaus muuttaa lopullista skeemaa, koska päivitetyt tietokannat eivät käytä muokattua tiedostoa uudelleen: aseta muutos uuteen siirtoon. Vaaraton muokkaus (kommentti, `IF NOT EXISTS`) vain varoittaa.                                                             |
| Aikaleimatiedostoon lisätään aikaleima, joka ei ole uudempi kuin tukiaseman uusin                                             | Suorittaa kommutaatiotarkistuksen, joka kuvataan alla.                                                                                                                                                                                                                                                                                                                                      |
| Vanhan muotoinen `NNN_` tiedosto lisätään numerolla tukiaseman uusimman vanhan muodon tiedoston alle                          | **Epäonnistui** , vaikka `KNOWN_GAPS` muokattaisiin samassa noutopyynnössä: vanha sarja on jäädytetty, luo siirto komennolla `npm run db:new-migration`. Vanhan muotoiset tiedostot, jotka ylittävät tukiaseman uusimman tiedoston ( `release/v*` - `main` -vetopyyntö) hyväksytään.                                                                                                        |
| Epäjärjestyksessä oleva, muokattu tai uudelleennimetty tiedosto sisältää `INSERT`, `UPDATE`, `DELETE` tai `REPLACE` -lauseita | **Varoitus** : kommutaatiotarkistus ei vertaa tietoja, joten tarkista, muuttaako päivitettyjen ja tuoreiden tietokantojen järjestys tulosta.                                                                                                                                                                                                                                                |

Yksi kommutaatiotarkistuksen ajo kattaa epäkunnossa olevat, muokatut ja uudelleennimetyt tiedostot yhdessä.

Kommutaatiotarkistus (`scripts/check/migration-commutation.ts`) rakentaa kaksi väliaikaista tietokantaa, joissa on todellinen asennuspolku: an** päivitetty** yksi (käynnistetään perussiirtymillä, sitten käynnistetään uudelleen samasta tiedostosta, jossa on vetopyynnön siirrot) ja** tuoretta** yksi (yksi käynnistys vetopyynnön siirroilla). Se vertaa tuloksena saatuja skeemoja: taulukoita ja sarakkeita (ohitamatta sarakejärjestystä), UNIQUE / PRIMARY KEY ja FOREIGN KEY -rajoituksia, kunkin taulukon normalisoitua `CREATE TABLE` tekstiä (joka kattaa CHECK rajoitukset, lajittelut, luodut sarakkeet ja taulukkovaihtoehdot), indeksit, triggerit ja näkymät. Rivitietoja ei verrata. Jos ne täsmäävät, portti tulostaa, että tiedosto on epäkunnossa, mutta kulkee ja kulkee. Jos ne eroavat, portti epäonnistuu eron ja vihjeen kanssa: jos tiedosto on epäjärjestyksessä, luo sen nimi uudelleen komennolla `npm run db:new-migration`, mikä on turvallista, koska tiedostoa ei ole vielä yhdistetty; palauta muokatun perustiedoston perussisältö ja aseta muutos uuteen siirtoon; Jos tiedosto on nimetty uudelleen, kumoa uudelleennimeäminen tai valitse toinen uusi aikaleima, jossa se liikkuu, älä koskaan käytä samaa aikaleimaa toisella nimellä. Jos itse tarkistusta ei voida suorittaa, portti epäonnistuu CI ssä ja varoittaa vain paikallisesti. Muokatun perustiedoston päivitetty tietokanta on rakennettu kyseisen tiedoston perussisällön perusteella, ja toinen käynnistys ohittaa sen, koska sen versio on jo tallennettu. Uudelleen nimetylle tiedostolle päivitetty tietokanta rakennetaan vanhalla nimellä, ja toinen käynnistys siirtää sen `_omniroute_migrations` rivin yhteensopivuusmerkinnän läpi sen sijaan, että se suoritettaisiin uudelleen. portti välittää uuden nimen `--must-not-apply`, joten tarkistus epäonnistuu, jos toinen käynnistys käyttää sitä. Jos vetopyynnön siirto epäonnistuu päivitetyssä polussa, eli jokaisen perussiirron jälkeen (riippumatta siitä, epäonnistuuko se myös uudessa asennuksessa), portti ilmoittaa `migration do PR não aplica` ja pyytää sinua korjaamaan SQL tukiaseman nykyiseen skeemaan; jos tiedosto on riippuvainen toisesta vetopyynnön siirrosta, jossa on myöhempi aikaleima, luo sen nimi uudelleen komennolla `npm run db:new-migration`.

Jos haluat suorittaa saman vertailun paikallisesti, anna kanta suoraan, esimerkiksi `npm run check:migration-numbering -- --base origin/<base-branch>` tai `npm run check:migration-numbering -- --base-latest-tag` verrataksesi uusimpaan versioon.

### Avoimen PR:n `NNN` migroinnin muuntaminen

Ennen kytkintä avattu vetopyyntö voi silti sisältää peräkkäisen tiedoston, kuten `242_add_widgets.sql`. Vanhat luvut `241` yläpuolella hylätään, joten muunna ne ennen yhdistämistä:

1. **Nimeä tiedosto uudelleen generaattorilla ja säilytä kuvaus.** Suorita `npm run db:new-migration -- <same description>` saadaksesi uuden nimen, siirrä SQL siihen ja poista vanha `NNN_` tiedosto. Kuvauksen tulee pysyä samana: alla oleva yhteensopivuusmerkintä vastaa sitä.
2. **Lisää yhteensopivuusmerkintä, jos pysyvä tietokanta suoritti vanhan numeron.** Jos jokin säilytettävä tietokanta (homologi, VPS, avustajan oma asennus) suoritti PR n koontiversion `NNN_` tiedoston kanssa, lisää `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` `RENAMED_MIGRATION_COMPATIBILITY` :n `src/lib/db/migrationRunner/constants.ts` hen. Tämä on** vaaditaan `237` :stä `241`** : nämä paikat sisältävät nyt kanoniset `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` ja `241_seen_models.sql`, ja ilman merkintää tällainen tietokanta ohittaa kanonisen siirron ikuisesti ja suorittaa muunnetun uudelleen. Se toimii myös tyhjänä jäävässä paikassa, kuten `242`, kun kohde on aikaleima. Jos olet epävarma, lisää merkintä. Mihin lisäät sen taulukkoon, sillä ei ole väliä: kun merkinnän kohdepaikassa on edelleen rivi, josta toinen merkintä siirtyy pois (esimerkiksi `237` pitää PR riviä, kun vanhempi `usage_history_calculated_cost` rivi odottaa siirtymistä `237`:iin), juoksija antaa kyseisen merkinnän odottaa, kunnes paikka vapautuu. Vain todellinen ristiriita, kuten korttipaikka, jossa rivi ei liiku, tai kaksi paikkaa, jotka vaihtavat paikkaa, pysäyttää käynnistyksen `Cannot reconcile ...`-merkillä.
3. **Pidä SQL idempotenttina** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), koska muunnettu siirto saattaa kohdata tietokannan, jossa sen skeema on jo olemassa.
4. **Siirrä versioavaimella varustettuja erikoistapauksia.** Jos PR lisäsi vanhalle numerolleen kirjainkoon `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) tai `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), vaihda avain uuteen aikaleimaan.

`tests/unit/db/codex-fence-migration-rename.test.ts` on toimiva esimerkki uudelleennimetyn siirron testistä.

### Takaisin sivukonttoriin ennen vaihtoa

Älä koskaan poimi tai siirrä `YYYYMMDDHHMMSS_` tiedostoa haaraan, joka on ennen vaihtoa (esimerkiksi vanhempi `release/v*` haara). Siellä juoksija lajittelee tiedostojen nimet tekstiksi, joten aikaleimattu tiedosto juoksisi `201_` ja `202_` välillä tuoreessa tietokannassa, eikä vanha portti ymmärrä 14-numeroisia etuliitteitä. Kirjoita tällaiseen haaraan muutos tämän haaran omaksi seuraavaksi `NNN_` -tiedostoksi idempotent, joten se on no-op, kun aikaleimattu versio saapuu myöhemmin.

### Kuinka muuttoliikkeet kulkevat

Käynnistettäessä `migrationRunner.ts`:

1. Luo `_omniroute_migrations` taulukon, jos sitä ei ole olemassa
2. Kyselyt jo tehdyistä siirroista
3. Ottaa kaikki uudet siirrot käyttöön järjestyksessä, kukin tapahtumassa
4. Tallentaa jokaisen sovelletun siirron aikaleimalla

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

### Idempotenssi

Muuttoliikkeet täytyy olla** idempotentti** — suorittamisen kahdesti pitäisi olla no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Käytä lauseita `IF NOT EXISTS`, `IF EXISTS` ja `OR IGNORE` / `OR REPLACE` runsaasti.

### Uuden siirron lisääminen

1. **Luo tiedosto generaattorilla** : `npm run db:new-migration -- <description>` (esimerkiksi `npm run db:new-migration -- add combo priority`). Se kirjoittaa `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` nykyisellä UTC -ajalla ja kommentin otsikolla, siirtyy sekunnin eteenpäin, jos aikaleima otetaan, eikä koskaan korvaa tiedostoa. Älä valitse numeroa käsin.
2. **Käytä turvallista DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Täytä tiedot huolellisesti** : käytä `UPDATE ... WHERE ...` olemassa olevien rivien käsittelyyn
4. **Tarkista järjestys ja nimeäminen** : `npm run test:migrations:fresh` (kaikki migraatiot tyhjässä tietokannassa) ja `npm run check:migration-numbering`
5. **Testaa kopiota** : älä koskaan suorita testaamattomia siirtoja tuotannossa
6. **Myös koodista luotu taulukko tarvitsee siirron** : jos moduuli myös luo taulukon laiskasti (`CREATE TABLE IF NOT EXISTS`, pidetään itsekorjauspoluna), siirron on luotava se samalla DDL llä. Muuten puhdas asennus ja päivitetty asennus päätyvät erilaisiin skeemoihin riippuen siitä, suoritettiinko kyseinen koodipolku. `tests/unit/db/lazy-table-migration-guard.test.ts` skannaa `src/` ja `open-sse/` ja epäonnistuu laiskalla `CREATE` llä ilman siirtoa (#20557). Esimerkki: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Esimerkki:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Taaksepäin yhteensopimattomat muutokset** (esim. sarakkeiden pudottaminen) ovat hankalia. OmniRoute tukeeko NOT — alentamista, kun siirto on otettu käyttöön, skeeman muutos on pysyvä. Suunnittele sen mukaan.

---

## Levossa olevan tiedon salaus

Arkaluonteiset kentät (API-avaimet, OAuth-tunnukset ja yhteysmerkkijonot) salataan levossa käyttäen **AES-256-GCM**-salausta.

### Toimintaperiaate

```ts
// src/lib/db/encryption.ts (yksinkertaistettu)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Käyttökohteet

- `provider_connections.api_key` — salataan sovellustasolla
- `provider_connections.access_token`, `refresh_token`, `id_token` — salataan sovellustasolla
- `key_value`-tietueet, joissa `namespace = "secrets"` — salataan sovellustasolla
- `proxy_registry.auth` — salataan sovellustasolla (jos määritetty)

### Salausavain

Salausavain johdetaan **salalauseesta** (asetetaan `STORAGE_ENCRYPTION_KEY`-ympäristömuuttujalla) ja **suolasta** (tallennetaan tietokantaan). Molemmat tarvitaan tietojen salauksen purkamiseen.

```bash
# Luo turvallinen salalause
openssl rand -hex 32

# Aseta .env-tiedostossa
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kriittistä**: Salausavaimen menettäminen tarkoittaa, että kaikki salatut tiedot menetetään. **Varmuuskopioi avain erilleen tietokannasta**.

### Mitä EI salata

Suorituskykysyistä seuraavat tiedot tallennetaan selväkielisinä:

- Palveluntarjoajien näyttönimet
- Mallimääritykset (jo valmiiksi julkisia)
- Reitityssäännöt
- Käyttötiedot (ei henkilötietoja)

---

## Salauksen huomioitavat seikat (v3.8.16+)

OmniRoute käsittelee kahta salausmenetelmää läpinäkyvästi **`migrateLegacyEncryptedString()`**-funktion avulla:

- **Vanha** (ennen versiota v3.5.0): XOR-pohjainen ”salaus” (ei oikeaa kryptografiaa)
- **Nykyinen**: AES-256-GCM asianmukaisella alustusvektorilla (IV) ja todennustunnisteella

Siirtoapufunktio tunnistaa vanhan muodon ja salaa tiedot uudelleen uudella menetelmällä ensimmäisellä lukukerralla. Näin vanhan tietokannan voi päivittää menettämättä tunnistetietoja.

---

## Lukuvälimuisti

Usein luettaville tiedoille (mallit, palveluntarjoajat, asetukset) `readCache.ts` tarjoaa **muistissa olevan välimuistin**:

```ts
// Tallennetaan välimuistiin käynnistyksen yhteydessä, mitätöidään kirjoitettaessa
const providers = await getCachedProviders(); // Nopea, muistissa
const fresh = await listProviders(); // Hidas, käyttää tietokantaa
```

| Välimuistiin tallennettu entiteetti | Välimuistiavain | TTL                |
| ----------------------------------- | --------------- | ------------------ |
| `models`                            | `models:v1`     | Kirjoitukseen asti |
| `provider_connections`              | `providers:v1`  | Kirjoitukseen asti |
| `settings`                          | `settings:v1`   | Kirjoitukseen asti |
| `combos`                            | `combos:v1`     | Kirjoitukseen asti |

Välimuisti mitätöidään aina, kun vastaavaan tauluun kirjoitetaan.

---

## Varmuuskopiointi ja palautus

### Manuaalinen varmuuskopiointi

```bash
# Luo paikallinen varmuuskopio komentoriviliittymällä
omniroute backup create --name pre-migration

# Tai ohjelmointirajapinnan kautta
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Varmuuskopiotiedosto sisältää:

- Kaikki tietokantataulut (sarjallistettuina JSON-muotoon)
- Kutsulokin artefaktit (base64-koodattuina, valinnainen)
- Asetukset ja salaisuudet (salattuina)
- Liitännäisten määritykset

### Palautus

```bash
# Komentoriviliittymän kautta
omniroute restore pre-migration

# Ohjelmointirajapinnan kautta
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Varoitus**: Palautus korvaa koko tietokannan. Pysäytä ensin kaikki asiakasohjelmat.

### Automaattiset varmuuskopiot

```bash
# Ota automaattiset päivittäiset varmuuskopiot käyttöön komentoriviliittymällä
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ajastus suoritetaan palvelimella taustatyönä, joka käynnistyy 30 sekunnin välein
(oletusarvo) ja arvioi cron-lausekkeen palvelimen paikallisen ajan perusteella.

| Muuttuja                                    | Oletusarvo | Kuvaus                                                                                                                                    |
| ------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | Käynnistysväli millisekunteina (vähintään `5000`). Sen on oltava alle 60 s, jotta suoritus osuu luotettavasti vastaavaan cron-minuuttiin. |

### Aktiivisen SQLite-tietokannan varmuuskopiointi

Käynnissä olevan tietokannan varmuuskopiointi ilman käyttökatkoa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tämä käyttää SQLiten verkossa toimivaa varmuuskopiointirajapintaa — komento voidaan suorittaa turvallisesti OmniRouten ollessa käynnissä.

---

## Suorituskyvyn viritys

### WAL tila

WAL on oletuksena käytössä. Harkitse suuria kirjoitustöitä:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute ei aseta `journal_size_limit`. Tarkistuspiste siirtää WAL -kehykset päätiedostoon, mutta WAL tiedosto säilyttää suurimman varatun koonsa. `OMNIROUTE_WAL_GUARD_MAX_MB` -suoja vain varoittaa ja suorittaa `wal_checkpoint(RESTART)`:n; se ei ole levyn kokoinen kansi.

### Indeksit

Suorituskyvyn keskeiset indeksit (automaattisesti luotu siirtojen yhteydessä):

- `idx_models_provider` — mallihakuja tarjoajan mukaan
- `idx_combo_targets_combo_id` — combo kohdelaajennus
- `idx_usage_history_api_key_timestamp` — n käyttöanalytiikka
- `idx_quota_snapshots_api_key_window` — -kiintiön seuranta
- `idx_call_logs_timestamp` — puhelulokikyselyt

Lisää uusi hakemisto luomalla siirto:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Muistikartoitettu I/O

Erittäin suurille tietokannoille (> 10GB) muistikartoitusta voidaan säätää SQLite pragman kautta:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Tiivistys

Pitkäaikaiset OmniRoute esiintymät hyötyvät satunnaisesta `VACUUM`:stä:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Suorita kuukausittain vähäliikenteen ikkunoiden aikana. (WAL -tila vähentää tarvetta, mutta ei poista sitä.)

---

## Kuntotarkistus

`src/lib/db/healthCheck.ts` tarjoaa **tietokantatason kuntodiagnostiikan**:

Molemmat HTTP-metodit edellyttävät todennusta (muussa tapauksessa `401`). `GET` suorittaa vain diagnostiikan; `POST` suorittaa
saman tarkistuksen siten, että `autoRepair` on käytössä.

```bash
GET  /api/db/health   # diagnosoi
POST /api/db/health   # diagnosoi + korjaa
```

Vastauksena palautetaan `runDbHealthCheck()`-funktion tuottama `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Toimialueiden budjetit viittasivat API-avaimiin, joita ei enää ole olemassa.",
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

| Kenttä            | Merkitys                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, kun `issues` on tyhjä. `driver` ei koskaan vaikuta siihen.                                                                                                |
| `issues[].type`   | Jokin seuraavista: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                               |
| `repairedCount`   | Tämän suorituksen aikana korjattujen rivien määrä; aina `0`, kun `autoRepair` on epätosi.                                                                         |
| `backupCreated`   | Ilmaisee, luotiinko varmuuskopio ennen korjaamista.                                                                                                               |
| `checkedAt`       | ISO-aikaleima, jota käyttävät sekä suoritus että sen mahdollisesti kirjoittama korjausmerkintä.                                                                   |
| `driver.name`     | Tarkistettua tietokantaa palveleva SQLite-ajuri.                                                                                                                  |
| `driver.degraded` | `true`, kun kirjoituksia ei tallenneta kestävästi tietokantatiedostoon — `sql.js`-WASM-varajärjestelmä (koko tiedoston tallennus) tai muistissa oleva tietokanta. |

Saman tietosisällön palauttaa MCP-työkalu `omniroute_db_health_check`.

Havaitse vioittuminen suorittamalla `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Tulosteen pitäisi olla: ok
```

Jos se palauttaa jotain muuta kuin `ok`, **lopeta tietokannan käyttäminen välittömästi** ja palauta se varmuuskopiosta.

---

## Palautuminen katastrofitilanteesta

### Skenaario 1: WAL-tiedosto on kadonnut

`-wal`-tiedosto puuttuu, mutta `-shm`-tiedosto ja päätietokanta ovat ehjiä:

```bash
# Palautuu automaattisesti seuraavan avaamisen yhteydessä
omniroute
```

Jos SQLite ei pysty palautumaan automaattisesti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Skenaario 2: Päätietokantatiedosto on vioittunut

Palauta varmuuskopiosta:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` lataa vain täydellisen `.tar.gz`-arkiston käynnissä olevalta palvelimelta
(`GET /api/db-backups/exportAll`, operaattorin tunnistetiedot vaaditaan); se ei palauta mitään.

### Skenaario 3: Salausavain on kadonnut

**Palautuminen ei ole mahdollista** ilman avainta. Salattuja kenttiä ei voi lukea. Lisää kaikki palveluntarjoajat uudelleen manuaalisesti uusilla tunnistetiedoilla.

> **Riskin pienentäminen**: Varmuuskopioi salausavain aina erikseen, mieluiten salasanojen hallintaohjelmaan tai KMS-palveluun.

### Skenaario 4: Levy on täynnä

SQLite palauttaa `SQLITE_FULL`-virheitä. Vapauta levytilaa ja suorita sitten:

```bash
# Tee WAL-tarkistuspiste ja vapauta tilaa
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Yleiset toiminnot

### Taulun tarkasteleminen

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Kaikkien taulujen rivien laskeminen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Kaikkien tietojen nollaaminen (poistaminen)

```bash
# Pysäytä ensin OmniRoute
omniroute stop

# Poista tietokantatiedosto
rm ~/.omniroute/storage.sqlite*

# Käynnistä uudelleen (tyhjä tietokanta luodaan uudelleen)
omniroute
```

**Valikoiva** nollaus (säilytä palveluntarjoajat, poista käyttötiedot):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Yksittäisen taulun vieminen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Vianmääritys

### "Tietokanta on lukittu"

Toinen prosessi pitää kirjoituslukkoa. Voit joko:

- Odottaa toisen prosessin valmistumista (tarkista komennolla `lsof | grep storage.sqlite`)
- Lopettaa toisen prosessin
- Käynnistää OmniRouten uudelleen, jos ongelma jatkuu

### "Viiteavainrajoite epäonnistui"

Toimialuemoduuli rikkoo viite-eheyttä. Tarkista:

- Riippuvien taulujen orvot rivit
- Ketjutetut poistot, jotka eivät välittyneet
- Viimeaikainen migraatio, joka muutti viiteavainta

Etsi rikkomukset suorittamalla `PRAGMA foreign_key_check;`.

### "Muisti loppui"

SQLiten muistikartoitettu I/O ylittää käyttöjärjestelmän rajoituksen. Pienennä määrää SQLite-pragmalla:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB 256MB:n sijaan
```

Tai poista käytöstä:

```sql
PRAGMA mmap_size = 0;
```

### "Migraatio epäonnistui kesken suorituksen"

Migraatio suoritettiin transaktiossa, joten sen olisi pitänyt palautua alkuperäiseen tilaan. Jos näin ei tapahtunut:

1. **Pysäytä OmniRoute** (estä uudet yritykset)
2. **Tarkista tietokannan tila** komennolla `sqlite3`
3. **Korjaa osittainen migraatio manuaalisesti**
4. **Käynnistä OmniRoute uudelleen** (migraatiota yritetään uudelleen)

Voit estää tämän testaamalla migraatiot aina ensin kopiolla.

---

## Katso myös

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — käyttötaulut
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — toimintakunnon valvonta
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — julkaisuprosessi
- Lähdekoodi: `src/lib/db/` (yli 80 tiedostoa, noin 25 000 koodiriviä)
