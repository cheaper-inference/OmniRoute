# Log export (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Průběžný inkrementální export protokolů volání OmniRoute do externího analytického úložiště.

Karta Protokoly na řídicím panelu uchovává historii požadavků v SQLite (`call_logs`), kde je její rozsah omezen
rotací a dobou uchovávání. Export protokolů odesílá stejnou sadu záznamů podle plánu, aby mohla být uchovávána déle než
v místní databázi a propojována s dalšími daty. Prvním cílem je BigQuery;
exportní pipeline používá registr, takže další cíle lze jednoduše přidávat.

---

## 1. Jak to funguje

```
server (dešifrování + ověření konfigurace, sladění kurzoru)
  → spuštění přes IPC → izolovaný proces OS exportChild
    → storage.sqlite pouze pro čtení → sdílený dotaz/mapování protokolů volání
      → asynchronní načtení artefaktů → prepare()/send() cíle
        → dávka přes IPC → server uloží kurzor → potvrzení přes IPC
          → další dávka; dokončení přes IPC → server zaznamená úspěch
```

- **Plánování** — jedna cron úloha `JobRegistry`, `log_export`, s výchozím nastavením `0 * * * *` (každou hodinu,
  UTC). Registruje se v `src/lib/initCloudSync.ts`; lze přepsat pomocí `OMNIROUTE_LOG_EXPORT_CRON`.
  Každé spuštění postupně zpracuje všechny **povolené** cíle.
- **Kurzor** — implicitní `call_logs.rowid` v SQLite, ukládaný pro každý cíl do
  `log_export_destinations.cursor_row_id`. `timestamp` záměrně neslouží jako kurzor: volající
  mohou zadat vlastní hodnotu, takže pomalý požadavek může být zapsán až po rychlejším, který začal
  později, a kurzor založený na časovém razítku by jej přeskočil.
- **Dávkování** — `batch_size` řádků na požadavek (výchozí hodnota 500), `max_rows_per_run` řádků na spuštění
  (výchozí hodnota 10000), aby se velký objem nevyřízených záznamů zpracoval během několika spuštění, místo aby zablokoval jediné.
- **Doručování** — kurzor se posune až po úspěšném dokončení `send()`. Při selhání dávky zůstane
  kurzor na původním místě, takže se stejné řádky při příštím spuštění odešlou znovu. Zárukou je
  doručení alespoň jednou spolu s deduplikací na straně cíle, nikoli skutečné doručení právě jednou: BigQuery používá jako klíč každého
  řádku ID protokolu volání, které v rámci svého deduplikačního okna zohledňuje bez absolutní záruky.
- **Ochrana proti souběhu** — naplánované spuštění cron a `POST .../run` mohou nastat současně. Cíl,
  který se již zpracovává, se přeskočí, místo aby se zpracovával dvakrát (`skipped: true` ve výsledku spuštění),
  takže souběžné spuštění nemůže znovu odeslat dávku ani posunout kurzor zpět.
- **Obnova po vymazání** — pokud se `cursor_row_id` ocitne nad `MAX(rowid)` (celá tabulka byla
  vymazána a číslování rowid začalo znovu), spouštěč vrátí kurzor na 0, místo aby trvale přestal vidět nové záznamy.

### Izolovaný spouštěč a limity

Každé spuštění cíle v Node vytvoří samostatný, krátce žijící podřízený proces OS (`child_process`
s IPC, nikoli `worker_threads`). Čtení těl, parsování/serializace JSON dat, metoda
`prepare()` cíle i síťové I/O cíle probíhají v tomto procesu, nikoli ve smyčce událostí serveru.
Přes IPC prochází pouze konfigurace a malé zprávy o průběhu; exportované záznamy se nikdy nevracejí
na server. Cron úloha i trasa Spustit nyní zachovávají stejný veřejný výsledek a ochranu proti souběhu.

Podřízený proces otevře serverem určený soubor `DATA_DIR/storage.sqlite` pouze pro čtení pomocí `node:sqlite`,
s nastavením `busy_timeout=5000` a `query_only=ON`. Neimportuje žádný databázový singleton a neprovádí žádné
migrace, zálohy ani aktualizace SQLite. Evidence chybějících či poškozených artefaktů (včetně
příkazu UPDATE pro poškozený artefakt) zůstává výhradně v cestě pro zobrazení detailu na řídicím panelu. Obě cesty sdílejí čistý
resolver detailů; export používá asynchronní čtení souborového systému a stejné pořadí vyhledávání: artefakt → starší
vložená data → starší data na disku → žádná data. Při spuštění se zachytí maximální rowid vloženého záznamu
v okamžiku, kdy podřízený proces otevře čtecí připojení; pozdější vložené záznamy počkají na další spuštění. Jde o hranici
vkládání, nikoli o dlouhotrvající transakci SQLite: během čekání na síť mohou zápisy do WAL i kontrolní body volně pokračovat.
Tato hranice nezmrazuje aktualizace ani mazání existujících řádků.

Po každé přijaté dávce podřízený proces čeká na potvrzení. Server nejprve uloží
kurzor pomocí `advanceLogExportCursor` a poté odešle `ack`; předtím nezačne žádná další dávka.
Selhání odesílání, pád nebo vypršení časového limitu zaznamená neúspěch, aniž by se kurzor pro danou dávku posunul. Dříve
potvrzené dávky zůstávají uložené; znovu lze odeslat nanejvýš jedinou nepotvrzenou dávku.
Úspěch se zaznamená až po `done` a řádném ukončení podřízeného procesu. Při selhání je podřízený proces ukončen
signálem SIGTERM, po 500 ms případně signálem SIGKILL, a spouštěč počká na ukončení procesu.

| Proměnná prostředí                            | Výchozí hodnota | Účel                                                |
| --------------------------------------------- | --------------- | --------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000          | Limit skutečného času pro každý cíl                 |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024            | Limit oblasti old-space V8 podřízeného procesu v MB |

Neplatné, nekladné nebo neceločíselné hodnoty se nahrazují výchozími. Nastavení haldy není limitem celkové
RSS paměti; velmi velké dávky mohou stále vyčerpat paměť podřízeného procesu a způsobit bezpečné selhání spuštění.
Výchozí hodnota 1024 MB ponechává rezervu pro výchozí dávku 500 řádků s artefakty o velikosti 512 KiB
při zapnutém exportu těl, včetně serializace JSON pro BigQuery po blocích vymezených počtem bajtů. Neznamená to, že
dávka 10000 řádků s těly je bezpečná. Vyčerpání haldy V8 zaznamená chybu s doporučením nápravy: snižte velikost
dávky nebo zvyšte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kurzor zůstane na poslední
potvrzené dávce. Na historická těla uložená přímo v záznamech nebo na disku se moderní limit artefaktů nevztahuje.
Provozovatelé musí RSS paměť plánovat samostatně, zejména v kontejnerech s omezenou pamětí.

Podřízený proces dědí pouze vyhodnocené `DATA_DIR`, `NODE_ENV`, explicitní `TZ` (rozlišení
místního času ve starších názvech souborů), `ELECTRON_RUN_AS_NODE`, pokud je přítomné, a následující vstupy pro odchozí komunikaci:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (a jejich varianty malými písmeny),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globální dispečer Undici sdílí se serverem vyhodnocování proxy výhradně z proměnných prostředí a pravidla
obcházení proxy pro místní hostitele, včetně `NO_PROXY`; neimportuje `proxyFetch.ts` ani jeho příznaky databáze či funkcí.
Přihlašovací údaje k proxy jsou z předávaného výstupu a zaznamenaných chyb odstraněny. Přihlašovací údaje k cíli
se přenášejí pouze v jediné úvodní zprávě IPC, nikdy v argv ani v prostředí; předávaný výstup a chyby
jsou opatřeny předponou a sanitizovány. V argumentech spuštění podřízeného procesu je zakázáno pouze `ExperimentalWarning`, aby se
při každém spuštění cronu neopakovalo varování Node ohledně SQLite; ostatní typy varování zůstávají viditelné.

Cílové moduly musí být importovatelné bez závislostí na Next.js či závislostí určených pouze pro server. Stávající
implementace BigQuery již tuto podmínku splňuje. Mezipaměti přístupových tokenů existují pouze po dobu běhu podřízeného
procesu, nikoli mezi jednotlivými běhy. Podporovaným běhovým prostředím je Node (`package.json` engines), ale sekce README
věnovaná instalaci Bun a `Dockerfile.bun` také uvádějí možnost kompatibilního produkčního provozu s využitím
`bun:sqlite` (`src/lib/db/core.ts` / adaptéry). V prostředí Bun proto exporty zachovávají dosavadní
způsob běhu v rámci procesu a jednorázově vypisují varování: izolace haldy a časového limitu podřízeného procesu není k dispozici. Pro
izolaci smyčky událostí a chyb OOM použijte Node; Bun zde není považován za prostředí určené pouze pro vývoj.

Pokud je povoleno `includeBodies`, upřednostněte interval v řádu minut, například
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, před hromaděním datových obsahů za celou hodinu.
Každý běh je i nadále omezen limity dávek a řádků. Proces se spouští pro každý cíl při každém běhu;
malé náklady na spuštění jsou zde výměnou za izolaci smyčky událostí serveru, nikoli za snížení celkového využití CPU.

### Datové obsahy (prompty a odpovědi)

Ve výchozím nastavení export obsahuje pouze souhrnná pole zobrazená v **seznamu** protokolů. Zapnutím
**Exportovat prompty a odpovědi** (`includeBodies`) se navíc odesílá to, co pro každé volání zobrazuje panel **detailu**
protokolů:

| Pole                             | Co obsahuje                                                                |
| -------------------------------- | -------------------------------------------------------------------------- |
| `request_body` / `response_body` | Datové obsahy volání tak, jak je vykresluje řídicí panel                   |
| `pipeline_route_decision`        | Který cíl a model směrovač vybral                                          |
| `pipeline_client_request`        | Nezpracovaný požadavek přesně tak, jak jej klient odeslal                  |
| `pipeline_openai_request`        | Po převodu do interního formátu OpenAI                                     |
| `pipeline_provider_request`      | Ve skutečné podobě odeslané poskytovateli, v jeho formátu                  |
| `pipeline_provider_response`     | Nezpracovanou odpověď poskytovatele                                        |
| `pipeline_client_response`       | Co bylo vráceno volajícímu                                                 |
| `pipeline_error`                 | Podrobnosti chyby na úrovni zpracovatelského řetězce u neúspěšného volání  |
| `bodies_truncated`               | Hodnotu true, pokud kterékoli z výše uvedených polí dosáhlo `maxBodyBytes` |

Jde o obsah promptů, proto je tato funkce **ve výchozím nastavení vypnutá** a záměrně se nastavuje pro každý cíl zvlášť.
Odesílá se to, co zobrazuje řídicí panel, protože export a `getCallLogById` sdílejí načítání
detailů: z datových obsahů jsou
již při zápisu odstraněny osobní údaje i tajné informace a volání provedené s klíčem API
`noLog` neukládá žádný datový obsah, takže není co exportovat.

Datové obsahy se pro každý řádek načítají z artefaktu v souborovém systému, takže doplnění dat probíhá pouze pro cíle,
které si je vyžádaly. Pokud artefakt chybí nebo je poškozený, exportuje se jeho souhrn s datovými obsahy nastavenými na null,
místo aby selhala celá dávka a kurzor zůstal zablokovaný.

`maxBodyBytes` (výchozí hodnota 262144) omezuje velikost každého pole. Delší datové obsahy se **zkracují, nikoli
zahazují** — i zkrácený prompt stále odpovídá na otázku „na co se uživatel ptal“ — a řádek je označen pomocí
`bodies_truncated`. Průběžné přírůstky streamu po jednotlivých částech se neexportují; sestavená odpověď je
již v `pipeline_provider_response` a `pipeline_client_response`.

---

## 2. Soubory

| Součást                             | Umístění                                     |
| ----------------------------------- | -------------------------------------------- |
| Kontrakt cíle                       | `src/lib/logExport/types.ts`                 |
| Registr                             | `src/lib/logExport/registry.ts`              |
| Zpracování tajných údajů            | `src/lib/logExport/secrets.ts`               |
| Spouštěč (IPC rodičovského procesu) | `src/lib/logExport/runner.ts`                |
| Životní cyklus procesu              | `src/lib/logExport/childRunner.ts`           |
| Vstupní bod podřízeného procesu     | `src/lib/logExport/exportChild.ts`           |
| Otevření pouze pro čtení            | `src/lib/db/logExportReadOnly.ts`            |
| Sdílené dotazy/mapování             | `src/lib/usage/callLogExportQueries.ts`      |
| Resolver podrobností                | `src/lib/usage/callLogDetailResolver.ts`     |
| Projekce API                        | `src/lib/logExport/presenter.ts`             |
| Cíl BigQuery                        | `src/lib/logExport/destinations/bigquery.ts` |
| Ověřování účtu služby Google        | `src/lib/logExport/googleServiceAccount.ts`  |
| Zdroj protokolu volání              | `src/lib/usage/callLogExportSource.ts`       |
| Trvalé ukládání                     | `src/lib/db/logExportDestinations.ts`        |
| Úloha cronu                         | `src/lib/jobs/logExportJob.ts`               |
| Vrstva REST                         | `src/app/api/log-export/`                    |
| Stránka řídicího panelu             | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Všechny cesty vyžadují ověření pro správu (`requireManagementAuth`). Tajné údaje se nikdy nevracejí:
uložený tajný údaj se vrací jako doslovná hodnota `__stored__` a odeslání této hodnoty zpět při aktualizaci
zachová uložený přihlašovací údaj.

Vytvoření nebo aktualizace cíle, jehož typ deklaruje tajný údaj, **vyžaduje
`STORAGE_ENCRYPTION_KEY`**. Bez něj `encrypt()` pouze tiše předá vstup beze změny, takže zápis je
odmítnut s kódem 400, aby se přihlašovací údaj neuložil do SQLite v prostém textu (stejnou ochranu používá
webhook Telegramu).

| Metoda   | Cesta                                    | Účel                                                                           |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Typy cílů + seznam jejich konfiguračních polí                                  |
| `GET`    | `/api/log-export/destinations`           | Seznam cílů (tajné údaje skryté)                                               |
| `POST`   | `/api/log-export/destinations`           | Vytvoření cíle                                                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | Načtení jednoho cíle                                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizace názvu / povolení / konfigurace / dávkování                         |
| `DELETE` | `/api/log-export/destinations/{id}`      | Odstranění                                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Ověření přihlašovacích údajů bez zápisu dat                                    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Okamžité zpracování čekajících dat stejnou cestou jako při plánovaném spuštění |
| `GET`    | `/api/log-export/status`                 | Stav cronu, poslední spuštění, nezpracovaná data pro každý cíl                 |

Díky `GET /api/log-export/types` je uživatelské rozhraní univerzální: formulář řídicího panelu se vykresluje
podle vrácených popisů polí, takže nový cíl nevyžaduje žádnou změnu uživatelského rozhraní.

---

## 4. Cíl BigQuery

Konfigurační klíče (`type: "bigquery"`):

| Klíč                 | Poznámky                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP obsahující dataset                                                                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                         |
| `location`           | Používá se pouze při nutnosti vytvořit dataset (výchozí `EU`)                                                           |
| `serviceAccountJson` | Klíč účtu služby. Tajné: šifrováno při uložení, nikdy se nevrací                                                        |
| `autoCreate`         | Vytvoří chybějící dataset/tabulku; podmíněně přidá sloupce s možností hodnoty NULL pro údaje o použití (výchozí `true`) |

Účet služby potřebuje oprávnění `bigquery.tables.updateData` pro cílovou tabulku a také
`bigquery.datasets.create` / `bigquery.tables.create`, když je zapnuto `autoCreate`.
Aktualizace existující tabulky za účelem přidání dvou polí s možností hodnoty NULL pro údaje o
použití vyžaduje také `bigquery.tables.update`. Chybějící oprávnění export zneplatní, aniž by
posunulo jeho kurzor.

Nakonfigurovaná dávka je jednotkou **kurzoru**, nikoli HTTP: `send()` ji rozdělí na volání
insertAll s nejvýše 500 řádky, takže velká hodnota `batch_size` nemůže překročit limit požadavku
BigQuery 10 MB. Přechodné stavové kódy (408/429/500/502/503/504) se opakují až třikrát s
exponenciálním čekáním a znovu se používají stejné insertIds; chyby autentizace a schématu vyvolají
výjimku při prvním pokusu, místo aby spotřebovaly běh.

Tabulka vytvořená před okamžikem ještě není pro streamovací endpoint viditelná, který po několik
sekund odpovídá kódem 404. Tento kód 404 se opakuje, ale **pouze pokud tabulku vytvořil tento běh** —
skutečně chybějící tabulka selže okamžitě. Vezměte na vědomí, že opětovné vytvoření tabulky pod
názvem, který byl nedávno odstraněn, způsobí, že BigQuery na několik minut odmítne streamovací
vložení; jde o vlastnost operace odstranění a následného vytvoření, proto je vhodnější nový název
tabulky než její odstranění a opětovné přidání.

**Částečné selhání přichází jako HTTP 200 s neprázdným `insertErrors[]`.** Je považováno za
selhání a vyvolá výjimku, což zabrání posunutí kurzoru za řádky, které BigQuery nepřijal;
`tests/unit/log-export-bigquery.test.ts` toto chování zajišťuje testem.

Přenos používá běžný REST — self-signed assertion RS256 se vymění za přístupový token na adrese
`https://oauth2.googleapis.com/token` a poté se řádky odešlou do `tabledata.insertAll`. Nenačítá
se žádný Google SDK. Přístupové tokeny se ukládají do mezipaměti v rámci procesu pro každý pár
(účet služby, obor).

Vytvořená tabulka obsahuje jeden sloupec pro každé pole karty Logs plus `exported_at` a je
uspořádána s ohledem na skutečný způsob dotazování protokolů volání:

- **Rozdělení podle dne na základě `timestamp`**, takže dotaz omezený datem prohledává pouze tyto dny.
- **Clustrování podle `api_key_name`, `provider`, `model`, `status`** (v tomto pořadí), takže filtrování
  podle toho, kdo operaci spustil, kam byla odeslána nebo zda selhala, omezí bloky uvnitř každého
  oddílu. BigQuery povoluje nejvýše čtyři sloupce pro clustrování a na pořadí záleží: filtr pouze
  podle `api_key_name` bloky omezí, filtr pouze podle `status` nikoli.
- **Volitelné uchovávání oddílů** prostřednictvím `partitionExpirationDays` (hodnota 0 zachová vše),
  použité při vytvoření tabulky.

Obě nastavení se uplatní při vytvoření. Existující tabulka si zachová své stávající uspořádání,
takže pokud je chcete použít, nasměrujte cíl na nové ID tabulky.

`tests/unit/log-export-bigquery.test.ts` ověřuje, že mapper a schéma tabulky zůstávají vzájemně
synchronizované, takže nový sloupec protokolu volání nemůže být při exportu tiše vynechán.

Dávky se rozdělují podle **počtu řádků i serializovaných bajtů**. Samotný počet řádků nestačí,
jakmile se exportují datové části: 500 řádků obsahujících prompty může mít desítky megabajtů a
insertAll odmítne požadavek větší než 10 MB. Části se uzavírají po 500 řádcích nebo při 9 MB,
podle toho, co nastane dříve.

---

## 5. Cíl tras OTLP/HTTP

Konfigurace používá `type: "otlp-http"`. Jedná se o plánovaný export trvalých protokolů
volání podporující kurzor, nikoli o best-effort úložiště živých směrovacích událostí v
`open-sse/services/routing/otel.ts`. Nečte ani nemění jeho proměnné prostředí,
časovače nebo buffery. Povolení obou možností může vytvářet dva nezávislé druhy spanů;
pro rozlišení těchto spanů protokolů volání použijte instrumentační scope
`omniroute.log-export`.

| Klíč                     | Výchozí hodnota / účel                                                            |
| ------------------------ | --------------------------------------------------------------------------------- |
| `endpoint`               | Povinná úplná URL tras HTTP(S); přípona `/v1/traces` se nepřidává                 |
| `headers`                | Volitelné řádky `Name: value` nebo JSON objekt řetězců; šifrováno                 |
| `requestHeaderAllowlist` | Prázdné (vypnuto); názvy/prefixy hlaviček klienta k zachycení jako atributy spanů |
| `serviceName`            | `omniroute`; resource `service.name`                                              |
| `langfuseMapping`        | `false`; přidává atributy generování relace/uživatele Langfuse                    |
| `identity`               | `pseudonymous`, `keyName` nebo `none`                                             |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                           |
| `timeoutMs`              | `30000` na každý pokus HTTP                                                       |
| `environment`            | Nenastaveno; volitelné `langfuse.environment`                                     |

Obecný dashboard zobrazuje tato pole. `paths` přijímá pole API nebo textovou oblast
s přesnými cestami oddělenými novými řádky či čárkami. Embeddings, rerank a další cesty
se přeskočí, pokud nejsou výslovně povoleny. Přeskočené řádky přesto posouvají kurzor;
počítadla `exported`/`exportedTotal` existujícího runneru počítají zpracované zdrojové
řádky, včetně filtrovaných řádků, nikoli přijaté spany. Filtrování probíhá v podřízeném
procesu, aniž by se měnila jeho smlouva IPC/kurzoru.

Ověření URL používá pomocnou funkci `parseAndValidateNonMetadataUrl` nezávislou na DB ze
souboru `src/shared/network/outboundUrlGuard.ts`: zásadu `block-metadata`. Má stejné
bezpodmínečné kontroly metadat/protokolu/vložených přihlašovacích údajů jako validátor
webhooků, přičemž privátní URL jsou povoleny, ale záměrně umožňuje cíle localhost/LAN bez
globálního přepsání příznaku funkcí. To umožňuje endpointy self-hosted služeb Langfuse,
Phoenix, Tempo a Collector, včetně privátních HTTP endpointů. Cloudové metadata hosty jsou
vždy blokovány. Přesměrování se nesledují, takže collector nemůže přesměrovat přihlašovací
údaje na jiného hostitele. Stejně jako existující lexikální ochrana URL ani tato ochrana
nepřipíná překlad DNS; konfigurujte pouze hostitele řízené operátorem. Pokud endpoint není
v důvěryhodné síti, upřednostněte HTTPS.

### Data a doručování

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) přenáší jeden
CLIENT span pro každý povolený řádek, pojmenovaný podle přesné cesty požadavku. Pojmenování
podle cesty rozlišuje Chat Completions, Responses a Messages, aniž by do názvu spanu
vkládalo údaje o modelu nebo identitě. Atributy resource zahrnují `service.name` a
`service.version` balíčku.

Běžný logger pokusů chatu (`open-sse/handlers/chatCore/attemptLogging.ts`) při dokončení
zapisuje `duration = Date.now() - startTime` a neposkytuje časové razítko;
`saveCallLogOperation` v `src/lib/usage/callLogs.ts` nastavuje časové razítko ve výchozím
stavu na čas zápisu (dokončení). Export proto nastavuje end na časové razítko řádku a start
na end − duration (v milisekundách převedených na desítkové nanosekundy). Historická časová
razítka dodaná volajícím se rovněž zachovávají jako čas end; neexistuje rozlišení startu/
dokončení pro jednotlivé řádky. Hodnota null u duration se mění na nulu. Neplatná/chybějící
časová razítka způsobí selhání dávky, místo aby vytvořila nedeterministické spany. `ttftMs`
je nullable a mapuje se na `omniroute.ttft_ms`.

Atributy zahrnují `gen_ai.operation.name="chat"`, poskytovatele, požadovaný/vrácený model,
vstupní/výstupní tokeny, volitelné tokeny čtení mezipaměti/vytvoření mezipaměti/
reasoningu, stav HTTP, combo, zdroj mezipaměti, značku relace a ID korelace. Celočíselné
hodnoty OTLP a časová razítka jsou desítkové řetězce; řetězce, logické hodnoty a desetinná
čísla používají nativní varianty hodnot OTLP. Chybové spany mají stav ERROR a
sanitizovanou stavovou zprávu. Kanonický záznam neobsahuje URL hostitele upstreamu, takže
`server.address` se vynechává, aby nedošlo k nesprávnému označení collectoru jako serveru
modelu. Cena se neexportuje.

Obsah se načte pouze při `includeBodies=true`. Při `langfuseMapping=false` obsahují
`gen_ai.input.messages` / `gen_ai.output.messages` sanitizovaný JSON těla požadavku/
odpovědi uložený službou OmniRoute (pokud jej lze parsovat, je kanonikalizován), nikoli
přeformátované pole zpráv semconv. Oříznutá/ne-JSON těla zůstávají nezměněným textem. Při
`langfuseMapping=true` se těla emitují pouze jako `langfuse.observation.input` /
`langfuse.observation.output`; atributy `gen_ai.*.messages` se vynechávají, takže každé
tělo je odesláno pouze jednou. Oba režimy přebírají `maxBodyBytes` z existující cesty
načítání; `omniroute.bodies_truncated=true` označuje oříznutí.
Tento cíl nepřidává žádné další snapshoty pipeline ani nečištěná načtení artefaktů;
volitelné zachytávání hlaviček požadavku používá existující načtený snapshot klienta
popsaný níže. Při exportu těl používejte minutovou frekvenci, například
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, namísto hromadění hodinového backlogu.

### Volitelné hlavičky požadavků klienta

Zachytávání hlaviček je ve výchozím nastavení **vypnuté**. Nastavte v konfiguraci cíle
`requestHeaderAllowlist` a povolte **Export prompts and responses**
(`includeBodies: true` v cíli).
Allowlist přijímá pole API nebo textovou oblast s názvy oddělenými novými řádky/čárkami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Názvy se shodují bez ohledu na velikost písmen a přesně, pokud jeden koncový znak `*` nevybere neprázdnou předponu názvu hlavičky. Samostatný znak `*`, vložené zástupné znaky a neplatné názvy HTTP hlaviček jsou odmítnuty. Existuje nejvýše 64 selektorů, přičemž každý název/předpona může mít nejvýše 256 bajtů ASCII.
Toto nastavení je oddělené od `headers`, které slouží k ověření exportéru vůči kolektoru.

Zachytávání čte pouze z `pipeline_client_request`, naplněného z uloženého podrobného pipeline pomocí
`clientRawRequest` (nebo staršího `clientRequest`). Nikdy se nevrací k hlavičkám požadavku poskytovatele.
Podrobné protokolování pipeline muselo být povoleno v době zaznamenání požadavku. Pokud je
`includeBodies` zakázáno nebo pokud JSON snímku klienta chybí, je poškozený či zkrácený, nejsou emitovány žádné atributy hlaviček. Zvýšení `maxBodyBytes` může zabránit zkrácení snímku při exportu;
nemůže obnovit podrobnosti, které nebyly nikdy uloženy. Snímek větší než 1 MiB nebo obsahující více
než 256 položek hlaviček je ignorován. Stávající export promptů/odpovědí zůstává povolen souběžně se zachytáváním hlaviček; seznam povolených hlaviček neposkytuje režim hydratace pouze hlaviček.

Vybrané hodnoty se stanou řetězcovými poli OTLP
`http.request.header.<full lowercase header name>`, a to i v případě jediného řetězce. Například
`X-OmniRoute-Meta-Team: example-team` se stane
`http.request.header.x-omniroute-meta-team` s hodnotou
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Celá předpona je zachována: jedná se o běžné hlavičky bez parsování obchodních polí nebo převodu na
`omniroute.metadata.*` / metadata Langfuse. `langfuseMapping` nemění význam hlaviček. Vybraná hlavička
`User-Agent` s jedinou hodnotou také nastaví standardní skalární atribut
`user_agent.original`. Čárky uvnitř jedné hodnoty se nerozdělují. Varianty lišící se velikostí písmen se sloučí v pořadí uložených položek; pokud je některá varianta neplatná, vynechá se celá daná hlavička. Atributy jsou seřazeny podle názvu převedeného na malá písmena.

Hlavičky Authorization, Proxy-Authorization, Cookie, Set-Cookie, hlavičky API klíčů, názvy obsahující
značky auth/token/secret/password/credential a interní přihlašovací údaje brány jsou vždy vyloučeny,
i když byly vybrány nebo ve zpracování částečně maskovány. Známé vzory přihlašovacích údajů znovu používají sdílený detektor přihlašovacích údajů; značky redakce se vynechávají a neexportují se jako bezpečné hodnoty.
Přijímány jsou pouze řetězce a neprázdná pole řetězců; čísla ani objekty se nepřevádějí.
Neplatné názvy, klíče prototypu, řídicí znaky (s výjimkou horizontálního tabulátoru) a poškozený Unicode se ignorují, aniž by selhala dávka nebo se jejich obsah objevil v chybách.

Každý span zachytí nejvýše 32 hlaviček, 16 hodnot na hlavičku, 4096 bajtů UTF-8 na hodnotu
a celkem 16384 bajtů UTF-8 napříč zachycenými názvy hlaviček a hodnotami. Nadměrně velké nebo neplatné hlavičky se vynechávají celé, nikoli zkracují. Výběr je rozhodnutím operátora v oblasti ochrany soukromí: i zdánlivě bezpečné názvy mohou stále obsahovat osobní údaje a tyto limity/detektory nejsou obecným nástrojem pro odstraňování PII.

### Limity doručování

Požadavky jsou omezeny na 500 spanů a 4 MiB UTF-8 JSON včetně obálky.
Každý povolený span se kontroluje z hlediska velikosti před prvním požadavkem dávky kurzoru. Jednotlivý
span větší než limit neodešle žádnou část této dávky a skončí chybou s pokynem ke snížení
`maxBodyBytes`; není tiše zahozen. Předběžná kontrola uchovává pouze odkazy na záznamy
a počty bajtů a zahazuje každý dočasný span/JSON; spany se znovu sestavují pro omezené části,
místo aby se uchovávala druhá serializovaná kopie dávky. HTTP 408/429/5xx, síťová selhání a časové limity mají nejvýše
tři pokusy s exponenciálním čekáním 250/500 ms. Hlavička `Retry-After` v sekundách nebo datum HTTP
mohou prodloužit čekání až na 5 sekund. U ostatních stavů se selže okamžitě. Částečné odmítnutí OTLP 2xx také vyvolá chybu namísto potvrzení ztraceného spanu; prázdná nebo platná JSON potvrzení jsou přijata s
limitem čtení odpovědi 64 KiB.

Chyby obsahují pouze skutečnosti vlastněné exportérem: stav HTTP, třídu opakování, počet pokusů a počet odeslaných spanů nebo pevně stanovené znění potvrzení/síťové chyby. Těla odpovědí kolektoru,
počty částečných úspěchů a hlavičky odpovědi se nikdy nekopírují do chyb,
protokolů ani řídicího panelu. Dávka, která selhala nebo byla přijata jen částečně, se nepotvrdí: cíl zobrazí stav Failing s daným stavem, kurzor zůstane u poslední potvrzené dávky a další spuštění znovu odešle stejné řádky. Trvalé stavy zůstanou ve stavu selhání, dokud nebude opraven kolektor nebo konfigurace. Podrobnosti odpovědi najdete ve vlastních protokolech kolektoru. Souhrny chyb protokolu volání si zachovávají samostatnou redakci.
`prepare()` nic nezajišťuje; Test odešle přesně `{"resourceSpans":[]}` a ohlásí
stav HTTP bez zápisu spanů protokolu volání.

ID tras a ID spanů jsou prvních 32/16 hexadecimálních číslic SHA-256 nad
`"omniroute.trace\\0" + callLogId` a `"omniroute.span\\0" + callLogId`. Opakovaná odeslání nesou
shodná ID. Nejde o záruku deduplikace: některé backendy včetně příjmu Langfuse
v4 nededuplicují spany se stejným ID. Selhání po pádu nebo selhání částečné části může znovu
odeslat nejvýše jednu nepotvrzenou dávku kurzoru; celá tato dávka může být duplikována,
nikoli pouze její poslední část HTTP. Velikost dávky kurzoru zvolte s ohledem na tento kompromis.

### Příklad Langfuse

Pro samostatně hostovanou instanci Langfuse nakonfigurujte tato pole:

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

Hodnotu Authorization vytvořte lokálně jako Base64 literálního řetězce `public-key:secret-key`
(například pomocí `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nevkládejte skutečné přihlašovací údaje do protokolů, snímků obrazovky ani hlášení problémů. Mapování automaticky
nastaví `x-langfuse-ingestion-version: 4`; Authorization se stále zadává v `headers`.
Obě hlavičky i vygenerovaný sůl identity používají stávající mechanismus šifrovaných polí s tajnými údaji a zástupnými symboly API; je vyžadována hodnota `STORAGE_ENCRYPTION_KEY`.

Mapování přidává typ/model generování, podrobnosti o využití JSON (vstup/výstup/celkem a dostupné
klíče mezipaměti), snímky vstupu/výstupu JSON, úroveň ERROR/DEFAULT, sanitizovanou stavovou
zprávu, název trasování, ID relace, volitelné prostředí a filtrovatelné
`langfuse.observation.metadata.<key>` pro poskytovatele, požadovaný model, cestu, kombinaci, zdroj
mezipaměti a stav. `langfuse.observation.completion_start_time` je ve formátu ISO 8601 na
začátku + TTFT pouze tehdy, když je TTFT známé a nachází se v rámci trvání. Neodesílají se žádné
atributy nákladů.

Režimy identity se vztahují na `langfuse.user.id`:

- `pseudonymous` (výchozí): HMAC-SHA256 interního ID klíče API s náhodným 32bajtovým hashem
  salt pro každý cíl. Salt se při vytvoření vygeneruje, pokud chybí, zašifruje se jako
  `identitySalt`, nikdy se nevrací a během úprav se zachovává. Nezpracovaná ID klíčů se nikdy
  nevkládají do atributů rozsahů. Opětovné vytvoření nebo změna salt cíle změní identity.
- `keyName`: nakonfigurovaný název klíče API, který záměrně odhaluje tento štítek operátora.
- `none`: žádné ID uživatele. Štítky relace se při jejich přítomnosti stále exportují; tyto
  režimy neanonymizují libovolný obsah promptů ani štítky relace/korelace zadané operátorem.

### Zahájení bez doplnění historie

Pouze při vytvoření aktivujte **Zahájit z aktuální pozice (přeskočit existující protokoly)** nebo
na nejvyšší úrovni datové části API pro vytvoření předejte
`startFromCurrentPosition: true`. Inicializuje `cursor_row_id` na aktuální maximum zachovaného
rowid protokolu volání pomocí stávajících pomocných funkcí kurzoru, bez migrace. Výchozí hodnota
je false (kurzor 0 a doplnění zachované historie). Nejde o nastavení resetování kurzoru při
aktualizaci.

Sdílené přidání `ttftMs` také přidává sloupec s hodnotou nullable `ttft_ms` do mapování BigQuery
a schématu nové tabulky: test schématu vyžaduje, aby každé kanonické pole záznamu mělo sloupec.
Stávající tabulky pokračují v nezměněném exportu: `prepare()` načte schéma tabulky a vynechá pouze
`ttft_ms`, pokud tento sloupec chybí. Přidejte nullable sloupec INT64, abyste získali TTFT
při dalším spuštění, nebo použijte novou tabulku. Volitelný sloupec TTFT nespouští aktualizaci
schématu. Sloupce s údaji o využití se řídí níže uvedeným podmíněným postupem kompatibility
s aktivací na vyžádání; u ostatních polí řádků zůstává zachována striktní kontrola schématu.

---

## 6. Přidání cíle

1. Vytvořte `src/lib/logExport/destinations/<name>.ts`, který exportuje `LogExportDestinationType`:
   Zod `configSchema`, pole deskriptorů `fields` pro uživatelské rozhraní, `secretFields` a
   `createClient(config)` vracející `test()` / `prepare()` / `send(records)`.
2. Přidejte jej do pole `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napište testy v `tests/unit/`.

To je celá změna: ukládání dat, úloha cron, vrstva REST, šifrování tajných údajů i
formulář na řídicím panelu čtou registr.

Dvě pravidla pro nový cíl:

- `send()` **musí vyhodit výjimku** při částečném selhání. Úspěšné dokončení znamená „cíl má tyto řádky“
  a kurzor se trvale posune za ně.
- Cíl, který přijímá URL zadanou uživatelem, ji musí před odesláním požadavku ověřit pomocí
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  stejně jako webhooky. BigQuery to nepotřebuje: jeho hostitelé jsou konstantní.

---

## 7. Používání

- **Panel**: Integrace → Export protokolů. Přidejte cíl, spusťte **Test** pro ověření přihlašovacích údajů
  bez zápisu řádků a poté jej povolte.
- **Nevyřízené položky**: karta každého cíle zobrazuje čekající řádky a kurzor; `GET
/api/log-export/status` vrací stejné údaje a posledních 20 spuštění úloh.
- **Selhání jednoho cíle nezpůsobí selhání ostatních** — souhrn spuštění zaznamenává stav jednotlivých cílů
  v `last_status` / `last_error` a historie spuštění úloh uchovává souhrnný stav.
- **Odstraněním cíle odstraníte jeho kurzor.** Jeho opětovné přidání začne od nejstaršího uchovaného
  záznamu protokolu volání, takže znovu odešle řádky, které cíl již může obsahovat. V BigQuery
  `insertId` potlačí tyto duplicity pouze v rámci vlastního okna deduplikace BigQuery, proto je vhodnější
  cíl deaktivovat než jej odstranit.

### Kompatibilita schématu důkazů o využití

Nové tabulky BigQuery obsahují hodnoty s možností NULL `usage_evidence` (STRING obsahující JSON) a
`usage_estimated` (BOOL). Pokud je povoleno `autoCreate`, může existující tabulka obdržet pouze tyto chybějící sloupce s možností NULL. Exportér zachovává celé stávající schéma včetně metadat polí
a odesílá podmíněný PATCH s použitím vráceného etagu. Souběžná změna schématu export zneplatní,
místo aby jej přepsala; při dalším spuštění se tabulka načte znovu.

Pokud je `autoCreate` zakázáno, přidejte tyto sloupce sami před exportem záznamů s důkazy o využití.
Chybějící metadata schématu/etagu nebo neúspěšná aktualizace také zabrání vložení záznamů obsahujících důkazy. Kurzoru exportu se při tomto selhání nepřičte a důkazy nebudou nikdy tiše zahozeny.
Při zablokovaném exportu se stále uplatňuje místní uchovávání protokolů, proto selhání vyřešte dříve,
než platnost uchovaných zdrojových řádků vyprší.
