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

| Klíč                 | Poznámky                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| `projectId`          | Projekt GCP obsahující datovou sadu                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                          |
| `location`           | Použije se pouze při vytváření datové sady (výchozí `EU`)                |
| `serviceAccountJson` | Klíč servisního účtu. Tajný údaj: v úložišti šifrovaný, nikdy se nevrací |
| `autoCreate`         | Vytvořit datovou sadu a tabulku při prvním exportu (výchozí `true`)      |

Servisní účet potřebuje oprávnění `bigquery.tables.updateData` pro cílovou tabulku a také
`bigquery.datasets.create` / `bigquery.tables.create`, pokud je zapnuté `autoCreate`.

Nakonfigurovaná dávka je jednotkou **kurzoru**, nikoli HTTP: `send()` ji rozdělí na volání insertAll
s nejvýše 500 řádky, takže ani velká hodnota `batch_size` nemůže překročit limit požadavku BigQuery 10 MB.
Při přechodných stavových kódech (408/429/500/502/503/504) se požadavek opakuje až třikrát s exponenciálně
rostoucí prodlevou a se stejnými insertIds; chyby ověřování a schématu vyvolají výjimku hned při prvním pokusu,
místo aby se jimi marnil celý běh.

Právě vytvořená tabulka ještě není viditelná pro streamovací koncový bod, který několik sekund
odpovídá kódem 404. Při této chybě 404 se požadavek opakuje, ale **pouze pokud tabulku vytvořil tento běh** —
pokud tabulka skutečně chybí, operace stále okamžitě selže. Upozorňujeme, že opětovné vytvoření tabulky pod názvem,
který byl nedávno odstraněn, způsobí, že BigQuery několik minut odmítá streamované vkládání; jde o
vlastnost postupu odstranění a následného opětovného vytvoření, proto raději použijte nový název tabulky, než abyste ji odstranili a znovu přidali.

**Částečné selhání přichází jako HTTP 200 s neprázdným `insertErrors[]`.** Považuje se za
selhání a vyvolá výjimku, což brání posunu kurzoru za řádky, které BigQuery nikdy
nepřijal; `tests/unit/log-export-bigquery.test.ts` toto chování ověřuje.

Přenos používá prosté REST — vlastním klíčem podepsané tvrzení RS256 se vymění za přístupový token na
`https://oauth2.googleapis.com/token` a poté se řádky odesílají do `tabledata.insertAll`. Žádné Google SDK se
nepřidává. Přístupové tokeny se ukládají do mezipaměti v rámci procesu pro každou dvojici (servisní účet, rozsah oprávnění).

Vytvořená tabulka obsahuje jeden sloupec pro každé pole na kartě Protokoly a navíc `exported_at`. Její uspořádání odpovídá
tomu, jak se protokoly volání skutečně dotazují:

- **Rozdělení do denních oddílů podle `timestamp`**, takže dotaz omezený datem prohledává pouze příslušné dny.
- **Clustering podle `api_key_name`, `provider`, `model`, `status`** (v tomto pořadí), takže filtrování podle
  toho, kdo volání spustil, kam směřovalo nebo zda selhalo, vyřazuje bloky uvnitř jednotlivých oddílů. BigQuery
  povoluje nejvýše čtyři sloupce pro clustering a na pořadí záleží: samotný filtr podle `api_key_name`
  bloky vyřazuje, samotný filtr podle `status` nikoli.
- **Volitelná doba uchovávání oddílů** pomocí `partitionExpirationDays` (0 uchovává vše), která se použije
  při vytvoření tabulky.

Obě nastavení se použijí při vytvoření. Existující tabulka si ponechá své dosavadní uspořádání, takže
pokud je chcete využít, nasměrujte cíl na nové ID tabulky.

`tests/unit/log-export-bigquery.test.ts` ověřuje, že mapování a schéma tabulky zůstávají
synchronizované, takže nový sloupec protokolu volání nemůže být při exportu bez upozornění vynechán.

Dávky se rozdělují podle **obou** kritérií: počtu řádků i počtu serializovaných bajtů. Samotný počet řádků nestačí,
pokud se exportují i datové obsahy: 500 řádků obsahujících prompty může mít desítky megabajtů a insertAll
odmítá požadavky větší než 10 MB. Část se uzavře při dosažení 500 řádků nebo 9 MB, podle toho, co nastane dříve.

---

## 5. Cíl pro trasování OTLP/HTTP

Konfigurace používá `type: "otlp-http"`. Jde o plánovaný export uložených
protokolů volání využívající kurzor, nikoli o průběžný výstup událostí směrování s doručováním bez záruky v
`open-sse/services/routing/otel.ts`. Nečte ani nemění proměnné prostředí,
časovače ani vyrovnávací paměti tohoto výstupu. Zapnutí obou může vytvářet dva nezávislé druhy spanů;
k rozlišení těchto spanů z protokolů volání použijte instrumentační rozsah `omniroute.log-export`.

| Klíč                     | Výchozí hodnota / účel                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `endpoint`               | Povinná úplná HTTP(S) URL pro trasování; přípona `/v1/traces` se nepřipojuje            |
| `headers`                | Volitelné řádky `Name: value` nebo objekt JSON s řetězci; šifrováno                     |
| `requestHeaderAllowlist` | Prázdné (vypnuto); názvy/prefixy klientských hlaviček zachycovaných jako atributy spanu |
| `serviceName`            | `omniroute`; atribut prostředku `service.name`                                          |
| `langfuseMapping`        | `false`; přidává atributy generování/relace/uživatele pro Langfuse                      |
| `identity`               | `pseudonymous`, `keyName` nebo `none`                                                   |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                 |
| `timeoutMs`              | `30000` na každý pokus HTTP                                                             |
| `environment`            | Nenastaveno; volitelný atribut `langfuse.environment`                                   |

Obecný řídicí panel zobrazuje tato pole. `paths` přijímá pole přes API nebo textovou oblast
s přesnými cestami oddělenými novými řádky/čárkami. Cesty pro embeddingy, rerank a další se
přeskakují, pokud nejsou výslovně povoleny. Přeskočené řádky přesto posouvají kurzor; stávající
čítače `exported`/`exportedTotal` spouštěče počítají zpracované zdrojové řádky včetně odfiltrovaných
řádků, nikoli přijaté spany. Filtrování probíhá v podřízeném procesu, aniž by se měnil jeho
kontrakt IPC/kurzoru.

Ověřování URL používá pomocnou funkci `parseAndValidateNonMetadataUrl`, která nevyužívá databázi, ze souboru
`src/shared/network/outboundUrlGuard.ts`: zásadu `block-metadata`. Provádí stejné
bezpodmínečné kontroly metadat/protokolu/vložených přihlašovacích údajů jako validátor webhooků
s povolenými privátními URL, ale záměrně umožňuje cíle na localhostu/v LAN bez globálního
přepsání příznaku funkce. To umožňuje používat koncové body samostatně hostovaných služeb Langfuse, Phoenix, Tempo a Collector,
včetně privátních koncových bodů HTTP. Hostitelé cloudových metadat jsou vždy blokováni.
Přesměrování se nenásledují, takže kolektor nemůže přesměrovat přihlašovací údaje na jiného hostitele.
Stejně jako stávající lexikální ochrana URL ani tato nezajišťuje pevné svázání s výsledkem překladu DNS; konfigurujte pouze
hostitele pod kontrolou provozovatele. Pokud koncový bod není v důvěryhodné síti, upřednostňujte HTTPS.

### Datová část a doručování

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) přenáší jeden
span typu CLIENT pro každý povolený řádek, pojmenovaný podle přesné cesty požadavku. Pojmenování podle cesty rozlišuje
Chat Completions, Responses a Messages, aniž by do názvu spanu vkládalo údaje o modelu nebo identitě.
Atributy prostředku zahrnují `service.name` a `service.version` balíčku.

Běžný zapisovač protokolů pokusů o chat (`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` při dokončení a neposkytuje časové razítko;
`saveCallLogOperation` v `src/lib/usage/callLogs.ts` jako výchozí časové razítko používá čas zápisu
(dokončení). Export proto nastavuje konec = časové razítko řádku a začátek = konec − doba trvání
(milisekundy převedené na nanosekundy v desítkovém zápisu). Historická časová razítka dodaná volajícím
se rovněž zachovávají jako čas konce; u jednotlivých řádků neexistuje rozlišení mezi začátkem a dokončením.
Doba trvání s hodnotou null se převede na nulu. Neplatná/chybějící časová razítka způsobí selhání dávky namísto vytvoření
nedeterministických spanů. `ttftMs` může mít hodnotu null a mapuje se na `omniroute.ttft_ms`.

Atributy zahrnují `gen_ai.operation.name="chat"`, poskytovatele, požadovaný/vrácený model,
vstupní/výstupní tokeny, volitelné tokeny čtení z mezipaměti/vytváření mezipaměti/uvažování, stav HTTP,
combo, zdroj mezipaměti, značku relace a korelační ID. Celočíselné hodnoty OTLP a časová razítka
jsou řetězce v desítkovém zápisu; řetězce, booleovské hodnoty a desetinná čísla používají odpovídající nativní varianty hodnot
OTLP. Chybové spany mají stav ERROR a sanitizovanou stavovou zprávu. Kanonický
záznam neobsahuje URL nadřazeného hostitele, proto se `server.address` vynechává, místo aby
nesprávně označoval kolektor jako server modelu. Náklady se neexportují.

Obsah se načítá pouze při `includeBodies=true`. Při `langfuseMapping=false`
obsahují `gen_ai.input.messages` / `gen_ai.output.messages` sanitizovaný JSON těla požadavku/odpovědi
tak, jak jej ukládá OmniRoute (kanonizovaný, pokud jej lze parsovat), nikoli pole zpráv
převedené do podoby sémantických konvencí. Zkrácená těla a těla v jiném formátu než JSON zůstávají prostým textem. Při `langfuseMapping=true`
se těla odesílají pouze jako `langfuse.observation.input` / `langfuse.observation.output`;
atributy `gen_ai.*.messages` se vynechávají, takže se každé tělo odešle jednou. Oba režimy
přebírají `maxBodyBytes` ze stávajícího postupu načítání obsahu;
`omniroute.bodies_truncated=true` označuje zkrácení.
Tento cíl nepřidává žádné další snímky pipeline ani čtení nesanitizovaných artefaktů;
volitelné zachytávání hlaviček požadavku používá stávající načtený snímek klienta popsaný níže.
Při exportu těl používejte interval v řádu minut, například `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
namísto hromadění hodinové fronty.

### Volitelné hlavičky klientských požadavků

Zachytávání hlaviček je **ve výchozím nastavení vypnuté**. Nastavte `requestHeaderAllowlist` v konfiguraci cíle
a zapněte **Exportovat prompty a odpovědi** (`includeBodies: true` u cíle).
Seznam povolených hlaviček přijímá pole přes API nebo textovou oblast s názvy oddělenými novými řádky/čárkami:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Názvy se porovnávají přesně, bez rozlišování velikosti písmen, pokud jediný koncový znak `*` nevybírá neprázdný
prefix názvu hlavičky. Samostatný znak `*`, zástupné znaky uvnitř názvu a neplatné názvy HTTP hlaviček se odmítají.
Povoleno je nejvýše 64 selektorů, každý s názvem/prefixem o délce nejvýše 256 bajtů ASCII.
Toto nastavení je oddělené od `headers`, které slouží k autentizaci exportéru vůči kolektoru.

Zachytávání čte pouze `pipeline_client_request`, naplněný z `clientRawRequest`
(nebo staršího `clientRequest`) uložené podrobné pipeline. Nikdy nepoužívá jako náhradu hlavičky požadavku poskytovatele.
Podrobné protokolování pipeline muselo být povoleno v okamžiku zaznamenání požadavku. Pokud je
`includeBodies` vypnuto nebo JSON snímku klientského požadavku chybí, je poškozený či zkrácený, žádné atributy
hlaviček se nevytvoří. Zvýšení `maxBodyBytes` může zabránit zkrácení snímku při exportu;
nemůže však obnovit podrobnosti, které nebyly nikdy uloženy. Snímek větší než 1 MiB nebo obsahující více než
256 položek hlaviček se ignoruje. Stávající export promptů a odpovědí zůstává aktivní souběžně
se zachytáváním hlaviček; seznam povolených položek neposkytuje režim načítání pouze hlaviček.

Vybrané hodnoty se převedou na pole řetězců OTLP `http.request.header.<full lowercase header name>`,
a to i v případě jediného řetězce. Například `X-OmniRoute-Meta-Team: example-team` se převede na
`http.request.header.x-omniroute-meta-team` s hodnotou
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Celý prefix se zachovává: jde o běžné hlavičky, bez parsování obchodních polí nebo
převodu na `omniroute.metadata.*` / metadata Langfuse. `langfuseMapping` nemění sémantiku
hlaviček. Vybraná hlavička `User-Agent` s jedinou hodnotou nastaví také standardní skalární atribut
`user_agent.original`. Čárky uvnitř jedné hodnoty nezpůsobují její rozdělení. Varianty lišící se velikostí písmen se slučují v pořadí uložených
položek; jakákoli neplatná varianta způsobí vynechání celé hlavičky. Atributy jsou seřazeny podle názvu převedeného na malá písmena.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, hlavičky s klíči API, názvy obsahující
značky auth/token/secret/password/credential a interní přihlašovací údaje brány jsou vždy
vyloučeny, i když jsou vybrané nebo v úložišti částečně maskované. Rozpoznávání známých vzorů přihlašovacích údajů využívá
sdílený detektor přihlašovacích údajů; značky redakce se vynechávají, nikoli exportují jako bezpečné hodnoty.
Přijímají se pouze řetězce a neprázdná pole řetězců; čísla ani objekty se nepřevádějí.
Neplatné názvy, klíče prototypu, řídicí znaky (kromě vodorovného tabulátoru) a chybně utvořené Unicode
se ignorují, aniž by způsobily selhání dávky nebo se jejich obsah promítl do chybových zpráv.

Každý span zachytí nejvýše 32 hlaviček, 16 hodnot na hlavičku, 4096 bajtů UTF-8 na hodnotu
a celkem 16384 bajtů UTF-8 pro názvy a hodnoty zachycených hlaviček. Příliš velké či neplatné hlavičky
se vynechávají celé, nezkracují se. Výběr je rozhodnutím provozovatele ohledně ochrany soukromí: i zdánlivě bezpečné názvy
mohou obsahovat osobní údaje a tyto limity a detektory nejsou univerzálním nástrojem pro odstraňování osobních údajů.

### Limity doručování

Požadavky jsou omezeny na 500 spanů a 4 MiB JSON v UTF-8 včetně obálky.
Velikost každého povoleného spanu se kontroluje před prvním požadavkem dávky kurzoru. Pokud jednotlivý
span překročí limit, neodešle se žádná část dané dávky a operace selže s doporučením snížit
`maxBodyBytes`; span se nezahodí bez upozornění. Předběžná kontrola uchovává pouze odkazy na záznamy a
počty bajtů a každý dočasný span/JSON zahodí; spany se znovu sestavují pro bloky s omezenou velikostí,
místo aby se uchovávala druhá serializovaná kopie dávky. U HTTP 408/429/5xx, síťových selhání a vypršení časového limitu se provedou nejvýše
tři pokusy s exponenciálně rostoucí prodlevou 250/500 ms. Počet sekund nebo datum HTTP v `Retry-After`
může prodlevu prodloužit až na 5 sekund. Ostatní stavové kódy způsobí okamžité selhání. Částečné odmítnutí OTLP s kódem 2xx také vyvolá výjimku, místo aby
potvrdilo ztracený span; přijímá se prázdné potvrzení nebo potvrzení v platném JSON, s
limitem čtení odpovědi 64 KiB.

Chyby obsahují pouze údaje pocházející z exportéru: stavový kód HTTP, kategorii opakování, počet pokusů a počty odeslaných
spanů nebo pevně dané znění chyby potvrzení či síťového selhání. Těla odpovědí kolektoru,
počty částečně úspěšných položek ani hlavičky odpovědí se nikdy nekopírují do chyb, protokolů ani
na řídicí panel. Neúspěšná nebo částečně přijatá dávka se nepotvrdí: cíl zobrazuje
stav Selhává s příslušným stavovým kódem, kurzor zůstává na poslední potvrzené dávce a další spuštění
znovu odešle stejné řádky. Trvalé stavové chyby způsobují opakovaná selhání, dokud se neopraví kolektor nebo
konfigurace. Podrobnosti odpovědi hledejte v protokolech samotného kolektoru. Souhrny chyb v protokolu volání si zachovávají
vlastní redakci citlivých údajů.
`prepare()` nic nezřizuje; Test odešle metodou POST přesně `{"resourceSpans":[]}` a oznámí
stavový kód HTTP, aniž by zapisoval spany protokolu volání.

ID tras a ID spanů tvoří prvních 32/16 hexadecimálních číslic SHA-256 z
`"omniroute.trace\\0" + callLogId` a `"omniroute.span\\0" + callLogId`. Opakovaná odeslání nesou
shodná ID. To nezaručuje deduplikaci: některé backendy, včetně příjmu dat Langfuse
v4, spany se stejným ID nededuplikují. Pád nebo selhání části bloků může
způsobit opětovné odeslání nejvýše jedné nepotvrzené dávky kurzoru; duplicitní může být celá tato dávka,
nejen její poslední blok HTTP. Při volbě velikosti dávky kurzoru tento kompromis zohledněte.

### Příklad pro Langfuse

Pro instanci Langfuse provozovanou na vlastní infrastruktuře nakonfigurujte tato pole:

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

Hodnotu Authorization sestavte lokálně zakódováním doslovného řetězce `public-key:secret-key`
do Base64 (například pomocí `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nevkládejte skutečné přihlašovací údaje do protokolů, snímků obrazovky ani hlášení problémů. Mapování automaticky
nastaví `x-langfuse-ingestion-version: 4`; Authorization se nadále zadává v `headers`.
Hlavičky i vygenerovaná sůl identity používají stávající mechanismus šifrovaných polí pro tajné údaje
a zástupné hodnoty API; je vyžadován `STORAGE_ENCRYPTION_KEY`.

Mapování přidává typ/model generování, podrobnosti o využití ve formátu JSON (vstup/výstup/celkem a dostupné
klíče mezipaměti), snímky vstupu/výstupu ve formátu JSON, úroveň ERROR/DEFAULT, sanitizovanou stavovou zprávu,
název trasování, ID relace, volitelné prostředí a filtrovatelné
`langfuse.observation.metadata.<key>` pro poskytovatele, požadovaný model, cestu, kombinaci, zdroj
mezipaměti a stav. `langfuse.observation.completion_start_time` je čas ve formátu ISO 8601 odpovídající
začátku + TTFT, pouze pokud je TTFT známé a nepřesahuje dobu trvání. Žádné atributy nákladů se neodesílají.

Režimy identity se vztahují na `langfuse.user.id`:

- `pseudonymous` (výchozí): HMAC-SHA256 interního ID klíče API s náhodnou
  32bajtovou solí pro každý cíl. Pokud sůl chybí, vygeneruje se při vytvoření, zašifruje se
  jako `identitySalt`, nikdy se nevrací a při úpravách se zachovává. Nezpracovaná ID klíčů se nikdy
  nevkládají do atributů spanů. Opětovné vytvoření nebo rotace soli cíle změní identity.
- `keyName`: nakonfigurovaný název klíče API, který záměrně odhaluje toto označení zadané operátorem.
- `none`: žádné ID uživatele. Tagy relací se nadále exportují, pokud jsou přítomny; tyto režimy
  neanonymizují libovolný obsah promptů ani označení relací/korelací zadaná operátorem.

### Spuštění bez zpětného doplnění

Pouze při vytváření zapněte **Začít od aktuální pozice (přeskočit existující protokoly)** nebo předejte
`startFromCurrentPosition: true` na nejvyšší úrovni dat požadavku API pro vytvoření. Tím se inicializuje
`cursor_row_id` na aktuální maximální rowid uchovávaných záznamů protokolu volání pomocí existujících pomocných funkcí
pro kurzor, bez migrace. Výchozí hodnota je false (kurzor 0 a zpětné doplnění uchovávané historie).
Nejde o nastavení pro resetování kurzoru při aktualizaci.

Sdílené rozšíření o `ttftMs` také přidává sloupec `ttft_ms` umožňující hodnotu null do mapovače BigQuery
a schématu nových tabulek: test schématu vyžaduje, aby každé pole kanonického záznamu mělo odpovídající
sloupec. Existující tabulky se nadále exportují beze změn: `prepare()` načte schéma tabulky a
vynechá pouze `ttft_ms`, pokud tento sloupec chybí. Chcete-li získat TTFT
při příštím spuštění, přidejte sloupec typu INT64 umožňující hodnotu null nebo použijte novou tabulku. Není vyžadován PATCH, automatická změna schématu ani další
oprávnění; u všech ostatních polí řádků zůstává zachována přísná kontrola schématu.

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

## 7. Provoz

- **Řídicí panel**: Integrace → Export protokolů. Přidejte cíl, spusťte **Test** pro ověření přihlašovacích údajů
  bez zápisu řádků a poté jej povolte.
- **Nevyřízené záznamy**: každá karta cíle zobrazuje čekající řádky a kurzor; `GET
/api/log-export/status` vrací stejné údaje a posledních 20 spuštění úlohy.
- **Selhání jednoho cíle nezpůsobí selhání ostatních** — souhrn spuštění zaznamenává stav jednotlivých
  cílů do `last_status` / `last_error` a historie spuštění úlohy uchovává souhrnné údaje.
- **Smazáním cíle se smaže i jeho kurzor.** Po opětovném přidání začne od nejstaršího uchovaného
  záznamu volání, takže znovu odešle řádky, které už cíl může mít. V BigQuery tomu `insertId`
  jednotlivých řádků zabrání pouze v rámci vlastního deduplikačního okna BigQuery, proto raději
  cíl zakažte, než abyste jej smazali.
