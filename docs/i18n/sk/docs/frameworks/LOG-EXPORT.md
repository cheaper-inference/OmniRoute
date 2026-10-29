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

## 5. Cieľ pre stopy OTLP/HTTP

Konfigurácia používa `type: "otlp-http"`. Ide o plánovaný export uložených
záznamov volaní s kurzorom, nie o priebežný výstup udalostí smerovania bez záruky doručenia v
`open-sse/services/routing/otel.ts`. Nečíta ani nemení premenné prostredia,
časovače ani vyrovnávacie pamäte tohto výstupu. Zapnutie oboch môže vytvárať dva nezávislé druhy spanov;
na odlíšenie týchto spanov zo záznamov volaní použite rozsah inštrumentácie `omniroute.log-export`.

| Kľúč                     | Predvolená hodnota / účel                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `endpoint`               | Povinná úplná HTTP(S) URL pre stopy; prípona `/v1/traces` sa nepridáva               |
| `headers`                | Voliteľné riadky `Name: value` alebo objekt JSON s reťazcami; šifrované              |
| `requestHeaderAllowlist` | Prázdne (vypnuté); názvy/prefixy hlavičiek klienta zaznamenávané ako atribúty spanov |
| `serviceName`            | `omniroute`; atribút zdroja `service.name`                                           |
| `langfuseMapping`        | `false`; pridáva atribúty generovania/relácie/používateľa pre Langfuse               |
| `identity`               | `pseudonymous`, `keyName` alebo `none`                                               |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                              |
| `timeoutMs`              | `30000` na jeden pokus HTTP                                                          |
| `environment`            | Nenastavené; voliteľný atribút `langfuse.environment`                                |

Všeobecný prehľad zobrazuje tieto polia. `paths` prijíma pole cez API alebo textové pole
s presnými cestami oddelenými novými riadkami/čiarkami. Cesty pre embeddingy, preusporiadanie a ďalšie operácie sa
preskakujú, pokiaľ nie sú výslovne povolené. Aj preskočené riadky posúvajú kurzor; počítadlá
`exported`/`exportedTotal` existujúceho vykonávacieho procesu počítajú spracované zdrojové riadky vrátane filtrovaných
riadkov, nie prijaté spany. Filtrovanie prebieha v podriadenom procese bez zmeny jeho
kontraktu IPC/kurzora.

Overovanie URL používa pomocnú funkciu `parseAndValidateNonMetadataUrl`, ktorá nevyžaduje databázu, zo súboru
`src/shared/network/outboundUrlGuard.ts`: politiku `block-metadata`. Má rovnaké
bezpodmienečné kontroly metadát/protokolu/vložených prihlasovacích údajov ako validátor webhookov
s povolenými súkromnými URL, ale zámerne povoľuje ciele localhost/LAN bez globálneho
prepísania príznaku funkcie. To umožňuje používať koncové body Langfuse, Phoenix, Tempo a Collector
na vlastnej infraštruktúre vrátane súkromných koncových bodov HTTP. Hostitelia cloudových metadát sú vždy blokovaní.
Presmerovania sa nenasledujú, takže kolektor nemôže presmerovať prihlasovacie údaje na iného hostiteľa.
Rovnako ako existujúca lexikálna ochrana URL ani táto nefixuje výsledok prekladu DNS; konfigurujte iba
hostiteľov pod kontrolou prevádzkovateľa. Ak koncový bod nie je v dôveryhodnej sieti, uprednostnite HTTPS.

### Prenášané dáta a doručovanie

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) prenáša jeden
span typu CLIENT na každý povolený riadok, pomenovaný podľa presnej cesty požiadavky. Pomenovanie podľa cesty odlišuje
Chat Completions, Responses a Messages bez vkladania údajov o modeli alebo identite do
názvu spanu. Atribúty zdroja zahŕňajú `service.name` a `service.version` balíka.

Bežný mechanizmus zaznamenávania pokusov o chat (`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` pri dokončení a neposkytuje časovú pečiatku;
`saveCallLogOperation` v `src/lib/usage/callLogs.ts` predvolene nastavuje časovú pečiatku na čas zápisu
(dokončenia). Export preto nastavuje koniec = časová pečiatka riadka a začiatok = koniec − trvanie
(milisekundy prevedené na nanosekundy v desiatkovom zápise). Aj historické časové pečiatky dodané volajúcim
sa zachovávajú ako čas ukončenia; neexistuje rozlíšenie začiatku/dokončenia pre jednotlivé riadky.
Trvanie s hodnotou null sa zmení na nulu. Neplatné/chýbajúce časové pečiatky spôsobia zlyhanie dávky namiesto vytvorenia
nedeterministických spanov. `ttftMs` môže mať hodnotu null a mapuje sa na `omniroute.ttft_ms`.

Atribúty zahŕňajú `gen_ai.operation.name="chat"`, poskytovateľa, požadovaný model/model odpovede,
vstupné/výstupné tokeny, voliteľné tokeny čítania z vyrovnávacej pamäte/vytvárania vyrovnávacej pamäte/uvažovania, stav HTTP,
kombináciu, zdroj vyrovnávacej pamäte, značku relácie a korelačný identifikátor. Celočíselné hodnoty OTLP a časové pečiatky
sú reťazce v desiatkovom zápise; reťazce, booleovské hodnoty a desatinné čísla používajú svoje natívne varianty hodnôt
OTLP. Chybové spany majú stav ERROR a sanitizovanú stavovú správu. Kanonický
záznam neobsahuje URL nadradeného hostiteľa, preto sa `server.address` vynecháva, aby sa kolektor nesprávne
neoznačil ako server modelu. Náklady sa neexportujú.

Obsah sa načítava iba pri `includeBodies=true`. Pri `langfuseMapping=false`
obsahujú `gen_ai.input.messages` / `gen_ai.output.messages` sanitizovaný JSON tela požiadavky/odpovede
tak, ako ho ukladá OmniRoute (v kanonickom tvare, ak sa dá analyzovať), nie pole správ
upravené podľa sémantických konvencií. Skrátené telá/telá mimo formátu JSON zostávajú obyčajným textom. Pri `langfuseMapping=true`
sa telá odosielajú iba ako `langfuse.observation.input` / `langfuse.observation.output`;
atribúty `gen_ai.*.messages` sa vynechávajú, takže každé telo sa odošle raz. Oba režimy
preberajú `maxBodyBytes` z existujúceho postupu načítavania obsahu;
`omniroute.bodies_truncated=true` označuje skrátenie.
Tento cieľ nepridáva žiadne ďalšie snímky spracovateľského reťazca ani čítanie nesanitizovaných artefaktov;
voliteľné zaznamenávanie hlavičiek požiadaviek používa existujúcu načítanú snímku klienta opísanú nižšie.
Pri exporte tiel použite interval v minútach, napríklad `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
namiesto hromadenia hodinového objemu nespracovaných záznamov.

### Voliteľné hlavičky požiadaviek klienta

Zaznamenávanie hlavičiek je **predvolene vypnuté**. Nastavte `requestHeaderAllowlist` v konfigurácii cieľa
a zapnite **Exportovať prompty a odpovede** (`includeBodies: true` v cieli).
Zoznam povolených položiek prijíma pole cez API alebo textové pole s názvami oddelenými novými riadkami/čiarkami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Názvy sa porovnávajú presne bez rozlišovania veľkých a malých písmen, pokiaľ jediný koncový znak `*` nevyberá neprázdny
prefix názvu hlavičky. Samostatný znak `*`, vnorené zástupné znaky a neplatné názvy hlavičiek HTTP sa odmietajú.
Povolených je najviac 64 selektorov, každý s názvom/prefixom s dĺžkou najviac 256 bajtov ASCII.
Toto nastavenie je oddelené od `headers`, ktoré slúži na autentifikáciu exportéra voči kolektoru.

Zachytávanie číta iba `pipeline_client_request`, naplnené z `clientRawRequest` (alebo staršieho `clientRequest`)
uloženého podrobného záznamu pipeline. Nikdy nepoužíva hlavičky požiadavky poskytovateľa ako náhradný zdroj.
Pri zaznamenaní požiadavky muselo byť zapnuté podrobné protokolovanie pipeline. Ak je
`includeBodies` vypnuté alebo ak JSON snímky klienta chýba, je poškodený či orezaný, nevytvoria sa žiadne
atribúty hlavičiek. Zvýšenie `maxBodyBytes` môže zabrániť orezaniu snímky pri exporte;
nedokáže však obnoviť podrobnosti, ktoré sa nikdy neuložili. Snímka väčšia než 1 MiB alebo obsahujúca viac než
256 položiek hlavičiek sa ignoruje. Existujúci export promptov/odpovedí zostáva zapnutý súbežne
so zachytávaním hlavičiek; zoznam povolených položiek neposkytuje režim hydratácie iba pre hlavičky.

Vybrané hodnoty sa stanú poľami reťazcov OTLP `http.request.header.<full lowercase header name>`,
a to aj v prípade jediného reťazca. Napríklad `X-OmniRoute-Meta-Team: example-team` sa zmení na
`http.request.header.x-omniroute-meta-team` s hodnotou
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Zachová sa celý prefix: ide o bežné hlavičky bez analýzy obchodných polí alebo
konverzie na `omniroute.metadata.*` / metadáta Langfuse. `langfuseMapping` nemení sémantiku
hlavičiek. Vybraná hlavička `User-Agent` s jedinou hodnotou nastaví aj štandardný skalárny atribút
`user_agent.original`. Čiarky v rámci jednej hodnoty sa nepoužívajú na rozdelenie. Varianty líšiace sa veľkosťou písmen sa zlúčia v poradí uložených
položiek; akýkoľvek neplatný variant spôsobí vynechanie celej hlavičky. Atribúty sú zoradené podľa názvu prepísaného na malé písmená.

Hlavičky Authorization, Proxy-Authorization, Cookie, Set-Cookie, hlavičky s kľúčmi API, názvy obsahujúce
značky auth/token/secret/password/credential a interné prihlasovacie údaje brány sú vždy
vylúčené, aj keď sú vybrané alebo čiastočne maskované v úložisku. Známe vzory prihlasovacích údajov využívajú
zdieľaný detektor prihlasovacích údajov; značky redakcie sa vynechávajú, neexportujú sa ako bezpečné hodnoty.
Prijímajú sa iba reťazce a neprázdne polia reťazcov; čísla ani objekty sa automaticky nekonvertujú.
Neplatné názvy, kľúče prototypu, riadiace znaky (okrem vodorovného tabulátora) a nesprávne vytvorený Unicode
sa ignorujú bez zlyhania dávky alebo uvedenia ich obsahu v chybách.

Každý span zachytí najviac 32 hlavičiek, 16 hodnôt na hlavičku, 4096 bajtov UTF-8 na hodnotu
a celkovo 16384 bajtov UTF-8 v názvoch a hodnotách zachytených hlavičiek. Príliš veľké alebo neplatné hlavičky
sa vynechajú celé, neorezávajú sa. Výber je rozhodnutím prevádzkovateľa v oblasti ochrany súkromia: aj zdanlivo bezpečné názvy
môžu obsahovať osobné údaje a tieto obmedzenia/detektory nie sú univerzálnym nástrojom na odstraňovanie osobných údajov.

### Limity doručovania

Požiadavky sú obmedzené na 500 spanov a 4 MiB JSON v UTF-8 vrátane obálky.
Veľkosť každého povoleného spanu sa skontroluje pred prvou požiadavkou dávky kurzora. Ak jednotlivý
span prekračuje limit, neodošle sa žiadna časť danej dávky a operácia zlyhá s odporúčaním znížiť
`maxBodyBytes`; span sa nevynechá bez upozornenia. Predbežná kontrola uchováva iba odkazy na záznamy a
počty bajtov, pričom každý dočasný span/JSON zahodí; spany sa znovu zostavujú pre časti s obmedzenou veľkosťou
namiesto uchovávania druhej serializovanej kópie dávky. Pri HTTP 408/429/5xx, zlyhaniach siete a prekročení časového limitu sa vykonajú najviac
tri pokusy s exponenciálnym oneskorením 250/500 ms. Sekundy alebo dátumy HTTP v `Retry-After`
môžu predĺžiť oneskorenie až na 5 sekúnd. Ostatné stavy spôsobia okamžité zlyhanie. Aj čiastočné odmietnutie OTLP 2xx vyvolá výnimku namiesto
potvrdenia strateného spanu; prijímajú sa prázdne potvrdenia alebo potvrdenia s platným JSON, pričom
limit čítania odpovede je 64 KiB.

Chyby obsahujú iba informácie pochádzajúce z exportéra: stav HTTP, triedu opakovania, počet pokusov a počet odoslaných
spanov alebo pevne stanovené znenie chyby potvrdenia/siete. Telá odpovedí kolektora,
počty čiastočne úspešných položiek a hlavičky odpovedí sa nikdy nekopírujú do chýb, protokolov ani na
panel. Neúspešná alebo čiastočne prijatá dávka sa nepotvrdí: cieľ zobrazuje
stav Zlyháva s príslušným stavom, kurzor zostáva na poslednej potvrdenej dávke a ďalšie spustenie
odošle tie isté riadky znova. Trvalé stavy naďalej spôsobujú zlyhanie, kým sa kolektor alebo konfigurácia
neopraví. Podrobnosti odpovedí nájdete vo vlastných protokoloch kolektora. Súhrny chýb v protokole volaní si zachovávajú
samostatnú redakciu.
`prepare()` nič nezriaďuje; test odošle presne `{"resourceSpans":[]}` a oznámi
stav HTTP bez zápisu spanov protokolu volaní.

Identifikátory trace a span sú prvých 32/16 hexadecimálnych číslic SHA-256 z
`"omniroute.trace\0" + callLogId` a `"omniroute.span\0" + callLogId`. Opätovné odoslania nesú
rovnaké identifikátory. Nejde o záruku deduplikácie: niektoré backendy vrátane príjmu dát Langfuse
v4 nededuplikujú spany s rovnakým identifikátorom. Pád alebo čiastočné zlyhanie časti môže
spôsobiť opätovné odoslanie najviac jednej nepotvrdenej dávky kurzora; duplikovaná môže byť celá táto dávka,
nielen jej posledná časť HTTP. Pri výbere veľkosti dávky kurzora zohľadnite tento kompromis.

### Príklad pre Langfuse

Pre vlastnú hostovanú inštanciu Langfuse nakonfigurujte tieto polia:

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

Hodnotu Authorization zostavte lokálne ako Base64 doslovného reťazca `public-key:secret-key`
(napríklad pomocou `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nevkladajte skutočné prihlasovacie údaje do protokolov, snímok obrazovky ani hlásení problémov. Mapovanie automaticky
nastaví `x-langfuse-ingestion-version: 4`; Authorization sa naďalej zadáva v `headers`.
Hlavičky aj vygenerovaná soľ identity používajú existujúci mechanizmus šifrovaných tajných polí
a zástupné hodnoty API; vyžaduje sa `STORAGE_ENCRYPTION_KEY`.

Mapovanie pridáva typ/model generovania, podrobnosti o využití vo formáte JSON (vstup/výstup/celkový počet a dostupné
kľúče vyrovnávacej pamäte), snímky vstupu/výstupu vo formáte JSON, úroveň ERROR/DEFAULT, sanitizovanú stavovú správu,
názov stopy, identifikátor relácie, voliteľné prostredie a filtrovateľné
`langfuse.observation.metadata.<key>` pre poskytovateľa, požadovaný model, cestu, kombináciu, zdroj
vyrovnávacej pamäte a stav. `langfuse.observation.completion_start_time` je čas vo formáte ISO 8601
zodpovedajúci začiatku + TTFT, iba ak je TTFT známy a nepresahuje trvanie. Žiadne atribúty nákladov sa neodosielajú.

Režimy identity sa vzťahujú na `langfuse.user.id`:

- `pseudonymous` (predvolené): HMAC-SHA256 interného identifikátora kľúča API s náhodnou
  32-bajtovou soľou pre každý cieľ. Ak soľ chýba, vygeneruje sa pri vytvorení, zašifruje sa
  ako `identitySalt`, nikdy sa nevracia a pri úpravách sa zachováva. Nespracované identifikátory kľúčov sa nikdy
  nevkladajú do atribútov spanov. Opätovné vytvorenie alebo rotácia soli cieľa mení identity.
- `keyName`: nakonfigurovaný názov kľúča API, ktorý zámerne odhaľuje toto označenie zadané operátorom.
- `none`: bez identifikátora používateľa. Značky relácie sa naďalej exportujú, ak sú prítomné; tieto režimy
  neanonymizujú ľubovoľný obsah promptov ani označenia relácií/korelácií zadané operátorom.

### Spustenie bez spätného doplnenia

Iba pri vytváraní zapnite **Začať od aktuálnej pozície (preskočiť existujúce záznamy)** alebo odovzdajte
`startFromCurrentPosition: true` na najvyššej úrovni tela požiadavky API na vytvorenie. Tým sa inicializuje
`cursor_row_id` na aktuálnu maximálnu hodnotu rowid uchovávaných záznamov volaní pomocou existujúcich pomocných funkcií
kurzora, bez migrácie. Predvolená hodnota je false (kurzor 0 a spätné doplnenie uchovávanej histórie).
Nejde o nastavenie na resetovanie kurzora pri aktualizácii.

Spoločné rozšírenie o `ttftMs` pridáva aj stĺpec `ttft_ms` povoľujúci hodnotu null do mapovača BigQuery
a schémy nových tabuliek: test schémy vyžaduje, aby každé pole kanonického záznamu malo
stĺpec. Export do existujúcich tabuliek pokračuje bez zmien: `prepare()` načíta schému tabuľky a
vynechá iba `ttft_ms`, ak tento stĺpec chýba. Pridajte stĺpec typu INT64 povoľujúci hodnotu null, aby ste pri ďalšom spustení získali TTFT,
alebo použite novú tabuľku. Nevyžaduje sa PATCH, automatická zmena schémy ani dodatočné
oprávnenia; pre všetky ostatné polia riadkov sa zachováva prísna kontrola schémy.

---

## 6. Pridanie cieľa

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

## 7. Prevádzka

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
