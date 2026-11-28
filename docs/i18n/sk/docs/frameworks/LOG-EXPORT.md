# Log export (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Priebežný, inkrementálny export záznamov volaní OmniRoute do externého analytického úložiska.

Karta Záznamy na riadiacom paneli uchováva históriu požiadaviek v SQLite (`call_logs`), ktorej rozsah je obmedzený
rotáciou a dobou uchovávania. Export záznamov odosiela rovnakú množinu záznamov podľa harmonogramu, aby sa mohla uchovávať dlhšie než
lokálna databáza a spájať s inými údajmi. BigQuery je prvým cieľom;
spracovateľský reťazec používa register, takže ďalšie ciele možno priebežne pridávať.

---

## 1. Ako to funguje

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Rozvrh** — jedna úloha cron `JobRegistry`, `log_export`, predvolená hodnota `0 * * * *` (hodinu, UTC). Registrované v `src/lib/initCloudSync.ts`; prepísať pomocou `OMNIROUTE_LOG_EXPORT_CRON`. Každý kliešť vyčerpá každý** povolené** cieľ, postupne.
- **Cursor** — SQLite implicitné `call_logs.rowid`, pretrvávajúce na miesto určenia v `log_export_destinations.cursor_row_id`. `timestamp` schválne nie je kurzor: volajúci môžu zadať svoju vlastnú hodnotu, takže pomalú požiadavku možno zapísať za rýchlejšiu požiadavku, ktorá sa začala neskôr, a kurzor časovej pečiatky ju preskočí.
- **Dávkovanie** — `batch_size` riadkov na požiadavku (predvolená hodnota 500), `max_rows_per_run` riadkov na spustenie (predvolená hodnota 10 000), takže veľké nevybavené položky sa vyčerpajú cez niekoľko kusov namiesto blokovania jedného.
- **Doručenie** — kurzor sa posunie dopredu až po vyhodnotení `send()`. Neúspešná dávka ponechá kurzor tam, kde bola, takže rovnaké riadky sa zopakujú pri ďalšom spustení. Zárukou je aspoň raz plus deduplikácia na strane cieľa, nie presne raz: BigQuery označí každý riadok pomocou ID protokolu hovorov, ktoré rešpektuje na základe maximálneho úsilia v rámci vlastného okna na odstránenie duplicitných údajov.
- **Ochrana proti prekrytiu** — cron tick a `POST .../run` môžu strieľať spolu. Cieľ, ktorý sa už vypúšťa, sa radšej preskočí ako vypustí dvakrát (`skipped: true` vo výsledku spustenia), takže súbežné spustenie nemôže znova odoslať dávku alebo zapísať kurzor dozadu.
- **Obnova čistenia** — ak `cursor_row_id` skončí nad `MAX(rowid)` (celá tabuľka bola vyčistená a rowids reštartované), bežec sa pretočí späť na 0 namiesto toho, aby bol permanentne slepý.

### Izolovaný bežec a limity

Každý cieľ spustený na Node spúšťa samostatný, krátkodobý OS podradený proces (`child_process` so IPC, nie `worker_threads`). Čítania tela, užitočné zaťaženie JSON parsing/serialization, cieľové `prepare()` a cieľová sieť I/O všetky bežia tam, nie v slučke udalostí servera. Iba konfigurácia a malé správy o priebehu prechádzajú cez IPC; exportované záznamy sa nikdy nevrátia na server. Úloha cron a trasa Spustiť teraz zachovávajú rovnaký verejný výsledok a ochranu proti prekrývaniu.

Dieťa otvorí vyriešené `DATA_DIR/storage.sqlite` servera len na čítanie pomocou `node:sqlite`, s `busy_timeout=5000` a `query_only=ON`. Neimportuje žiadne DB singleton a nevykonáva žiadne migrácie, zálohy ani aktualizácie SQLite. Účtovníctvo artefaktov Missing/corrupt (vrátane poškodeného artefaktu UPDATE) zostáva iba v ceste podrobností dashboardu. Obe cesty zdieľajú čistý rozkladač detailov; export používa asynchrónne čítanie súborového systému a rovnaký artefakt → legacy inline → legacy disk → žiadne poradie rozlíšenia. Spustenie zosníma maximálny riadok vloženia, keď dieťa otvorí svoju čítačku; neskoršie vložky čakajú na ďalší chod. Toto je hranica vloženia, nie dlhotrvajúca transakcia SQLite : zapisovače a kontrolné body WAL zostávajú počas čakania siete voľné. Updates/deletions existujúcich riadkov nie je zmrazené touto hranicou.

Po každej prijatej dávke dieťa čaká na potvrdenie. Server najprv udrží kurzor pomocou `advanceLogExportCursor`, potom odošle `ack`; žiadna ďalšia dávka nezačne pred ňou. Zlyhanie odosielania, zlyhanie alebo časový limit zaznamenáva zlyhanie bez presunutia tejto dávky. Predtým potvrdené dávky zostávajú záväzné; najviac jednu nepotvrdenú dávku možno znova odoslať. Úspech je zaznamenaný až po `done` a čistom detskom odchode. Zlyhania ukončia dieťa s SIGTERM, eskaláciou na SIGKILL po 500 ms a bežec čaká na ukončenie procesu.

| Premenná prostredia                           | Predvolené | Účel                                     |
| --------------------------------------------- | ---------- | ---------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | Limit nástenných hodín na miesto určenia |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | Detský limit V8 pre starý priestor v MB  |

hodnoty Invalid/non-positive/non-integer používajú predvolené hodnoty. Nastavenie haldy nie je celkovým limitom RSS ; veľmi veľké dávky môžu stále vyčerpať detskú pamäť a bezpečne zlyhať spustenie. Predvolená hodnota 1024 MB ponecháva priestor pre predvolenú 500-riadkovú dávku 512 KiB artefaktov s povolenými telami, vrátane BigQuery serializácie JSON po bajtoch. Nerobí to bezpečnú dávku 10 000-radových karosérií. Vyčerpanie haldy V8 zaznamenáva žalovateľné zlyhanie: znížte veľkosť dávky alebo zvýšte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kurzor zostane na poslednej potvrdenej dávke. Historické telá inline/disk nie sú zakryté krytom moderného artefaktu. Operátori musia rozpočtovať RSS oddelene, najmä v kontajneroch s obmedzenou pamäťou.

Dieťa zdedí iba vyriešené `DATA_DIR`, `NODE_ENV`, explicitné `TZ` (staré rozlíšenie súboru v lokálnom čase), `ELECTRON_RUN_AS_NODE` ak je prítomné, a nasledujúce výstupné vstupy: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (a ich malé písmená), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Globálny dispečer Undici zdieľa čisté rozlíšenie servera s proxy serverom a pravidlá obchádzania lokálneho hostiteľa, vrátane `NO_PROXY`; neimportuje `proxyFetch.ts` ani jeho príznaky DB/feature. Proxy poverenia sú redigované z preposlaného výstupu a zaznamenaných chýb. Cieľové poverenia putujú iba v jednej počiatočnej správe IPC, nikdy nie argv alebo prostredie; Preposielanie output/error je prednastavené a dezinfikované. V argumentoch potomka exec je zakázané iba `ExperimentalWarning`, aby sa predišlo opakovaniu varovania SQLite uzla pri každom spustení cronu; ostatné typy výstrah zostanú viditeľné.

Cieľové moduly musia byť importovateľné bez závislostí Next.js/server-only. Existujúca implementácia BigQuery už túto zmluvu spĺňa. Vyrovnávacie pamäte prístupových tokenov trvajú iba pre podriadený beh, nie pre beh. Node je podporovaný runtime (`package.json` engine). Existuje nepodporovaná cesta kompatibility Bun s najlepším úsilím (`bun:sqlite` v `src/lib/db/core.ts` / adaptéroch a `Dockerfile.bun`), takže exporty sa pod ňou nesmú prerušiť. V rámci Bun si exporty zachovávajú predchádzajúcu procesnú cestu a vydávajú jednorazové upozornenie: izolácia podriadeného heap/timeout nie je k dispozícii. Použite Node na izoláciu slučky udalostí a OOM.

Keď je povolená funkcia `includeBodies`, uprednostňujte kadenciu na úrovni minút, ako napríklad `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` pred hromadením hodinového nevybaveného zaťaženia. Limity dávok a riadkov sú stále viazané na každý cyklus. Spustenie procesu sa platí za miesto určenia a spustenie; toto vymieňa malé počiatočné náklady za izoláciu slučky udalostí servera, neznižuje celkové využitie CPU.

### Užitočné zaťaženie (výzvy a dokončenia)

V predvolenom nastavení export obsahuje iba súhrnné polia Protokoly** zoznam** ukazuje. Zapína sa** Exportujte výzvy a odpovede** (`includeBodies`) dodatočne odošle to, čo denníky** detail** panel zobrazuje pre každý hovor:

| Pole                             | Čo to drží                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `request_body` / `response_body` | Užitočné zaťaženie hovoru sa zobrazuje tak, ako ho zobrazuje prístrojová doska |
| `pipeline_route_decision`        | Ktorý cieľ a model smerovač vybral                                             |
| `pipeline_client_request`        | Surová požiadavka presne tak, ako ju klient poslal                             |
| `pipeline_openai_request`        | Po preložení do vnútorného tvaru OpenAI                                        |
| `pipeline_provider_request`      | Ako sa skutočne odoslalo proti prúdu, v dialekte poskytovateľa                 |
| `pipeline_provider_response`     | Surová odozva proti prúdu                                                      |
| `pipeline_client_response`       | Čo bolo vrátené volajúcemu                                                     |
| `pipeline_error`                 | Podrobnosti o chybe na úrovni kanála pre neúspešné volanie                     |
| `bodies_truncated`               | Pravda, keď ktorékoľvek pole vyššie zasiahne `maxBodyBytes`                    |

Toto je rýchly obsah, tak to je** predvolene vypnuté** a zámerne výber podľa destinácie. To, čo sa dodáva, je to, čo ukazuje tabuľka, pretože export a `getCallLogById` zdieľajú rozlíšenie detailov: užitočné zaťaženia sú už pri písaní dezinfikované PII a upravené tajne a volanie uskutočnené pomocou kľúča `noLog` API neuchováva žiadne užitočné zaťaženie, takže nie je čo exportovať.

Užitočné zaťaženia sa čítajú po riadkoch z artefaktu súborového systému, takže hydratácia prebieha len pre ciele, ktoré si to vyžiadali. Chýbajúci alebo poškodený artefakt exportuje svoj súhrn s nulovým užitočným zaťažením namiesto toho, aby zlyhal v dávke a uviaznul kurzor.

`maxBodyBytes` (predvolená hodnota 262144) uzatvára každé pole. Dlhšie užitočné zaťaženia sú** skôr skrátené ako vypustené** — orezaná výzva stále odpovedá na otázku „čo bolo požiadané“ — a riadok je označený príznakom `bodies_truncated`. Streamované delty po kúskoch sa neexportujú; zostavená odpoveď je už v `pipeline_provider_response` a `pipeline_client_response`.

---

## 2. Súbory

| Súčasť                                | Umiestnenie                                  |
| ------------------------------------- | -------------------------------------------- |
| Kontrakt cieľa                        | `src/lib/logExport/types.ts`                 |
| Register                              | `src/lib/logExport/registry.ts`              |
| Správa tajných údajov                 | `src/lib/logExport/secrets.ts`               |
| Spúšťač (IPC nadradeného procesu)     | `src/lib/logExport/runner.ts`                |
| Životný cyklus procesu                | `src/lib/logExport/childRunner.ts`           |
| Vstupný bod podradeného procesu       | `src/lib/logExport/exportChild.ts`           |
| Otváranie iba na čítanie              | `src/lib/db/logExportReadOnly.ts`            |
| Zdieľané dotazy/mapovanie             | `src/lib/usage/callLogExportQueries.ts`      |
| Riešenie detailov                     | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekcia API                         | `src/lib/logExport/presenter.ts`             |
| Cieľ BigQuery                         | `src/lib/logExport/destinations/bigquery.ts` |
| Autentifikácia servisného účtu Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Zdroj denníka volaní                  | `src/lib/usage/callLogExportSource.ts`       |
| Trvalé ukladanie                      | `src/lib/db/logExportDestinations.ts`        |
| Úloha cron                            | `src/lib/jobs/logExportJob.ts`               |
| Vrstva REST                           | `src/app/api/log-export/`                    |
| Stránka ovládacieho panela            | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Všetky trasy vyžadujú autentifikáciu pre správu (`requireManagementAuth`). Tajné údaje sa nikdy nevracajú:
uložený tajný údaj sa vráti ako literál `__stored__` a odoslanie tejto hodnoty späť pri aktualizácii
zachová uložený prihlasovací údaj.

Vytvorenie alebo aktualizácia cieľa, ktorého typ deklaruje tajný údaj, **vyžaduje
`STORAGE_ENCRYPTION_KEY`**. Bez neho `encrypt()` potichu prepúšťa údaje bez zmeny, takže zápis sa
odmietne s kódom 400 namiesto uloženia prihlasovacieho údaja do SQLite v otvorenom texte (rovnakú ochranu
používa aj webhook Telegramu).

| Metóda   | Cesta                                    | Účel                                                                                   |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy cieľov + zoznam ich konfiguračných polí                                           |
| `GET`    | `/api/log-export/destinations`           | Zoznam cieľov (tajné údaje skryté)                                                     |
| `POST`   | `/api/log-export/destinations`           | Vytvorenie cieľa                                                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Načítanie jedného cieľa                                                                |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizácia názvu / povolenia / konfigurácie / dávkovania                             |
| `DELETE` | `/api/log-export/destinations/{id}`      | Odstránenie                                                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | Overenie prihlasovacích údajov bez zápisu                                              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Okamžité spracovanie čakajúcich záznamov rovnakým postupom ako pri plánovanom spustení |
| `GET`    | `/api/log-export/status`                 | Stav cronu, nedávne spustenia, čakajúce záznamy pre každý cieľ                         |

`GET /api/log-export/types` umožňuje univerzálne používateľské rozhranie: formulár ovládacieho panela sa vykresľuje
na základe vrátených deskriptorov polí, takže nový cieľ nevyžaduje žiadnu zmenu používateľského rozhrania.

---

## 4. Cieľ BigQuery

Konfiguračné kľúče (`type: "bigquery"`):

| Kľúč                 | Poznámky                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP projekt obsahujúci dataset                                                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                         |
| `location`           | Používa sa iba vtedy, keď je potrebné vytvoriť dataset (predvolene `EU`)                                |
| `serviceAccountJson` | Kľúč účtu služby. Tajné: šifrované v pokoji, nikdy sa nevracia                                          |
| `autoCreate`         | Vytvorí chýbajúci dataset/tabuľku; podmienečne pridá nullable stĺpce usage-evidence (predvolene `true`) |

Účet služby potrebuje oprávnenie `bigquery.tables.updateData` v cieľovej tabuľke a tiež
`bigquery.datasets.create` / `bigquery.tables.create`, keď je zapnuté `autoCreate`.
Aktualizácia existujúcej tabuľky s cieľom pridať dve nullable polia usage-evidence tiež vyžaduje
`bigquery.tables.update`. Chýbajúce oprávnenie zlyhá export bez posunutia kurzora.

Konfigurovaná dávka je jednotka **kurzora**, nie HTTP: `send()` ju rozdelí na volania insertAll
s najviac 500 riadkami, takže veľká hodnota `batch_size` nemôže prekročiť limit požiadavky
BigQuery 10 MB. Dočasné stavy (408/429/500/502/503/504) sa opakujú najviac trikrát s exponenciálnym
spätným odskokom a s opätovným použitím rovnakých insertIds; zlyhania autentifikácie a schémy
vyvolajú chybu pri prvom pokuse namiesto toho, aby spotrebovali celé spustenie.

Tabuľka vytvorená pred chvíľou ešte nie je viditeľná pre streamingový endpoint, ktorý niekoľko
sekúnd odpovedá stavom 404. Tento stav sa opakuje, ale **iba vtedy, keď táto dávka vytvorila tabuľku** —
skutočne chýbajúca tabuľka zlyhá okamžite. Upozorňujeme, že opätovné vytvorenie tabuľky pod názvom,
ktorý bol nedávno odstránený, spôsobí, že BigQuery niekoľko minút odmieta streamingové vloženia;
ide o vlastnosť operácie odstránenia a opätovného vytvorenia, preto namiesto odstránenia a opätovného
pridania uprednostnite nový názov tabuľky.

**Čiastočné zlyhanie prichádza ako HTTP 200 s neprázdnym `insertErrors[]`.** Považuje sa to za
zlyhanie a vyvolá chybu, čím sa zabráni posunutiu kurzora za riadky, ktoré BigQuery nikdy neprijal;
správanie je overené v `tests/unit/log-export-bigquery.test.ts`.

Prenos používa obyčajný REST — self-signed tvrdenie RS256 sa vymení za prístupový token na adrese
`https://oauth2.googleapis.com/token`, potom sa riadky odošlú do `tabledata.insertAll`. Žiadny Google SDK
sa nepridáva. Prístupové tokeny sa ukladajú do vyrovnávacej pamäte v rámci procesu podľa dvojice
(účet služby, rozsah).

Vytvorená tabuľka obsahuje jeden stĺpec pre každé pole z karty Logs a tiež `exported_at` a je
navrhnutá podľa toho, ako sa protokoly volaní v skutočnosti dotazujú:

- **Rozdelená podľa dní na základe `timestamp`**, takže dotaz obmedzený dátumom prehľadáva iba tieto dni.
- **Klastrovaná podľa `api_key_name`, `provider`, `model`, `status`** (v tomto poradí), takže filtrovanie podľa
  toho, kto ju spustil, kam smerovala alebo či zlyhala, orezáva bloky v rámci každého oddielu. BigQuery
  povoľuje najviac štyri klastrovacie stĺpce a na poradí záleží: filter iba na `api_key_name`
  orezáva bloky, filter iba na `status` nie.
- **Voliteľné uchovávanie oddielov** prostredníctvom `partitionExpirationDays` (hodnota 0 uchováva všetko),
  použité pri vytvorení tabuľky.

Obe nastavenia sa uplatnia pri vytvorení. Existujúca tabuľka si zachová svoje aktuálne usporiadanie,
preto ak ich chcete prijať, nasmerujte cieľ na nové ID tabuľky.

`tests/unit/log-export-bigquery.test.ts` overuje, že mapovač a schéma tabuľky zostávajú zosúladené,
takže nový stĺpec protokolu volania nemožno pri exporte ticho vynechať.

Dávky sa rozdeľujú podľa **počtu riadkov aj serializovaných bajtov**. Samotný počet riadkov nestačí,
keď sa exportujú payloady: 500 riadkov obsahujúcich prompty môže mať desiatky megabajtov a insertAll
odmieta požiadavku väčšiu než 10 MB. Časti sa uzatvárajú pri 500 riadkoch alebo 9 MB, podľa toho,
čo nastane skôr.

---

## 5. Cieľové umiestnenie trás OTLP/HTTP

Konfigurácia používa `type: "otlp-http"`. Ide o plánovaný export trvalých protokolov
volaní podporovaný kurzorom, nie o best-effort sink živých smerovacích udalostí v
`open-sse/services/routing/otel.ts`. Nečíta ani nemení premenné prostredia, časovače
ani buffery tohto sinku. Povolenie oboch môže vytvoriť dva nezávislé druhy spanov;
na ich rozlíšenie použite inštrumentačný scope `omniroute.log-export` pre tieto spany
protokolov volaní.

| Kľúč                     | Predvolené nastavenie / účel                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `endpoint`               | Vyžaduje úplnú URL trás HTTP(S); prípona `/v1/traces` sa nepridáva                        |
| `headers`                | Voliteľné riadky `Name: value` alebo objekt JSON s reťazcami; šifrované                   |
| `requestHeaderAllowlist` | Prázdne (vypnuté); názvy/prefixy hlavičiek klienta, ktoré sa zachytia ako atribúty spanov |
| `serviceName`            | `omniroute`; zdroj `service.name`                                                         |
| `langfuseMapping`        | `false`; pridáva atribúty generovania relácie/používateľa Langfuse                        |
| `identity`               | `pseudonymous`, `keyName` alebo `none`                                                    |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                   |
| `timeoutMs`              | `30000` na každý pokus HTTP                                                               |
| `environment`            | Nenastavené; voliteľné `langfuse.environment`                                             |

Generický dashboard zobrazuje tieto polia. `paths` prijíma pole API alebo textové pole
s presnými cestami oddelenými novými riadkami/čiarkami. Embeddings, rerank a ďalšie
cesty sa preskočia, ak nie sú explicitne povolené. Preskočené riadky stále posúvajú
kurzor; počítadlá `exported`/`exportedTotal` existujúceho runnera počítajú spracované
zdrojové riadky vrátane filtrovaných riadkov, nie prijaté spany. Filtrovanie sa vykonáva
v child procese bez zmeny jeho kontraktu IPC/kurzora.

Overovanie URL používa pomocnú funkciu bez závislosti od DB
`parseAndValidateNonMetadataUrl` zo súboru
`src/shared/network/outboundUrlGuard.ts`: politiku `block-metadata`. Má rovnaké
bezpodmienečné kontroly metadát/protokolu/vložených prihlasovacích údajov ako validátor
webhookov, pričom privátne URL sú povolené, ale zámerne povoľuje ciele localhost/LAN
bez globálneho prepísania príznaku funkcie. To umožňuje koncové body self-hosted
Langfuse, Phoenix, Tempo a Collector vrátane privátnych koncových bodov HTTP. Hostitelia
cloudových metadát sú vždy blokovaní. Presmerovania sa nesledujú, takže collector
nemôže presmerovať prihlasovacie údaje na iného hostiteľa. Rovnako ako existujúca
lexikálna ochrana URL, ani táto ochrana nepripína rozlíšenie DNS; konfigurujte iba
hostiteľov kontrolovaných operátorom. Ak koncový bod nie je v dôveryhodnej sieti,
uprednostnite HTTPS.

### Užitočné dáta a doručovanie

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) prenáša
jeden span CLIENT pre každý povolený riadok, pomenovaný podľa jeho presnej cesty
požiadavky. Pomenovanie podľa cesty rozlišuje Chat Completions, Responses a Messages
bez vloženia údajov o modeli alebo identite do názvu spanu. Atribúty zdroja zahŕňajú
`service.name` a `service.version` balíka.

Bežný logger pokusov chatu (`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` pri dokončení a neposkytuje časovú pečiatku;
`saveCallLogOperation` v `src/lib/usage/callLogs.ts` predvolene nastavuje časovú pečiatku
na čas zápisu (dokončenia). Export preto nastavuje koniec na časovú pečiatku riadku
a začiatok na koniec − trvanie (v milisekundách prevedené na desiatkové nanosekundy).
Historické časové pečiatky zadané volajúcim sa tiež zachovajú ako čas konca; neexistuje
rozlíšenie začiatku/dokončenia na úrovni jednotlivých riadkov. Hodnota null pre trvanie
sa zmení na nulu. Neplatné/chýbajúce časové pečiatky spôsobia zlyhanie dávky namiesto
vytvorenia nedeterministických spanov. `ttftMs` môže mať hodnotu null a mapuje sa na
`omniroute.ttft_ms`.

Atribúty zahŕňajú `gen_ai.operation.name="chat"`, poskytovateľa, požadovaný/vrátený
model, vstupné/výstupné tokeny, voliteľné tokeny načítania/vytvorenia cache a tokeny
reasoningu, stav HTTP, kombináciu, zdroj cache, značku relácie a ID korelácie. Celočíselné
hodnoty a časové pečiatky OTLP sú desiatkové reťazce; reťazce, booleany a zlomkové čísla
používajú natívne varianty hodnôt OTLP. Chybové spany majú stav ERROR a vyčistenú správu
stavu. Kanonický záznam neobsahuje URL hostiteľa upstreamu, preto sa `server.address`
vynecháva namiesto nesprávnej identifikácie collectora ako servera modelu. Cena sa
neexportuje.

Obsah sa načíta iba v prípade `includeBodies=true`. Pri
`langfuseMapping=false` obsahujú `gen_ai.input.messages` / `gen_ai.output.messages`
vyčistené JSON tela požiadavky/odpovede tak, ako ich uložil OmniRoute (kanonizované,
ak sa dajú analyzovať), nie preformátované pole správ semconv. Skrátené/ne-JSON telá
zostávajú nespracovaným textom. Pri `langfuseMapping=true` sa telá emitujú iba ako
`langfuse.observation.input` / `langfuse.observation.output`; atribúty
`gen_ai.*.messages` sa vynechávajú, aby sa každé telo odoslalo iba raz. Oba režimy
dedia `maxBodyBytes` z existujúcej cesty načítania;
`omniroute.bodies_truncated=true` označuje skrátenie.
Tento cieľ nepridáva žiadne ďalšie snímky pipeline ani načítania nevyčistených artefaktov;
voliteľné zachytávanie hlavičiek požiadavky používa existujúcu načítanú snímku klienta
opísanú nižšie. Pri exporte tiel používajte minútovú frekvenciu, napríklad
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, namiesto hromadenia hodinového backlogu.

### Voliteľné hlavičky požiadavky klienta

Zachytávanie hlavičiek je **predvolene vypnuté**. Nastavte `requestHeaderAllowlist`
v konfigurácii cieľa a povoľte **Export prompts and responses**
(`includeBodies: true` v cieli).
Allowlist prijíma pole API alebo textové pole s názvami oddelenými novými riadkami/čiarkami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Názvy sa porovnávajú bez rozlíšenia veľkosti písmen a presne, s výnimkou jediného koncového znaku `*`, ktorý vyberá neprázdnu
predponu názvu hlavičky. Samostatný znak `*`, vložené zástupné znaky a neplatné názvy hlavičiek HTTP sa odmietajú.
Existuje najviac 64 selektorov, pričom každý z nich má názov alebo predponu s dĺžkou najviac 256 bajtov ASCII.
Toto nastavenie je oddelené od `headers`, ktoré overuje exportér voči kolektoru.

Zachytávanie číta iba z `pipeline_client_request`, naplneného z uloženého podrobného pipeline pomocou
`clientRawRequest` (alebo staršieho `clientRequest`). Nikdy sa nepoužijú hlavičky požiadavky poskytovateľa ako
záložný zdroj. Podrobné zaznamenávanie pipeline muselo byť povolené v čase zaznamenania požiadavky. Ak je
`includeBodies` zakázané alebo chýba, je poškodený či skrátený JSON snímky klienta, žiadne atribúty hlavičiek sa
nevygenerujú. Zvýšenie `maxBodyBytes` môže zabrániť skráteniu snímky v čase exportu; nedokáže obnoviť podrobnosti,
ktoré sa nikdy neuložili. Snímka väčšia než 1 MiB alebo obsahujúca viac než 256 položiek hlavičiek sa ignoruje.
Existujúci export požiadaviek a odpovedí zostáva povolený spolu so zachytávaním hlavičiek; zoznam povolených
hlavičiek neposkytuje režim hydratácie iba hlavičiek.

Vybrané hodnoty sa stanú poľami reťazcov OTLP
`http.request.header.<full lowercase header name>`, a to aj v prípade jedného reťazca. Napríklad
`X-OmniRoute-Meta-Team: example-team` sa stane poľom
`http.request.header.x-omniroute-meta-team` s hodnotou
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Celá predpona sa zachová: ide o bežné hlavičky bez analýzy obchodných polí a bez konverzie na
`omniroute.metadata.*` alebo metadáta Langfuse. `langfuseMapping` nemení sémantiku hlavičiek. Vybraná hlavička
`User-Agent` s jedinou hodnotou zároveň nastaví štandardné skalárne pole `user_agent.original`. Čiarky v rámci
jednej hodnoty sa nerozdeľujú. Varianty s rôznou veľkosťou písmen sa zlúčia v poradí uložených položiek; akýkoľvek
neplatný variant spôsobí vynechanie celej danej hlavičky. Atribúty sú usporiadané podľa názvu prevedeného na malé
písmená.

Hlavičky Authorization, Proxy-Authorization, Cookie, Set-Cookie, hlavičky s API kľúčmi, názvy obsahujúce
značky auth/token/secret/password/credential a interné poverenia brány sa vždy vylúčia, aj keď sú vybrané alebo
v úložisku čiastočne zamaskované. Známe vzory poverení opätovne používajú zdieľaný detektor poverení; značky
redakcie sa vynechajú a neexportujú sa ako bezpečné hodnoty. Akceptujú sa iba reťazce a neprázdne polia reťazcov;
čísla ani objekty sa nekonvertujú. Neplatné názvy, kľúče prototypu, riadiace znaky (okrem horizontálneho tabulátora)
a chybne vytvorený Unicode sa ignorujú bez zlyhania dávky alebo odrazenia ich obsahu v chybách.

Každé rozpätie zachytí najviac 32 hlavičiek, 16 hodnôt na hlavičku, 4096 bajtov UTF-8 na hodnotu
a celkovo 16384 bajtov UTF-8 naprieč zachytenými názvami hlavičiek a hodnotami. Príliš veľké alebo neplatné
hlavičky sa vynechajú celé, neskracujú sa. Výber je rozhodnutím prevádzkovateľa týkajúcim sa ochrany súkromia:
aj názvy, ktoré vyzerajú bezpečne, môžu obsahovať osobné údaje a tieto limity ani detektory nie sú všeobecným
nástrojom na odstránenie PII.

### Limity doručovania

Požiadavky sú obmedzené na 500 rozpätí a 4 MiB JSON v kódovaní UTF-8 vrátane obálky.
Každé povolené rozpätie sa skontroluje z hľadiska veľkosti pred prvou požiadavkou dávky kurzora. Ak je jednotlivé
rozpätie väčšie než limit, neodošle sa žiadna časť danej dávky a operácia zlyhá s pokynom na zníženie
`maxBodyBytes`; rozpätie sa neodstráni potichu. Predbežná kontrola uchováva iba odkazy na záznamy
a počty bajtov, pričom zahodí každé dočasné rozpätie/JSON; rozpätia sa vytvárajú znova pre obmedzené časti,
aby sa neuchovávala druhá serializovaná kópia dávky. HTTP 408/429/5xx, zlyhania siete a časové limity dostanú najviac
tri pokusy s exponenciálnym oneskorením 250/500 ms. Hodnoty `Retry-After` v sekundách alebo dátumy HTTP
môžu predĺžiť oneskorenie až na 5 sekúnd. Ostatné stavy spôsobia okamžité zlyhanie. Čiastočné odmietnutie OTLP
pri stave 2xx tiež vyvolá chybu namiesto potvrdenia strateného rozpätia; prázdne alebo platné potvrdenia JSON sa
akceptujú s limitom 64 KiB na načítanie odpovede.

Chyby obsahujú iba skutočnosti vlastné exportéru: stav HTTP, triedu opakovania, počet pokusov a počty odoslaných
rozpätí alebo pevne stanovené znenie o zlyhaní potvrdenia/siete. Telesá odpovedí kolektora, počty čiastočných
úspechov a hlavičky odpovedí sa nikdy nekopírujú do chýb, protokolov ani dashboardu. Neúspešná alebo čiastočne
prijatá dávka sa nepotvrdí: cieľ zobrazí stav Failing s daným stavom, kurzor zostane pri poslednej potvrdenej
dávke a pri ďalšom spustení sa odošlú tie isté riadky. Trvalé stavy zostávajú v stave zlyhania, kým sa neopraví
kolektor alebo konfigurácia. Podrobnosti o odpovedi nájdete vo vlastných protokoloch kolektora. Samostatná
redakcia súhrnov chýb v protokole volaní zostáva zachovaná.
`prepare()` nič nezriaďuje; Test odošle presne `{"resourceSpans":[]}` a nahlási
stav HTTP bez zápisu rozpätí do protokolu volaní.

ID trás a ID rozpätí sú prvých 32/16 hexadecimálnych číslic SHA-256 nad
`"omniroute.trace\\0" + callLogId` a `"omniroute.span\\0" + callLogId`. Opakované odoslania
používajú rovnaké ID. Nejde o záruku deduplikácie: niektoré backendy vrátane príjmu Langfuse v4
nededuplikujú rozpätia s rovnakým ID. Zlyhanie po páde alebo čiastočnom spracovaní časti môže znova odoslať
najviac jednu nepotvrdenú dávku kurzora; celá táto dávka môže byť duplikovaná, nielen jej posledná časť HTTP.
Pri výbere veľkosti dávky kurzora zohľadnite tento kompromis.

### Príklad Langfuse

Pre inštanciu Langfuse hostovanú vo vlastnej infraštruktúre nakonfigurujte tieto polia:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Hodnotu Authorization vytvorte lokálne ako Base64 doslovného reťazca `public-key:secret-key`
(napríklad pomocou `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Skutočné poverenia nevkladajte do protokolov, snímok obrazovky ani hlásení problémov. Mapovanie automaticky
nastaví `x-langfuse-ingestion-version: 4`; Authorization sa stále zadáva v `headers`.
Hlavičky aj vygenerovaný soľovací reťazec identity používajú existujúci mechanizmus šifrovaných polí s
zástupnými symbolmi API; vyžaduje sa `STORAGE_ENCRYPTION_KEY`.

Mapovanie pridáva typ/model generovania, podrobnosti o použití JSON (vstup/výstup/celkom a dostupné
kľúče vyrovnávacej pamäte), snímky vstupu/výstupu JSON, úroveň ERROR/DEFAULT, sanitizovanú stavovú
správu, názov trasovania, ID relácie, voliteľné prostredie a filtrovateľné
`langfuse.observation.metadata.<key>` pre poskytovateľa, požadovaný model, cestu, kombináciu, zdroj vyrovnávacej pamäte
a stav. `langfuse.observation.completion_start_time` je vo formáte ISO 8601 na
začiatku + TTFT iba vtedy, keď je TTFT známe a nachádza sa v rámci trvania. Atribúty nákladov sa neposielajú.

Režimy identity sa vzťahujú na `langfuse.user.id`:

- `pseudonymous` (predvolené): HMAC-SHA256 interného ID kľúča API s náhodným
  32-bajtovým saltom pre každý cieľ. Salt sa pri vytvorení vygeneruje, ak chýba, zašifruje
  ako `identitySalt`, nikdy sa nevracia a pri úpravách sa zachováva. Nespracované ID kľúčov sa nikdy
  nevkladajú do atribútov spanov. Opätovné vytvorenie alebo rotácia saltu cieľa zmení identity.
- `keyName`: nakonfigurovaný názov kľúča API, ktorý zámerne odhaľuje tento štítok operátora.
- `none`: bez ID používateľa. Značky relácie sa naďalej exportujú, ak sú k dispozícii; tieto režimy
  neanonymizujú ľubovoľný obsah promptov ani štítky relácií/korelácie zadané operátorom.

### Začatie bez spätného doplnenia

Iba pri vytváraní povoľte **Začať od aktuálnej pozície (preskočiť existujúce protokoly)** alebo odošlite
`startFromCurrentPosition: true` na najvyššej úrovni dátovej časti požiadavky create API. Inicializuje
`cursor_row_id` na aktuálne maximálne zachované rowid protokolu volaní pomocou existujúcich pomocných
funkcií kurzora bez migrácie. Predvolená hodnota je false (kurzor 0 a spätné doplnenie zachovanej histórie).
Nejde o nastavenie na reset kurzora pri aktualizácii.

Zdieľané pridanie `ttftMs` tiež pridáva stĺpec s hodnotou null `ttft_ms` do mapovača BigQuery
a schémy novej tabuľky: test schémy vyžaduje, aby každé kanonické pole záznamu malo stĺpec. Existujúce tabuľky
naďalej exportujú údaje bez zmien: `prepare()` načíta schému tabuľky a vynechá iba `ttft_ms`, keď tento stĺpec
chýba. Pridajte stĺpec INT64 s hodnotou null, aby ste získali TTFT pri ďalšom spustení, alebo použite novú tabuľku. Voliteľný stĺpec TTFT nespúšťa aktualizáciu schémy. Stĺpce s dôkazmi o použití
sa riadia nižšie uvedeným podmieneným tokom kompatibility s explicitným povolením; ostatné polia riadkov si zachovávajú prísnu kontrolu schémy.

---

## 6. Pridanie cieľa

1. Vytvorte `src/lib/logExport/destinations/<name>.ts`, ktorý exportuje `LogExportDestinationType`:
   Zod `configSchema`, pole deskriptorov `fields` pre používateľské rozhranie, `secretFields` a
   `createClient(config)`, ktorý vracia `test()` / `prepare()` / `send(records)`.
2. Pridajte ho do poľa `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napíšte testy v `tests/unit/`.

To je celá zmena: ukladanie údajov, úloha cron, vrstva REST, šifrovanie tajných údajov aj
formulár na ovládacom paneli čítajú register.

Dve pravidlá pre nový cieľ:

- `send()` **musí vyhodiť výnimku** pri čiastočnom zlyhaní. Úspešné dokončenie znamená „cieľ má tieto riadky“
  a kurzor sa natrvalo posunie za ne.
- Cieľ, ktorý prijíma URL zadanú používateľom, ju musí pred načítaním overiť pomocou
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  rovnako ako webhooky. BigQuery to nepotrebuje: jeho hostitelia sú konštanty.

---

## 7. Používanie

- **Ovládací panel**: Integrácie → Export protokolov. Pridajte cieľ, spustite **Test** na overenie poverení
  bez zápisu riadkov a potom ho povoľte.
- **Nevybavené položky**: karta každého cieľa zobrazuje čakajúce riadky a kurzor; `GET
/api/log-export/status` vracia rovnaké údaje a posledných 20 spustení úloh.
- **Zlyhanie cieľa nespôsobí zlyhanie ostatných** — súhrn spustenia zaznamenáva stav jednotlivých cieľov
  v `last_status` / `last_error` a história spustení úloh uchováva súhrnný stav.
- **Odstránením cieľa sa odstráni jeho kurzor.** Opätovné pridanie začne od najstaršieho uchovaného
  záznamu volania, takže odošle riadky, ktoré už cieľ môže obsahovať. V BigQuery `insertId` potláča
  duplikáty iba v rámci vlastného okna deduplikácie BigQuery, preto namiesto odstránenia cieľ radšej
  deaktivujte.

### Kompatibilita schémy dôkazov o používaní

Nové tabuľky BigQuery obsahujú nullable `usage_evidence` (STRING obsahujúci JSON) a
`usage_estimated` (BOOL). Ak je povolené `autoCreate`, existujúca tabuľka môže dostať
iba tieto chýbajúce nullable stĺpce. Exportér zachová celú existujúcu schému vrátane metadát polí
a odošle podmienený PATCH s použitím vráteného etagu `etag`. Súbežná zmena schémy spôsobí zlyhanie
exportu namiesto jej prepísania; pri ďalšom spustení sa tabuľka načíta znova.

Ak je `autoCreate` zakázané, pred exportom záznamov s dôkazmi o používaní pridajte tieto stĺpce
sami. Chýbajúce metadáta schémy alebo etagu, prípadne neúspešná aktualizácia, tiež zabránia
vkladaniu záznamov obsahujúcich dôkazy. Kurzor exportu sa pri takomto zlyhaní neposunie
a dôkazy sa nikdy potichu nevynechajú. Počas zablokovaného exportu sa naďalej uplatňuje lokálne
uchovávanie protokolov, preto zlyhanie vyriešte skôr, než uplynie doba uchovávania zdrojových riadkov.
