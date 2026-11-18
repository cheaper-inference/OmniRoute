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
server (dešifrovanie + overenie konfigurácie, zosúladenie kurzora)
  → start IPC → izolovaný proces OS exportChild
    → storage.sqlite iba na čítanie → zdieľané dotazovanie/mapovanie záznamov volaní
      → asynchrónne načítanie artefaktov → prepare()/send() cieľa
        → batch IPC → server uloží kurzor → ack IPC
          → ďalšia dávka; done IPC → server zaznamená úspech
```

- **Harmonogram** — jedna úloha cron v `JobRegistry`, `log_export`, s predvolenou hodnotou `0 * * * *` (každú hodinu,
  UTC). Je zaregistrovaná v `src/lib/initCloudSync.ts`; možno ju prepísať pomocou `OMNIROUTE_LOG_EXPORT_CRON`.
  Každé spustenie postupne vyexportuje čakajúce záznamy pre všetky **povolené** ciele.
- **Kurzor** — implicitné `call_logs.rowid` v SQLite, ukladané pre každý cieľ v
  `log_export_destinations.cursor_row_id`. `timestamp` zámerne nie je kurzorom: volajúci
  môžu zadať vlastnú hodnotu, takže pomalá požiadavka sa môže zapísať až po rýchlejšej, ktorá začala
  neskôr, a kurzor založený na časovej pečiatke by ju preskočil.
- **Dávkovanie** — `batch_size` riadkov na požiadavku (predvolene 500), `max_rows_per_run` riadkov na spustenie
  (predvolene 10000), aby sa veľké množstvo nahromadených záznamov spracovalo počas viacerých spustení namiesto blokovania jediného.
- **Doručenie** — kurzor sa posunie až po úspešnom dokončení `send()`. Pri zlyhaní dávky zostane
  kurzor na pôvodnom mieste, takže pri ďalšom spustení sa zopakuje odoslanie rovnakých riadkov. Zárukou je
  doručenie aspoň raz spolu s odstraňovaním duplicít na strane cieľa, nie skutočné doručenie presne raz: BigQuery používa ako kľúč každého
  riadka identifikátor záznamu volania, ktorý rešpektuje v rámci svojho deduplikačného okna bez úplnej záruky.
- **Ochrana pred súbehom** — spustenie cronu a `POST .../run` môžu nastať súčasne. Cieľ,
  ktorého export už prebieha, sa preskočí namiesto dvojitého exportu (`skipped: true` vo výsledku spustenia),
  takže súbežné spustenie nemôže opätovne odoslať dávku ani posunúť kurzor dozadu.
- **Obnova po vymazaní** — ak sa `cursor_row_id` ocitne nad `MAX(rowid)` (celá tabuľka bola
  vymazaná a hodnoty rowid sa začali prideľovať odznova), vykonávací proces vráti kurzor na 0 namiesto toho, aby natrvalo prestal vidieť nové záznamy.

### Izolovaný vykonávací proces a limity

Každé spustenie exportu do cieľa v Node vytvorí samostatný, krátko žijúci podriadený proces OS (`child_process`
s IPC, nie `worker_threads`). Čítanie tiel, parsovanie/serializácia dát JSON, `prepare()`
cieľa a sieťové I/O cieľa prebiehajú v ňom, nie v slučke udalostí servera.
Cez IPC sa prenáša iba konfigurácia a malé správy o priebehu; exportované záznamy sa nikdy nevracajú
na server. Úloha cron aj trasa Spustiť teraz zachovávajú rovnaký verejný výsledok a ochranu pred súbehom.

Podriadený proces otvorí serverom určený súbor `DATA_DIR/storage.sqlite` iba na čítanie pomocou `node:sqlite`,
s nastaveniami `busy_timeout=5000` a `query_only=ON`. Neimportuje žiadny databázový singleton a nevykonáva
migrácie, zálohy ani aktualizácie SQLite. Evidencia chýbajúcich/poškodených artefaktov (vrátane
príkazu UPDATE pre poškodený artefakt) zostáva výhradne v spracovaní detailu na riadiacom paneli. Obe vetvy zdieľajú čistý
resolver detailov; export používa asynchrónne čítanie súborového systému a rovnaké poradie vyhľadávania artefakt → staršie
vložené údaje → staršie údaje na disku → nič. Spustenie zachytí maximálne rowid vložených záznamov
v okamihu, keď podriadený proces otvorí čítač; neskoršie vloženia počkajú na ďalšie spustenie. Ide o hranicu
vkladania, nie o dlhotrvajúcu transakciu SQLite: zápisy do WAL a kontrolné body môžu počas
čakania na sieť voľne pokračovať. Táto hranica nezmrazuje aktualizácie/odstránenia existujúcich riadkov.

Po každej prijatej dávke podriadený proces čaká na potvrdenie. Server najprv uloží
kurzor pomocou `advanceLogExportCursor` a potom odošle `ack`; dovtedy sa ďalšia dávka nezačne.
Zlyhanie odosielania, pád alebo prekročenie časového limitu zaznamená neúspech bez posunutia kurzora pre danú dávku. Predtým
potvrdené dávky zostávajú uložené; opätovne sa môže odoslať najviac jedna nepotvrdená dávka.
Úspech sa zaznamená až po `done` a riadnom ukončení podriadeného procesu. Pri zlyhaní sa podriadený proces ukončí
signálom SIGTERM, po 500 ms sa prípadne použije SIGKILL a vykonávací proces počká na úplné ukončenie procesu.

| Premenná prostredia                           | Predvolená hodnota | Účel                                                   |
| --------------------------------------------- | ------------------ | ------------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000             | Limit reálneho času pre každý cieľ                     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024               | Limit priestoru old-space V8 podriadeného procesu v MB |

Neplatné, nekladné alebo neceločíselné hodnoty sa nahradia predvolenými hodnotami. Nastavenie haldy nepredstavuje celkový
limit RSS; veľmi veľké dávky môžu aj tak vyčerpať pamäť podriadeného procesu a bezpečne ukončiť spustenie neúspechom.
Predvolená hodnota 1024 MB ponecháva rezervu pre predvolenú dávku 500 riadkov s artefaktmi s veľkosťou 512 KiB
a povolenými telami vrátane serializácie JSON pre BigQuery rozdelenej do blokov podľa počtu bajtov. Neznamená to, že
dávka 10000 riadkov s telami je bezpečná. Pri vyčerpaní haldy V8 sa zaznamená zlyhanie s odporúčaním nápravy: znížte veľkosť
dávky alebo zvýšte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kurzor zostane na poslednej
potvrdenej dávke. Historické telá uložené priamo v záznamoch alebo na disku nepodliehajú modernému limitu veľkosti artefaktov.
Prevádzkovatelia musia RSS plánovať samostatne, najmä v kontajneroch s obmedzenou pamäťou.

Podriadený proces dedí iba vyhodnotené `DATA_DIR`, `NODE_ENV`, explicitné `TZ` (starší spôsob
vyhodnocovania miestneho času v názvoch súborov), `ELECTRON_RUN_AS_NODE`, ak je prítomné, a nasledujúce vstupy pre odchádzajúce spojenia:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (a ich varianty s malými písmenami),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globálny dispečer Undici zdieľa so serverom vyhodnocovanie proxy výhradne z prostredia a pravidlá
obchádzania proxy pre lokálnych hostiteľov vrátane `NO_PROXY`; neimportuje `proxyFetch.ts` ani jeho príznaky databázy či funkcií.
Prihlasovacie údaje proxy sa odstraňujú z preposielaného výstupu a zaznamenaných chýb. Prihlasovacie údaje cieľa
sa prenášajú iba v jednej úvodnej správe IPC, nikdy nie cez argv ani prostredie; preposielaný výstup a chyby
dostávajú predponu a očisťujú sa. V argumentoch spustenia podriadeného procesu sa vypína iba `ExperimentalWarning`, aby sa
upozornenie Node na SQLite neopakovalo pri každom spustení cron; ostatné typy upozornení zostávajú viditeľné.

Moduly cieľov musia byť importovateľné bez závislostí od Next.js alebo závislostí určených iba pre server. Existujúca
implementácia BigQuery už túto požiadavku spĺňa. Vyrovnávacie pamäte prístupových tokenov existujú iba počas behu podriadeného
procesu, nie medzi jednotlivými behmi. Podporovaným behovým prostredím je Node (engines v `package.json`), ale sekcia inštalácie Bun
v README a `Dockerfile.bun` tiež uvádzajú cestu ku kompatibilite v produkcii pomocou
`bun:sqlite` (`src/lib/db/core.ts` / adaptéry). V prostredí Bun preto exporty zachovávajú predchádzajúci
spôsob vykonávania v rámci procesu a jednorazovo vypíšu upozornenie: izolácia haldy a časového limitu podriadeného procesu nie je dostupná. Použite
Node na izoláciu slučky udalostí a ochranu pred vyčerpaním pamäte; Bun sa tu nepovažuje za prostredie určené iba na vývoj.

Keď je zapnuté `includeBodies`, uprednostnite interval v ráde minút, napríklad
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, namiesto hromadenia dát čakajúcich na hodinový export.
Limity dávok a riadkov naďalej obmedzujú každý beh. Náklady na spustenie procesu vznikajú pre každý cieľ pri každom behu;
ide o výmenu malých nákladov na spustenie za izoláciu slučky udalostí servera, nie o zníženie celkového využitia CPU.

### Prenášané dáta (prompty a dokončenia)

Export predvolene obsahuje iba súhrnné polia, ktoré zobrazuje **zoznam** protokolov. Zapnutím možnosti
**Exportovať prompty a odpovede** (`includeBodies`) sa navyše prenáša to, čo panel **detailov**
protokolov zobrazuje pre každé volanie:

| Pole                             | Čo obsahuje                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `request_body` / `response_body` | Dáta volania tak, ako ich vykresľuje informačný panel                        |
| `pipeline_route_decision`        | Ktorý cieľ a model smerovač vybral                                           |
| `pipeline_client_request`        | Nespracovaná požiadavka presne tak, ako ju odoslal klient                    |
| `pipeline_openai_request`        | Po prevode do interného formátu OpenAI                                       |
| `pipeline_provider_request`      | V podobe skutočne odoslanej poskytovateľovi, v jeho formáte                  |
| `pipeline_provider_response`     | Nespracovaná odpoveď poskytovateľa                                           |
| `pipeline_client_response`       | Čo bolo vrátené volajúcemu                                                   |
| `pipeline_error`                 | Podrobnosti o chybe na úrovni spracovateľského reťazca pri neúspešnom volaní |
| `bodies_truncated`               | Pravda, ak niektoré z uvedených polí dosiahlo `maxBodyBytes`                 |

Ide o obsah promptov, preto je táto možnosť **predvolene vypnutá** a zámerne sa volí pre každý cieľ osobitne.
Odosiela sa to, čo zobrazuje informačný panel, pretože export a `getCallLogById` zdieľajú vyhodnocovanie
detailov: z prenášaných dát
sa už pri zápise odstraňujú osobné údaje a tajné informácie a volanie vykonané pomocou
kľúča API s `noLog` neukladá žiadne dáta volania, takže nie je čo exportovať.

Dáta volania sa načítavajú pre každý riadok z artefaktu v súborovom systéme, takže dopĺňanie dát prebieha iba pre ciele,
ktoré o ne požiadali. Pri chýbajúcom alebo poškodenom artefakte sa exportuje jeho súhrn s hodnotami null namiesto dát volania,
namiesto toho, aby zlyhala celá dávka a kurzor sa nemohol posunúť ďalej.

`maxBodyBytes` (predvolene 262144) obmedzuje každé pole. Dlhšie dáta sa **skrátia namiesto
zahodenia** — aj skrátený prompt stále odpovedá na otázku „čo sa požadovalo“ — a riadok sa označí príznakom
`bodies_truncated`. Priebežné zmeny streamované po jednotlivých blokoch sa neexportujú; zostavená odpoveď je
už v `pipeline_provider_response` a `pipeline_client_response`.

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
