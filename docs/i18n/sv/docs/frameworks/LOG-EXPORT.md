# Log export (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, inkrementell export av OmniRoute-anropsloggar till ett externt analyslager.

Fliken Logs i instrumentpanelen lagrar förfrågningshistorik i SQLite (`call_logs`), vars storlek begränsas genom
rotation och kvarhållning. Loggexport skickar regelbundet ut samma postuppsättning så att den kan leva längre än
den lokala databasen och sammanfogas med andra data. BigQuery är den första destinationen;
pipelinen är ett register, så fler destinationer kan läggas till.

---

## 1. Så fungerar det

```
server (dekryptera + validera konfiguration, stäm av markör)
  → starta IPC → isolerad exportChild-operativsystemsprocess
    → skrivskyddad storage.sqlite → gemensam fråga/mappning för anropsloggar
      → asynkron inläsning av artefakter → destinationens prepare()/send()
        → batch-IPC → servern sparar markören → bekräftelse via IPC
          → nästa batch; done via IPC → servern registrerar lyckat resultat
```

- **Schemaläggning** — ett cron-jobb i `JobRegistry`, `log_export`, med standardvärdet
  `0 * * * *` (varje timme, UTC). Registreras i `src/lib/initCloudSync.ts` och kan åsidosättas
  med `OMNIROUTE_LOG_EXPORT_CRON`. Varje körning tömmer alla **aktiverade** destinationer i
  tur och ordning.
- **Markör** — SQLites implicita `call_logs.rowid`, som sparas per destination i
  `log_export_destinations.cursor_row_id`. `timestamp` används avsiktligt inte som markör:
  anropare kan ange ett eget värde, så en långsam begäran kan skrivas efter en snabbare som
  startade senare, och en tidsstämpelmarkör skulle hoppa över den.
- **Batchning** — `batch_size` rader per begäran (standardvärde 500),
  `max_rows_per_run` rader per körning (standardvärde 10000), så att en stor kö töms över
  flera körningar i stället för att blockera en enda.
- **Leverans** — markören flyttas fram först efter att `send()` har slutförts. En misslyckad
  batch lämnar markören där den var, så samma rader försöks igen vid nästa körning. Garantin
  är leverans minst en gång plus deduplicering på destinationssidan, inte verklig leverans
  exakt en gång: BigQuery identifierar varje rad med anropsloggens id, vilket respekteras
  enligt bästa förmåga inom BigQuerys eget dedupliceringsfönster.
- **Överlappningsskydd** — cron-körningen och `POST .../run` kan starta samtidigt. En
  destination som redan töms hoppas över i stället för att tömmas två gånger (`skipped: true`
  i körningsresultatet), så en samtidig körning kan inte skicka om en batch eller flytta
  markören bakåt.
- **Återställning efter rensning** — om `cursor_row_id` hamnar ovanför `MAX(rowid)` (hela
  tabellen rensades och rad-id:n började om), återställer köraren markören till 0 i stället
  för att permanent sluta upptäcka nya rader.

### Isolerad körare och begränsningar

Varje destinationskörning i Node startar en separat, kortlivad underordnad
operativsystemsprocess (`child_process` med IPC, inte `worker_threads`). Läsning av body-data,
parsning/serialisering av nyttolastens JSON, destinationens `prepare()` och destinationens
nätverks-I/O körs där, inte i serverns händelseloop. Endast konfiguration och små
förloppsmeddelanden skickas via IPC; exporterade poster återgår aldrig till servern.
Cron-jobbet och Kör nu-routen behåller samma offentliga resultat och överlappningsskydd.

Den underordnade processen öppnar serverns upplösta `DATA_DIR/storage.sqlite` skrivskyddat
med `node:sqlite`, med `busy_timeout=5000` och `query_only=ON`. Den importerar ingen
DB-singleton och utför inga migreringar, säkerhetskopieringar eller SQLite-uppdateringar.
Bokföring av saknade/skadade artefakter (inklusive UPDATE för skadade artefakter) finns endast
kvar i instrumentpanelens detaljflöde. Båda flödena delar en ren detaljresolver; exporten
använder asynkrona filsystemsläsningar och samma upplösningsordning: artefakt → äldre inline-data
→ äldre data på disk → inget. En körning tar en ögonblicksbild av maximalt infognings-rowid
när den underordnade processen öppnar sin läsare; senare infogningar väntar till nästa körning.
Detta är en infogningsgräns, inte en långlivad SQLite-transaktion: WAL-skrivare och
kontrollpunkter kan fortsätta fritt under nätverksväntan. Uppdateringar/borttagningar av
befintliga rader fryses inte av denna gräns.

Efter varje godkänd batch väntar den underordnade processen på en bekräftelse. Servern sparar
först markören med `advanceLogExportCursor` och skickar sedan `ack`; ingen ny batch startar
innan dess. Ett sändningsfel, en krasch eller en timeout registrerar ett fel utan att flytta
fram markören för den batchen. Tidigare bekräftade batcher förblir sparade; som mest kan den
enda obekräftade batchen skickas om. Ett lyckat resultat registreras först efter `done` och
att den underordnade processen har avslutats utan fel. Vid fel avslutas den underordnade
processen med SIGTERM, vilket eskaleras till SIGKILL efter 500 ms, och köraren väntar tills
processen har stängts.

| Miljövariabel                                 | Standardvärde | Syfte                                     |
| --------------------------------------------- | ------------- | ----------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000        | Tidsgräns per destination i väggklockstid |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024          | V8-gräns för old-space i MB               |

Ogiltiga, icke-positiva eller icke-heltaliga värden använder standardvärdena. Heap-inställningen
är inte en gräns för total RSS; mycket stora batcher kan fortfarande tömma den underordnade
processens minne och låta körningen misslyckas på ett säkert sätt. Standardvärdet 1024 MB
lämnar marginal för standardbatchen på 500 rader med artefakter på 512 KiB och inkluderade
body-data, inklusive BigQuerys byteuppdelade JSON-serialisering. Det gör inte en batch med
10000 rader och body-data säker. Uttömning av V8-heapen registrerar ett åtgärdbart fel: minska
batchstorleken eller höj `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; markören stannar vid
den senast bekräftade batchen. Historiska inline-/diskbaserade body-data omfattas inte av den
moderna artefaktgränsen. Operatörer måste budgetera RSS separat, särskilt i minnesbegränsade
containrar.

Den underordnade processen ärver endast upplösta `DATA_DIR`, `NODE_ENV`, uttryckliga `TZ`
(upplösning av lokal tid i äldre filnamn), `ELECTRON_RUN_AS_NODE` när den finns, samt följande
utgående inställningar: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (och deras
gemena varianter), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`,
`SSL_CERT_FILE`, `SSL_CERT_DIR`. En global Undici-dispatcher delar serverns rena upplösning
av miljöbaserad proxy och regler för att kringgå proxy för lokala värdar, inklusive `NO_PROXY`;
den importerar inte `proxyFetch.ts` eller dess DB-/funktionsflaggor. Proxyautentiseringsuppgifter
maskeras i vidarebefordrade utdata och registrerade fel. Destinationsautentiseringsuppgifter
skickas endast i ett enda startmeddelande via IPC, aldrig via argv eller miljön; vidarebefordran
av utdata/fel får prefix och saneras. Endast `ExperimentalWarning` inaktiveras i den
underordnade processens exekveringsargument för att undvika att Nodes SQLite-varning upprepas
vid varje cron-körning; andra varningstyper förblir synliga.

Destinationsmoduler måste kunna importeras utan beroenden till Next.js eller beroenden som endast är avsedda för servern. Den befintliga
BigQuery-implementeringen uppfyller redan det kontraktet. Cacheminnen för åtkomsttoken varar endast under den underordnade
körningen, inte mellan körningar. Node är den runtime som stöds (`package.json`-motorer), men README:s
installationsavsnitt för Bun och `Dockerfile.bun` marknadsför även en kompatibilitetsväg för produktion med
`bun:sqlite` (`src/lib/db/core.ts` / adaptrar). Under Bun behåller exporter därför den tidigare
processinterna vägen och avger en engångsvarning: isolering av heap och tidsgränser i en underordnad process är inte tillgänglig. Använd
Node för isolering av händelseloopen och OOM; Bun behandlas inte som enbart avsett för utveckling här.

När `includeBodies` är aktiverat bör du föredra ett intervall på minutnivå, exempelvis
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, i stället för att ackumulera en eftersläpning av nyttolaster under en hel timme.
Batch- och radgränser begränsar fortfarande varje körning. Processens startkostnad betalas per destination och körning;
detta byter en liten startkostnad mot isolering av serverns händelseloop, inte mot minskad total CPU-användning.

### Nyttolaster (promptar och slutföranden)

Som standard innehåller exporten endast de sammanfattningsfält som **listan** i Loggar visar. Om
**Exportera promptar och svar** (`includeBodies`) aktiveras skickas dessutom det som **detaljpanelen**
i Loggar visar för varje anrop:

| Fält                             | Vad det innehåller                                                |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Anropets nyttolaster så som de återges i kontrollpanelen          |
| `pipeline_route_decision`        | Vilket mål och vilken modell routern valde                        |
| `pipeline_client_request`        | Den råa begäran exakt så som klienten skickade den                |
| `pipeline_openai_request`        | Efter översättning till det interna OpenAI-formatet               |
| `pipeline_provider_request`      | Så som den faktiskt skickades uppströms, på leverantörens dialekt |
| `pipeline_provider_response`     | Det råa svaret uppströms                                          |
| `pipeline_client_response`       | Det som lämnades tillbaka till anroparen                          |
| `pipeline_error`                 | Felinformation på pipeline-nivå för ett misslyckat anrop          |
| `bodies_truncated`               | Sant när något av fälten ovan nådde `maxBodyBytes`                |

Detta är promptinnehåll, så det är **inaktiverat som standard** och avsiktligt ett val per destination.
Det som skickas är det som kontrollpanelen visar, eftersom exporten och `getCallLogById` delar
detaljupplösning: nyttolaster är
redan rensade från PII och hemligheter maskerade när de skrivs, och ett anrop som görs med en
`noLog`-API-nyckel lagrar ingen nyttolast alls, så det finns inget att exportera.

Nyttolaster läses per rad från artefakten i filsystemet, så hydrering körs endast för destinationer
som har begärt det. Om en artefakt saknas eller är korrupt exporteras dess sammanfattning med null-värden för nyttolasterna
i stället för att batchen misslyckas och markören blir strandad.

`maxBodyBytes` (standardvärde 262144) begränsar varje fält. Längre nyttolaster **trunkeras i stället för att
utelämnas** — en avklippt prompt besvarar fortfarande frågan ”vad efterfrågades” — och raden markeras med
`bodies_truncated`. Streamade deltan, segment för segment, exporteras inte; det sammanställda svaret finns
redan i `pipeline_provider_response` och `pipeline_client_response`.

---

## 2. Filer

| Del                                | Plats                                        |
| ---------------------------------- | -------------------------------------------- |
| Destinationskontrakt               | `src/lib/logExport/types.ts`                 |
| Register                           | `src/lib/logExport/registry.ts`              |
| Hemlighetshantering                | `src/lib/logExport/secrets.ts`               |
| Körningshanterare (överordnad IPC) | `src/lib/logExport/runner.ts`                |
| Processlivscykel                   | `src/lib/logExport/childRunner.ts`           |
| Underordnad startpunkt             | `src/lib/logExport/exportChild.ts`           |
| Skrivskyddad öppnare               | `src/lib/db/logExportReadOnly.ts`            |
| Delad fråga/mappning               | `src/lib/usage/callLogExportQueries.ts`      |
| Detaljmatchare                     | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projektion                     | `src/lib/logExport/presenter.ts`             |
| BigQuery-destination               | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-autentisering            | `src/lib/logExport/googleServiceAccount.ts`  |
| Samtalsloggskälla                  | `src/lib/usage/callLogExportSource.ts`       |
| Beständig lagring                  | `src/lib/db/logExportDestinations.ts`        |
| Cron-jobb                          | `src/lib/jobs/logExportJob.ts`               |
| REST-lager                         | `src/app/api/log-export/`                    |
| Kontrollpanelssida                 | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alla rutter är autentiserade för hantering (`requireManagementAuth`). Hemligheter returneras aldrig:
en lagrad hemlighet returneras som den litterala strängen `__stored__`, och om det värdet skickas tillbaka vid en uppdatering
behålls de lagrade autentiseringsuppgifterna.

Att skapa eller uppdatera en destination vars typ deklarerar en hemlighet **kräver
`STORAGE_ENCRYPTION_KEY`**. Utan den utför `encrypt()` en tyst direktvidarebefordran, så skrivningen
avvisas med 400 i stället för att autentiseringsuppgifter placeras i SQLite som klartext (samma skydd som
Telegram-webbhooken använder).

| Metod    | Sökväg                                   | Syfte                                                   |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinationstyper + deras lista över konfigurationsfält |
| `GET`    | `/api/log-export/destinations`           | Lista destinationer (hemligheter maskerade)             |
| `POST`   | `/api/log-export/destinations`           | Skapa en destination                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | Läs en destination                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | Uppdatera namn / aktiverad / konfiguration / batchning  |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ta bort                                                 |
| `POST`   | `/api/log-export/destinations/{id}/test` | Testa autentiseringsuppgifterna, skriv ingenting        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Töm nu, samma flöde som den schemalagda körningen       |
| `GET`    | `/api/log-export/status`                 | Cron-status, senaste körningar, kö per mål              |

`GET /api/log-export/types` är det som gör användargränssnittet generiskt: formuläret i instrumentpanelen renderas från
de returnerade fältbeskrivningarna, så en ny destination kräver ingen ändring av användargränssnittet.

---

## 4. BigQuery-destination

Konfigurationsnycklar (`type: "bigquery"`):

| Nyckel               | Anmärkningar                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| `projectId`          | GCP-projektet som innehåller datauppsättningen                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                |
| `location`           | Används endast när datauppsättningen måste skapas (standard `EU`)              |
| `serviceAccountJson` | Nyckel för tjänstekonto. Hemlig: krypterad vid lagring, returneras aldrig      |
| `autoCreate`         | Skapa datauppsättningen och tabellen vid den första exporten (standard `true`) |

Tjänstekontot behöver `bigquery.tables.updateData` för måltabellen, samt
`bigquery.datasets.create` / `bigquery.tables.create` när `autoCreate` är aktiverat.

En konfigurerad batch är en **markör**-enhet, inte en HTTP-enhet: `send()` delar upp den i insertAll-anrop
med högst 500 rader, så ett stort `batch_size` kan inte överskrida BigQuery-gränsen på 10 MB per begäran.
Tillfälliga statuskoder (408/429/500/502/503/504) återförsöks upp till tre gånger med exponentiell
fördröjning och återanvänder samma insertIds; autentiserings- och schemafel kastar ett fel vid det första försöket i stället
för att förbruka körningen.

En tabell som skapades för några ögonblick sedan är ännu inte synlig för strömningsslutpunkten, som svarar
med 404 i några sekunder. Denna 404 återförsöks, men **endast när den aktuella körningen skapade tabellen** —
en tabell som faktiskt saknas orsakar fortfarande ett omedelbart fel. Observera att om en tabell återskapas med ett namn som
nyligen har tagits bort, vägrar BigQuery strömmande infogningar i flera minuter; detta är en
egenskap hos borttagning följd av återskapande, så använd hellre ett nytt tabellnamn än att ta bort och lägga till samma namn igen.

**Ett partiellt fel returneras som HTTP 200 med en icke-tom `insertErrors[]`.** Detta behandlas som
ett fel och kastar ett undantag, vilket hindrar markören från att flyttas förbi rader som BigQuery aldrig
accepterade; `tests/unit/log-export-bigquery.test.ts` låser fast beteendet.

Transporten använder vanlig REST — ett självsignerat RS256-intyg byts mot en åtkomsttoken på
`https://oauth2.googleapis.com/token`, varefter rader skickas till `tabledata.insertAll`. Ingen Google SDK
inkluderas. Åtkomsttoken cachelagras i processen per (tjänstekonto, omfång).

Den skapade tabellen innehåller en kolumn per fält på fliken Loggar samt `exported_at`, och är utformad efter
hur anropsloggar faktiskt efterfrågas:

- **Dagspartitionerad på `timestamp`**, så att en fråga som avgränsas efter datum endast genomsöker dessa dagar.
- **Klustrad efter `api_key_name`, `provider`, `model`, `status`** (i den ordningen), så att filtrering efter
  vem som körde den, vart den skickades eller om den misslyckades utesluter block inom varje partition. BigQuery
  tillåter högst fyra klustringskolumner och ordningen spelar roll: ett filter enbart på `api_key_name`
  utesluter block, medan ett filter enbart på `status` inte gör det.
- **Valfri kvarhållningstid för partitioner** via `partitionExpirationDays` (0 behåller allt), som tillämpas
  när tabellen skapas.

Båda inställningarna tillämpas när tabellen skapas. En befintlig tabell behåller den layout den redan har, så
peka destinationen mot ett nytt tabell-id om du vill använda dem.

`tests/unit/log-export-bigquery.test.ts` säkerställer att mapparen och tabellschemat förblir
synkroniserade, så att en ny kolumn i anropsloggen inte obemärkt kan utelämnas vid exporten.

Batchar delas upp baserat på **både** antal rader och serialiserad storlek i byte. Enbart antalet rader räcker inte
när nyttolaster exporteras: 500 rader med prompter kan uppgå till tiotals megabyte, och insertAll
avvisar en begäran som överstiger 10 MB. Delbatchar avslutas vid 500 rader eller 9 MB, beroende på vilket som inträffar först.

---

## 5. Destination för OTLP/HTTP-spår

Konfigurationen använder `type: "otlp-http"`. Detta är en schemalagd, markörbaserad export av beständigt lagrade
anropsloggar, inte den live-mottagare för routningshändelser utan leveransgaranti som finns i
`open-sse/services/routing/otel.ts`. Den varken läser eller ändrar den mottagarens miljövariabler,
tidtagare eller buffertar. Om båda aktiveras kan två oberoende typer av spann skapas;
använd instrumenteringsomfånget `omniroute.log-export` för att särskilja dessa anropsloggspann.

| Nyckel                   | Standardvärde / syfte                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `endpoint`               | Obligatorisk fullständig HTTP(S)-URL för spår; inget `/v1/traces`-suffix läggs till |
| `headers`                | Valfria `Name: value`-rader eller JSON-objekt med strängar; krypteras               |
| `requestHeaderAllowlist` | Tom (av); klientheadernamn/prefix som ska fångas som spannattribut                  |
| `serviceName`            | `omniroute`; resursens `service.name`                                               |
| `langfuseMapping`        | `false`; lägger till Langfuse-attribut för generering/session/användare             |
| `identity`               | `pseudonymous`, `keyName` eller `none`                                              |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                             |
| `timeoutMs`              | `30000` per HTTP-försök                                                             |
| `environment`            | Ej angivet; valfritt `langfuse.environment`                                         |

Den generiska instrumentpanelen visar dessa fält. `paths` accepterar en API-array eller ett textområde
med exakta sökvägar separerade med radbrytningar/kommatecken. Embeddings, rerank och andra sökvägar
hoppas över om de inte uttryckligen tillåts. Överhoppade rader flyttar ändå fram markören; den befintliga
körarens räknare `exported`/`exportedTotal` räknar bearbetade källrader, inklusive filtrerade
rader, snarare än accepterade spann. Filtreringen sker i underprocessen utan att ändra dess
IPC-/markörkontrakt.

URL-valideringen använder den databasoberoende hjälpfunktionen `parseAndValidateNonMetadataUrl` från
`src/shared/network/outboundUrlGuard.ts`: policyn `block-metadata`. Den har samma
ovillkorliga kontroller av metadata/protokoll/inbäddade autentiseringsuppgifter som webhook-validatorn med
privata URL:er tillåtna, men tillåter avsiktligt localhost-/LAN-mål utan någon global
åsidosättning via funktionsflagga. Detta möjliggör självhostade Langfuse-, Phoenix-, Tempo- och Collector-
ändpunkter, inklusive privata HTTP-ändpunkter. Värdar för molnmetadata blockeras alltid.
Omdirigeringar följs inte, så en collector kan inte omdirigera autentiseringsuppgifter till en annan värd.
Liksom det befintliga lexikala URL-skyddet låser detta inte DNS-upplösningen; konfigurera endast
värdar som operatören kontrollerar. Föredra HTTPS när ändpunkten inte finns i ett betrott nätverk.

### Nyttolast och leverans

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) innehåller ett
CLIENT-spann per tillåten rad, namngivet efter dess exakta begärandesökväg. Sökvägsbaserad namngivning särskiljer
Chat Completions, Responses och Messages utan att bädda in modell- eller identitetsdata i
spannets namn. Resursattributen omfattar `service.name` och paketets `service.version`.

Den vanliga loggaren för chattförsök (`open-sse/handlers/chatCore/attemptLogging.ts`) skriver
`duration = Date.now() - startTime` vid slutförandet och anger ingen tidsstämpel;
`saveCallLogOperation` i `src/lib/usage/callLogs.ts` sätter som standard tidsstämpeln till skrivtiden
(slutförandetiden). Exporten sätter därför slut = radens tidsstämpel och start = slut − varaktighet
(millisekunder, konverterade till decimala nanosekunder). Historiska tidsstämplar som anroparen anger
bevaras också som sluttid; det finns ingen markör per rad som skiljer start från slutförande.
En null-varaktighet blir noll. Ogiltiga/saknade tidsstämplar gör att batchen misslyckas i stället för att skapa
icke-deterministiska spann. `ttftMs` kan vara null och mappas till `omniroute.ttft_ms`.

Attributen omfattar `gen_ai.operation.name="chat"`, leverantör, begärd modell/svarsmodell,
indata-/utdatatoken, valfria token för cacheläsning/cacheskapande/resonemang, HTTP-status,
combo, cachekälla, sessionstagg och korrelations-id. OTLP-heltalsvärden och tidsstämplar
är decimalsträngar; strängar, booleska värden och icke-heltal använder sina inbyggda OTLP-värdevarianter.
Felspann har statusen ERROR och ett sanerat statusmeddelande. Den kanoniska
posten saknar URL till uppströmsvärden, så `server.address` utelämnas i stället för att felaktigt
identifiera collectorn som modellservern. Kostnad exporteras inte.

Endast `includeBodies=true` läser in innehåll. Med `langfuseMapping=false`
innehåller `gen_ai.input.messages` / `gen_ai.output.messages` den sanerade begärande-/svarskroppen
som JSON lagrad av OmniRoute (kanoniserad när den går att parsa), inte en omformad semconv-
meddelandearray. Avklippta kroppar/kroppar som inte är JSON förblir råtext. Med `langfuseMapping=true`
skickas kropparna endast som `langfuse.observation.input` / `langfuse.observation.output`;
attributen `gen_ai.*.messages` utelämnas så att varje kropp skickas en gång. Båda lägena
ärver `maxBodyBytes` från den befintliga inläsningsrutinen;
`omniroute.bodies_truncated=true` markerar avklippning.
Den här destinationen lägger inte till några extra pipelineögonblicksbilder eller läsningar av osanerade artefakter;
valfri insamling av begärandeheaders använder den befintliga inlästa klientögonblicksbilden som beskrivs nedan.
Använd ett intervall på minutnivå, till exempel `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, vid export av
kroppar i stället för att samla på dig en timmes eftersläpning.

### Valfria headers från klientbegäran

Insamling av headers är **av som standard**. Ange `requestHeaderAllowlist` i destinationskonfigurationen
och aktivera **Exportera promptar och svar** (`includeBodies: true` på destinationen).
Tillåtelselistan accepterar en API-array eller ett textområde med namn separerade med radbrytningar/kommatecken:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Namn matchas exakt utan hänsyn till skiftläge, om inte en enda avslutande `*` väljer ett icke-tomt
prefix för ett headernamn. En ensam `*`, inbäddade jokertecken och ogiltiga HTTP-headernamn avvisas.
Det får finnas högst 64 selektorer, var och en med ett namn/prefix på högst 256 ASCII-byte.
Den här inställningen är separat från `headers`, som autentiserar exportören mot insamlaren.

Insamlingen läser endast `pipeline_client_request`, som fylls från den sparade detaljerade pipelinens
`clientRawRequest` (eller äldre `clientRequest`). Den faller aldrig tillbaka på leverantörens begärandeheaders.
Detaljerad pipelineloggning måste ha varit aktiverad när begäran registrerades. När
`includeBodies` är inaktiverat, eller om klientögonblicksbildens JSON saknas, är skadad eller har trunkerats, genereras inga
headerattribut. Ett högre värde för `maxBodyBytes` kan förhindra att ögonblicksbilder trunkeras vid export;
det kan inte återställa detaljer som aldrig sparades. En ögonblicksbild på över 1 MiB eller med fler än
256 headerposter ignoreras. Den befintliga exporten av promptar/svar förblir aktiverad parallellt med
headerinsamlingen; tillåtelselistan ger inget hydreringsläge för enbart headers.

Valda värden blir OTLP-strängarrayer med namnet `http.request.header.<full lowercase header name>`,
även för en enda sträng. Till exempel blir `X-OmniRoute-Meta-Team: example-team`
`http.request.header.x-omniroute-meta-team` med
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Hela prefixet bevaras: detta är vanliga headers, utan parsning av verksamhetsfält eller
konvertering till `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` ändrar inte headersemantiken.
En vald `User-Agent` med ett enda värde sätter även det skalära standardattributet
`user_agent.original`. Kommatecken inom ett värde delas inte upp. Varianter med olika skiftläge slås samman i den sparade
postordningen; om någon variant är ogiltig utelämnas hela headern. Attribut sorteras efter namnet med gemener.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-nyckelheaders, namn som innehåller
markörer för auth/token/secret/password/credential samt interna gatewayautentiseringsuppgifter
utesluts alltid, även om de har valts eller delvis maskerats i lagringen. Kända mönster för autentiseringsuppgifter återanvänder
den gemensamma detektorn för autentiseringsuppgifter; maskeringsmarkörer utelämnas och exporteras inte som säkra värden.
Endast strängar och icke-tomma strängarrayer accepteras; inga tal eller objekt typkonverteras.
Ogiltiga namn, prototypnycklar, kontrolltecken (utom horisontell tabulator) och felaktig Unicode
ignoreras utan att batchen misslyckas eller deras innehåll återges i felmeddelanden.

Varje spann samlar in högst 32 headers, 16 värden per header, 4096 UTF-8-byte per värde
och totalt 16384 UTF-8-byte för insamlade headernamn och värden. För stora eller ogiltiga headers
utelämnas helt och trunkeras inte. Urvalet är ett integritetsbeslut som operatören fattar: till synes säkra namn
kan fortfarande innehålla personuppgifter, och dessa gränser/detektorer är ingen generell sanerare av personuppgifter.

### Leveransgränser

Begäranden begränsas till 500 spann och 4 MiB UTF-8-JSON, inklusive omslutningen.
Storleken på varje tillåtet spann kontrolleras före den första begäran i en markörbatch. Om ett enskilt
spann överskrider gränsen skickas ingen del av batchen, och exporten misslyckas med en uppmaning att sänka
`maxBodyBytes`; spannet släpps inte tyst. Förkontrollen behåller endast postreferenser och
byteantal och kasserar varje tillfälligt spann/JSON; spann återskapas för storleksbegränsade delar
i stället för att en andra serialiserad kopia av batchen hålls i minnet. HTTP 408/429/5xx, nätverksfel och tidsgränsöverskridanden får högst
tre försök, med exponentiell väntetid på 250/500 ms. `Retry-After` i sekunder eller som HTTP-datum
kan förlänga väntetiden upp till 5 sekunder. Andra statuskoder leder till omedelbart misslyckande. Partiell avvisning i OTLP 2xx utlöser också ett undantag i stället för
att kvittera ett förlorat spann; tomma kvittenser eller kvittenser med giltig JSON accepteras, med en
läsgräns på 64 KiB för svaret.

Fel innehåller endast exportörens egna uppgifter: HTTP-status, återförsöksklass, antal försök och antal skickade
spann, eller fasta formuleringar för kvittens-/nätverksfel. Insamlarens svarskroppar,
antal för partiell framgång och svarsheaders kopieras aldrig till fel, loggar eller
instrumentpanelen. En misslyckad eller delvis accepterad batch kvitteras inte: destinationen visar
Misslyckas med den statusen, markören stannar vid den senast kvitterade batchen och nästa körning
skickar samma rader igen. Permanenta statuskoder fortsätter att orsaka misslyckanden tills insamlaren eller konfigurationen
har åtgärdats. Använd insamlarens egna loggar för svarsdetaljer. Felsammanfattningar i anropsloggen behåller
sin separata maskering.
`prepare()` tillhandahåller inga resurser; Test skickar exakt `{"resourceSpans":[]}` och rapporterar
HTTP-status utan att skriva spann till anropsloggen.

Spår-id:n och spann-id:n är de första 32/16 hexadecimala siffrorna i SHA-256 av
`"omniroute.trace\0" + callLogId` respektive `"omniroute.span\0" + callLogId`. Omsändningar har
identiska id:n. Detta är ingen garanti för deduplicering: vissa backend-system, inklusive Langfuse
v4-inmatning, deduplicerar inte spann med samma id. En krasch eller ett fel i en del av en batch kan
leda till att högst den enda okvitterade markörbatchen skickas igen; hela den batchen kan dupliceras,
inte bara dess sista HTTP-del. Välj storleken på markörbatchen med den avvägningen i åtanke.

### Langfuse-exempel

Konfigurera dessa fält för en egenhostad Langfuse-instans:

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

Skapa Authorization-värdet lokalt som Base64 av den bokstavliga strängen `public-key:secret-key`
(till exempel med `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Klistra inte in riktiga autentiseringsuppgifter i loggar, skärmbilder eller ärenden. Mappningen anger automatiskt
`x-langfuse-ingestion-version: 4`; Authorization anges fortfarande i `headers`.
Både headers och det genererade identitetssaltet använder den befintliga mekanismen för krypterade hemliga fält
och API-platshållare; `STORAGE_ENCRYPTION_KEY` krävs.

Mappningen lägger till genereringstyp/modell, användningsdetaljer i JSON (indata/utdata/totalt och tillgängliga
cachenycklar), ögonblicksbilder av indata/utdata i JSON, nivån ERROR/DEFAULT, sanerat statusmeddelande,
spårnamn, sessions-id, valfri miljö och filtrerbara
`langfuse.observation.metadata.<key>` för leverantör, begärd modell, sökväg, kombination, cachekälla
och status. `langfuse.observation.completion_start_time` anges i ISO 8601 som
start + TTFT endast när TTFT är känt och ryms inom varaktigheten. Inga kostnadsattribut skickas.

Identitetslägen gäller för `langfuse.user.id`:

- `pseudonymous` (standard): HMAC-SHA256 av API-nyckelns interna id med ett slumpmässigt
  salt på 32 byte per destination. Saltet genereras vid skapandet om det saknas, krypteras
  som `identitySalt`, returneras aldrig och behålls vid redigeringar. Nyckel-id:n i klartext
  läggs aldrig i span-attribut. Om en destinations salt återskapas eller roteras ändras identiteterna.
- `keyName`: det konfigurerade API-nyckelnamnet, vilket avsiktligt exponerar den operatörsangivna etiketten.
- `none`: inget användar-id. Sessionstaggar exporteras fortfarande när de finns; dessa lägen
  anonymiserar inte godtyckligt promptinnehåll eller operatörsangivna sessions-/korrelationsetiketter.

### Starta utan historisk återfyllning

Endast vid skapandet kan du aktivera **Starta från aktuell position (hoppa över befintliga loggar)** eller ange
`startFromCurrentPosition: true` på den översta nivån i nyttolasten för API-anropet som skapar destinationen. Detta initierar
`cursor_row_id` till det högsta aktuella rowid-värdet bland bevarade anropsloggar med hjälp av de befintliga
markörhjälpfunktionerna, utan migrering. Standardvärdet är false (markör 0 och återfyllning av bevarad historik).
Det är inte en inställning för att återställa markören vid uppdatering.

Det gemensamma tillägget `ttftMs` lägger även till en nullbar kolumn, `ttft_ms`, i BigQuery-mapparen
och schemat för nya tabeller: dess schematest kräver att varje fält i den kanoniska posten har en
kolumn. Befintliga tabeller fortsätter att exporteras utan ändringar: `prepare()` läser tabellschemat och
utelämnar endast `ttft_ms` när den kolumnen saknas. Lägg till den nullbara INT64-kolumnen för att få TTFT
vid nästa körning, eller använd en ny tabell. Ingen PATCH, automatisk schemaändring eller ytterligare
behörighet krävs; alla andra radfält behåller strikt schemakontroll.

---

## 6. Lägga till en destination

1. Skapa `src/lib/logExport/destinations/<name>.ts` som exporterar en `LogExportDestinationType`:
   ett Zod-`configSchema`, en `fields`-beskrivningsarray för användargränssnittet, `secretFields` och en
   `createClient(config)` som returnerar `test()` / `prepare()` / `send(records)`.
2. Lägg till den i arrayen `DESTINATIONS` i `src/lib/logExport/registry.ts`.
3. Skriv tester under `tests/unit/`.

Det är hela ändringen: persistens, cron-jobbet, REST-lagret, kryptering av hemligheter och
instrumentpanelens formulär läser alla från registret.

Två regler för en ny destination:

- `send()` **måste utlösa ett undantag** vid ett partiellt fel. Att anropet slutförs innebär att ”destinationen har dessa rader”,
  och markören flyttas permanent förbi dem.
- En destination som tar emot en URL som tillhandahålls av användaren måste validera den via
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) före hämtning,
  på samma sätt som webhooks gör. BigQuery behöver inte detta: dess värdar är konstanta.

---

## 7. Drift

- **Instrumentpanel**: Integrationer → Loggexport. Lägg till en destination, kör **Testa** för att kontrollera autentiseringsuppgifterna
  utan att skriva rader och aktivera den sedan.
- **Eftersläpning**: varje destinationskort visar väntande rader och markören; `GET
/api/log-export/status` returnerar samma siffror plus de senaste 20 jobbkörningarna.
- **En destination som misslyckas gör inte att de andra misslyckas** – körningssammanfattningen registrerar status per destination
  i `last_status` / `last_error`, och jobbkörningshistoriken sparar aggregatet.
- **När en destination tas bort raderas även dess markör.** Om den läggs till igen börjar den från den äldsta sparade
  anropsloggen, vilket skickar om rader som destinationen kanske redan innehåller. I BigQuery absorberar
  `insertId` per rad endast detta inom BigQuerys eget dedupliceringsfönster, så inaktivera
  helst en destination i stället för att ta bort den.
