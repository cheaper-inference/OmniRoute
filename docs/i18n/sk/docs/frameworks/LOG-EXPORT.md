# Log export (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Priebežný, inkrementálny export protokolov volaní OmniRoute do externého analytického úložiska.

Karta informačného panela Logs uchováva históriu požiadaviek v SQLite (`call_logs`), pričom jej rozsah je obmedzený
rotáciou a dobou uchovávania. Export protokolov odosiela rovnakú množinu záznamov podľa plánu, aby pretrvala
dlhšie než lokálna databáza a mohla sa prepájať s ďalšími údajmi. BigQuery je prvým cieľom;
pipeline používa register, takže ďalšie ciele možno jednoducho pridávať.

---

## 1. Ako to funguje

```
server (dešifrovanie + overenie konfigurácie, zosúladenie kurzora)
  → spustenie IPC → izolovaný proces OS exportChild
    → storage.sqlite iba na čítanie → zdieľaný dopyt/mapovanie denníka volaní
      → asynchrónne načítanie artefaktov → cieľové prepare()/send()
        → dávkové IPC → server uloží kurzor → potvrdzovacie IPC
          → ďalšia dávka; IPC done → server zaznamená úspech
```

- **Plánovanie** — jedna cron úloha `JobRegistry`, `log_export`, predvolene `0 * * * *` (každú hodinu,
  UTC). Registruje sa v `src/lib/initCloudSync.ts`; možno ju prepísať pomocou `OMNIROUTE_LOG_EXPORT_CRON`.
  Každé spustenie postupne spracuje všetky **povolené** ciele.
- **Kurzor** — implicitný `call_logs.rowid` databázy SQLite, ukladaný samostatne pre každý cieľ v
  `log_export_destinations.cursor_row_id`. `timestamp` zámerne nie je kurzorom: volajúci
  môžu poskytnúť vlastnú hodnotu, takže pomalá požiadavka môže byť zapísaná po rýchlejšej požiadavke,
  ktorá sa začala neskôr, a kurzor založený na časovej pečiatke by ju preskočil.
- **Dávkovanie** — `batch_size` riadkov na požiadavku (predvolene 500), `max_rows_per_run` riadkov na jedno spustenie
  (predvolene 10000), aby sa veľké oneskorenie spracovalo počas viacerých spustení namiesto zablokovania jedného.
- **Doručenie** — kurzor sa posunie až po úspešnom dokončení `send()`. Neúspešná dávka ponechá
  kurzor na pôvodnom mieste, takže rovnaké riadky sa opätovne odošlú pri ďalšom spustení. Zárukou je
  doručenie aspoň raz spolu s odstraňovaním duplicít na strane cieľa, nie skutočné doručenie presne raz: BigQuery identifikuje každý
  riadok podľa ID denníka volaní, ktoré rešpektuje podľa možností v rámci vlastného okna na odstraňovanie duplicít.
- **Ochrana proti súbehu** — cron spustenie a `POST .../run` sa môžu vykonať súčasne. Cieľ,
  ktorý sa už spracúva, sa preskočí namiesto druhého súbežného spracovania (`skipped: true` vo výsledku spustenia),
  takže súbežné spustenie nemôže znovu odoslať dávku ani zapísať kurzor smerom späť.
- **Obnova po vyčistení** — ak sa `cursor_row_id` dostane nad `MAX(rowid)` (celá tabuľka bola
  vyčistená a číslovanie riadkov sa reštartovalo), vykonávací proces vráti kurzor na 0, aby nezostal natrvalo nefunkčný.

### Izolovaný vykonávací proces a limity

Každé spustenie cieľa v Node vytvorí samostatný krátkodobý podriadený proces OS (`child_process`
s IPC, nie `worker_threads`). Čítanie tiel, analýza/serializácia JSON dát, cieľové
`prepare()` a sieťové I/O cieľa sa vykonávajú v ňom, nie v slučke udalostí servera.
Cez IPC prechádza iba konfigurácia a malé správy o priebehu; exportované záznamy sa na
server nikdy nevracajú. Cron úloha a trasa Spustiť teraz zachovávajú rovnaký verejný výsledok a ochranu proti súbehu.

Podriadený proces otvorí serverom určený súbor `DATA_DIR/storage.sqlite` iba na čítanie pomocou `node:sqlite`,
s `busy_timeout=5000` a `query_only=ON`. Neimportuje žiadnu zdieľanú inštanciu DB a nevykonáva
žiadne migrácie, zálohy ani aktualizácie SQLite. Evidencia chýbajúcich/poškodených artefaktov (vrátane
UPDATE poškodeného artefaktu) zostáva iba v ceste podrobností ovládacieho panela. Obe cesty zdieľajú čistý
resolver podrobností; export používa asynchrónne čítanie súborového systému a rovnaké poradie rozlíšenia
artefakt → staršie vložené dáta → staršie dáta na disku → nič. Pri otvorení čítačky podriadeným procesom sa
pre dané spustenie zaznamená maximálny rowid vloženia; neskoršie vloženia počkajú na ďalšie spustenie.
Ide o hranicu vloženia, nie o dlhodobú transakciu SQLite: procesy zapisujúce do WAL aj kontrolné body
môžu počas čakania na sieť voľne pokračovať. Aktualizácie/odstránenia existujúcich riadkov nie sú touto hranicou zmrazené.

Po každej prijatej dávke podriadený proces čaká na potvrdenie. Server najprv uloží
kurzor pomocou `advanceLogExportCursor` a potom odošle `ack`; predtým sa nezačne žiadna ďalšia dávka.
Zlyhanie odoslania, pád alebo vypršanie časového limitu zaznamená zlyhanie bez posunutia kurzora pre danú dávku. Predtým
potvrdené dávky zostávajú uložené; nanajvýš jedna nepotvrdená dávka môže byť odoslaná znova.
Úspech sa zaznamená až po `done` a korektnom ukončení podriadeného procesu. Pri zlyhaniach sa podriadený proces
ukončí signálom SIGTERM, ktorý sa po 500 ms zmení na SIGKILL, a vykonávací proces počká na ukončenie procesu.

| Premenná prostredia                           | Predvolená hodnota | Účel                                         |
| --------------------------------------------- | ------------------ | -------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000             | Časový limit jedného cieľa                   |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024               | Limit old-space V8 podriadeného procesu v MB |

Pri neplatných/nezáporných/necelých hodnotách sa použijú predvolené hodnoty. Nastavenie haldy nie je celkovým
limitom RSS; veľmi veľké dávky môžu stále vyčerpať pamäť podriadeného procesu a spôsobiť bezpečné zlyhanie spustenia.
Predvolených 1024 MB ponecháva rezervu pre predvolenú dávku 500 riadkov s artefaktmi s veľkosťou 512 KiB
a povolenými telami vrátane serializácie JSON po bajtových blokoch v BigQuery. Neznamená to, že je
dávka 10000 riadkov s telami bezpečná. Vyčerpanie haldy V8 zaznamená zlyhanie s možnosťou nápravy: znížte veľkosť
dávky alebo zvýšte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kurzor zostane na poslednej
potvrdenej dávke. Na historické vložené telá/telá na disku sa moderný limit artefaktov nevzťahuje.
Prevádzkovatelia musia RSS plánovať samostatne, najmä v kontajneroch s obmedzenou pamäťou.

Podriadený proces zdedí iba určené `DATA_DIR`, `NODE_ENV`, explicitné `TZ` (rozlíšenie lokálneho času
starších názvov súborov), `ELECTRON_RUN_AS_NODE`, ak je prítomné, a nasledujúce vstupy pre odchádzajúce spojenia:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (a ich varianty s malými písmenami),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globálny dispečer Undici zdieľa čisto zo serverového prostredia odvodené nastavenie proxy a pravidlá obchádzania
pre lokálnych hostiteľov vrátane `NO_PROXY`; neimportuje `proxyFetch.ts` ani jeho DB/príznaky funkcií.
Prihlasovacie údaje proxy sa z odovzdávaného výstupu a zaznamenaných chýb odstránia. Prihlasovacie údaje cieľa
prechádzajú iba v jednej úvodnej správe IPC, nikdy nie cez argv ani prostredie; odovzdávanie výstupu/chýb má
predponu a citlivé údaje sú odstránené. V argumentoch spustenia podriadeného procesu je deaktivované iba `ExperimentalWarning`, aby sa
pri každom cron spustení neopakovalo upozornenie Node na SQLite; ostatné typy upozornení zostávajú viditeľné.

Cieľové moduly musí byť možné importovať bez závislostí od Next.js alebo závislostí určených iba pre server. Existujúca
implementácia BigQuery už túto podmienku spĺňa. Vyrovnávacie pamäte prístupových tokenov pretrvávajú iba počas behu
podriadeného procesu, nie medzi jednotlivými behmi. Podporovaným runtime prostredím je Node (`package.json` engines), ale sekcia
README o inštalácii Bun a súbor `Dockerfile.bun` zároveň uvádzajú cestu produkčnej kompatibility pomocou
`bun:sqlite` (`src/lib/db/core.ts` / adaptéry). V prostredí Bun preto exporty zachovávajú predchádzajúcu
cestu v rámci procesu a jednorazovo zobrazia upozornenie: izolácia haldy/časového limitu podriadeného procesu nie je k dispozícii. Na
izoláciu event loopu a chýb OOM používajte Node; Bun sa tu nepovažuje za riešenie určené iba na vývoj.

Keď je zapnuté `includeBodies`, uprednostnite interval na úrovni minút, napríklad
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, namiesto hromadenia nevybaveného objemu dát počas celej hodiny.
Limity dávok a riadkov naďalej obmedzujú každý beh. Náklady na spustenie procesu vznikajú pre každý cieľ pri každom behu;
ide o výmenu malých nákladov na spustenie za izoláciu event loopu servera, nie o zníženie celkového využitia CPU.

### Dátové obsahy (prompty a dokončenia)

Export predvolene obsahuje iba súhrnné polia zobrazované v **zozname** denníkov. Zapnutie možnosti
**Exportovať prompty a odpovede** (`includeBodies`) navyše odošle údaje, ktoré sa pre každé volanie zobrazujú
na paneli **podrobností** denníkov:

| Pole                             | Čo obsahuje                                                      |
| -------------------------------- | ---------------------------------------------------------------- |
| `request_body` / `response_body` | Dátové obsahy volania v podobe vykreslenej dashboardom           |
| `pipeline_route_decision`        | Cieľ a model, ktoré vybral router                                |
| `pipeline_client_request`        | Nespracovaná požiadavka presne tak, ako ju odoslal klient        |
| `pipeline_openai_request`        | Po preklade do interného formátu OpenAI                          |
| `pipeline_provider_request`      | Podoba skutočne odoslaná upstreamu v dialekte poskytovateľa      |
| `pipeline_provider_response`     | Nespracovaná odpoveď upstreamu                                   |
| `pipeline_client_response`       | Obsah odovzdaný späť volajúcemu                                  |
| `pipeline_error`                 | Podrobnosti o chybe na úrovni pipeline pri neúspešnom volaní     |
| `bodies_truncated`               | Hodnota True, ak ktorékoľvek pole vyššie dosiahlo `maxBodyBytes` |

Ide o obsah promptov, preto je táto možnosť **predvolene vypnutá** a zámerne sa nastavuje pre každý cieľ samostatne.
Odosiela sa to, čo zobrazuje dashboard, pretože export a `getCallLogById` používajú rovnaké
rozlíšenie podrobností: dátové obsahy sú
už pri zápise sanitizované od PII a zbavené tajných údajov a volanie uskutočnené pomocou
kľúča API s nastavením `noLog` neukladá žiadny dátový obsah, takže nie je čo exportovať.

Dátové obsahy sa čítajú pre každý riadok z artefaktu súborového systému, takže hydratácia sa vykonáva iba pre ciele,
ktoré ju požadujú. Pri chýbajúcom alebo poškodenom artefakte sa exportuje jeho súhrn s nulovými dátovými obsahmi,
namiesto toho, aby zlyhala celá dávka a kurzor zostal zablokovaný.

`maxBodyBytes` (predvolená hodnota 262144) obmedzuje každé pole. Dlhšie dátové obsahy sa **skrátia, namiesto
toho, aby sa zahodili** — skrátený prompt stále odpovedá na otázku „čo bolo požadované“ — a riadok sa označí pomocou
`bodies_truncated`. Deltá streamované po jednotlivých blokoch sa neexportujú; zostavená odpoveď sa
už nachádza v `pipeline_provider_response` a `pipeline_client_response`.

---

## 2. Súbory

| Časť                       | Umiestnenie                                  |
| -------------------------- | -------------------------------------------- |
| Kontrakt cieľa             | `src/lib/logExport/types.ts`                 |
| Register                   | `src/lib/logExport/registry.ts`              |
| Spracovanie tajomstiev     | `src/lib/logExport/secrets.ts`               |
| Spúšťač (nadradené IPC)    | `src/lib/logExport/runner.ts`                |
| Životný cyklus procesu     | `src/lib/logExport/childRunner.ts`           |
| Vstup podradeného procesu  | `src/lib/logExport/exportChild.ts`           |
| Otvárač iba na čítanie     | `src/lib/db/logExportReadOnly.ts`            |
| Zdieľaný dopyt/mapovanie   | `src/lib/usage/callLogExportQueries.ts`      |
| Prekladač podrobností      | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekcia API              | `src/lib/logExport/presenter.ts`             |
| Cieľ BigQuery              | `src/lib/logExport/destinations/bigquery.ts` |
| Autentifikácia Google SA   | `src/lib/logExport/googleServiceAccount.ts`  |
| Zdroj denníka volaní       | `src/lib/usage/callLogExportSource.ts`       |
| Perzistencia               | `src/lib/db/logExportDestinations.ts`        |
| Úloha cron                 | `src/lib/jobs/logExportJob.ts`               |
| Vrstva REST                | `src/app/api/log-export/`                    |
| Stránka ovládacieho panela | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Všetky trasy sú autentifikované pre správu (`requireManagementAuth`). Tajomstvá sa nikdy nevracajú:
uložené tajomstvo sa vráti ako literál `__stored__` a odoslanie tejto hodnoty späť pri aktualizácii
zachová uložené prihlasovacie údaje.

Vytvorenie alebo aktualizácia cieľa, ktorého typ deklaruje tajomstvo, **vyžaduje
`STORAGE_ENCRYPTION_KEY`**. Bez neho je `encrypt()` tichým prechodom bez zmeny, preto sa zápis
odmietne s kódom 400 namiesto uloženia prihlasovacích údajov do SQLite ako obyčajného textu (rovnakú ochranu
používa webhook Telegramu).

| Metóda   | Cesta                                    | Účel                                                                    |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy cieľov + zoznam ich konfiguračných polí                            |
| `GET`    | `/api/log-export/destinations`           | Zoznam cieľov (tajomstvá sú začiernené)                                 |
| `POST`   | `/api/log-export/destinations`           | Vytvorenie cieľa                                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Načítanie jedného cieľa                                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizácia názvu / povolenia / konfigurácie / dávkovania              |
| `DELETE` | `/api/log-export/destinations/{id}`      | Odstránenie                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Overenie prihlasovacích údajov bez zápisu                               |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Okamžité spracovanie, rovnakou cestou ako naplánované spustenie         |
| `GET`    | `/api/log-export/status`                 | Stav cronu, nedávne spustenia, počet čakajúcich záznamov pre každý cieľ |

`GET /api/log-export/types` umožňuje všeobecné fungovanie používateľského rozhrania: formulár ovládacieho panela sa vykresľuje z
vrátených deskriptorov polí, takže nový cieľ nevyžaduje žiadnu zmenu používateľského rozhrania.

---

## 4. Cieľ BigQuery

Konfiguračné kľúče (`type: "bigquery"`):

| Kľúč                 | Poznámky                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP obsahujúci množinu údajov                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Používa sa iba vtedy, keď treba vytvoriť množinu údajov (predvolene `EU`) |
| `serviceAccountJson` | Kľúč účtu služby. Tajomstvo: zašifrované v úložisku, nikdy sa nevracia    |
| `autoCreate`         | Vytvorenie množiny údajov a tabuľky pri prvom exporte (predvolene `true`) |

Účet služby potrebuje oprávnenie `bigquery.tables.updateData` pre cieľovú tabuľku a navyše
`bigquery.datasets.create` / `bigquery.tables.create`, keď je zapnuté `autoCreate`.

Nakonfigurovaná dávka je jednotkou **kurzora**, nie HTTP: `send()` ju rozdelí na volania insertAll
s najviac 500 riadkami, takže veľká hodnota `batch_size` nemôže prekročiť 10 MB limit požiadavky BigQuery.
Pri prechodných stavoch (408/429/500/502/503/504) sa požiadavka zopakuje najviac trikrát s exponenciálnym
oneskorením, pričom sa opätovne použijú rovnaké insertIds; zlyhania autentifikácie a schémy vyvolajú výnimku pri prvom pokuse
namiesto zbytočného pokračovania spustenia.

Tabuľka vytvorená pred niekoľkými okamihmi ešte nie je viditeľná pre koncový bod streamovania, ktorý
niekoľko sekúnd odpovedá kódom 404. Táto odpoveď 404 sa skúsi znova, ale **iba ak tabuľku vytvorilo toto spustenie** —
skutočne chýbajúca tabuľka naďalej zlyhá okamžite. Upozorňujeme, že opätovné vytvorenie tabuľky pod názvom, ktorý
bol nedávno odstránený, spôsobí, že BigQuery niekoľko minút odmieta streamované vkladanie; ide o
vlastnosť postupu odstránenia a následného opätovného vytvorenia, preto namiesto odstránenia a opätovného pridania uprednostnite nový názov tabuľky.

**Čiastočné zlyhanie prichádza ako HTTP 200 s neprázdnym poľom `insertErrors[]`.** Považuje sa to za
zlyhanie a vyvolá sa výnimka, čo zabráni kurzoru posunúť sa za riadky, ktoré BigQuery nikdy
neprijalo; `tests/unit/log-export-bigquery.test.ts` toto správanie fixuje.

Prenos používa čisté REST — vlastnoručne podpísané tvrdenie RS256 sa vymení za prístupový token na adrese
`https://oauth2.googleapis.com/token` a riadky sa potom odošlú do `tabledata.insertAll`. Nepoužíva sa
žiadne SDK od Googlu. Prístupové tokeny sa ukladajú do vyrovnávacej pamäte v rámci procesu pre každú dvojicu (účet služby, rozsah).

Vytvorená tabuľka obsahuje jeden stĺpec pre každé pole karty Záznamy a navyše `exported_at`, pričom jej usporiadanie
zodpovedá spôsobu, akým sa záznamy volaní skutočne dotazujú:

- **Rozdelenie podľa dní na základe `timestamp`**, takže dotaz ohraničený dátumom prehľadáva iba príslušné dni.
- **Klastrovanie podľa `api_key_name`, `provider`, `model`, `status`** (v tomto poradí), takže filtrovanie podľa toho,
  kto volanie spustil, kam smerovalo alebo či zlyhalo, vyradí bloky v každej partícii. BigQuery
  povoľuje najviac štyri klastrovacie stĺpce a na poradí záleží: filter iba podľa `api_key_name`
  bloky vyradí, zatiaľ čo filter iba podľa `status` nie.
- **Voliteľná doba uchovávania partícií** prostredníctvom `partitionExpirationDays` (0 uchová všetko), ktorá sa použije
  pri vytvorení tabuľky.

Obe nastavenia sa použijú pri vytvorení. Existujúca tabuľka si zachová rozloženie, ktoré už má, takže
ak ich chcete použiť, nastavte cieľ na nové id tabuľky.

`tests/unit/log-export-bigquery.test.ts` overuje, že mapovač a schéma tabuľky zostávajú
zosynchronizované, takže nový stĺpec protokolu volaní nemožno pri exporte nepozorovane vynechať.

Dávky sa rozdeľujú na časti podľa **počtu riadkov** aj počtu bajtov po serializácii. Samotný počet riadkov nestačí,
keď sa exportujú dátové obsahy: 500 riadkov obsahujúcich prompty môže mať desiatky megabajtov a insertAll
odmietne požiadavku väčšiu ako 10 MB. Časti sa uzatvárajú pri 500 riadkoch alebo 9 MB podľa toho, čo nastane skôr.

---

## 5. Pridanie cieľa

1. Vytvorte `src/lib/logExport/destinations/<name>.ts`, ktorý exportuje `LogExportDestinationType`:
   Zod `configSchema`, pole deskriptorov `fields` pre používateľské rozhranie, `secretFields` a
   `createClient(config)`, ktoré vracia `test()` / `prepare()` / `send(records)`.
2. Pridajte ho do poľa `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napíšte testy v `tests/unit/`.

To je celá zmena: perzistencia, úloha cron, vrstva REST, šifrovanie tajných údajov aj formulár
ovládacieho panela používajú register.

Dve pravidlá pre nový cieľ:

- `send()` **musí vyvolať výnimku** pri čiastočnom zlyhaní. Úspešné dokončenie znamená „cieľ obsahuje tieto riadky“
  a kurzor sa natrvalo posunie za ne.
- Cieľ, ktorý prijíma adresu URL zadanú používateľom, ju musí pred načítaním overiť pomocou
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) rovnakým spôsobom
  ako webhooky. BigQuery to nepotrebuje: jeho hostitelia sú konštanty.

---

## 6. Prevádzka

- **Ovládací panel**: Integrácie → Export protokolov. Pridajte cieľ, spustite **Test** na overenie
  prihlasovacích údajov bez zápisu riadkov a potom ho povoľte.
- **Nevybavené záznamy**: každá karta cieľa zobrazuje počet čakajúcich riadkov a kurzor; `GET
/api/log-export/status` vracia rovnaké údaje spolu s poslednými 20 spusteniami úlohy.
- **Zlyhanie jedného cieľa nespôsobí zlyhanie ostatných** — súhrn spustenia zaznamenáva stav
  jednotlivých cieľov v `last_status` / `last_error` a história spustení úlohy uchováva súhrnný stav.
- **Odstránením cieľa sa odstráni aj jeho kurzor.** Po jeho opätovnom pridaní sa začne od najstaršieho
  zachovaného protokolu volaní, čím sa znova odošlú riadky, ktoré už cieľ môže obsahovať. V BigQuery
  dokáže hodnota `insertId` pre jednotlivé riadky zabrániť duplikátom iba v rámci vlastného časového
  okna deduplikácie služby BigQuery, preto cieľ radšej zakážte, než odstráňte.
