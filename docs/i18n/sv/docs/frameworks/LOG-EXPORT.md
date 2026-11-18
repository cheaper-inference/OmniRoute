# Log export (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, inkrementell export av OmniRoute-anropsloggar till ett externt analysdatalager.

Fliken Loggar i kontrollpanelen lagrar förfrågningshistorik i SQLite (`call_logs`), som begränsas av
rotation och lagringstid. Loggexport skickar samma uppsättning poster enligt ett schema så att de kan bevaras längre än
den lokala databasen och samköras med andra data. BigQuery är den första destinationen;
pipelinen är registerbaserad, så fler destinationer kan läggas till.

---

## 1. Så fungerar det

```
server (dekryptera + validera konfiguration, stäm av markör)
  → starta IPC → isolerad exportChild-OS-process
    → skrivskyddad storage.sqlite → delad fråga/mappning för anropsloggar
      → asynkron inläsning av artefaktinnehåll → destinationens prepare()/send()
        → batch-IPC → servern sparar markören → ack-IPC
          → nästa batch; done-IPC → servern registrerar att körningen lyckades
```

- **Schema** — ett `JobRegistry`-cronjobb, `log_export`, med standardvärdet `0 * * * *` (varje timme,
  UTC). Registreras i `src/lib/initCloudSync.ts`; kan åsidosättas med `OMNIROUTE_LOG_EXPORT_CRON`.
  Vid varje schematillfälle bearbetas alla **aktiverade** destinationer, i tur och ordning.
- **Markör** — SQLites implicita `call_logs.rowid`, som sparas per destination i
  `log_export_destinations.cursor_row_id`. `timestamp` används avsiktligt inte som markör: anropare
  kan ange ett eget värde, så en långsam förfrågan kan skrivas efter en snabbare som startade
  senare, och en tidsstämpelbaserad markör skulle hoppa över den.
- **Batchindelning** — `batch_size` rader per förfrågan (standardvärde 500), `max_rows_per_run` rader per körning
  (standardvärde 10000), så att en stor kö bearbetas över flera schematillfällen i stället för att blockera ett enda.
- **Leverans** — markören flyttas fram först när `send()` har slutförts utan fel. En misslyckad batch lämnar
  markören där den var, så samma rader skickas på nytt vid nästa körning. Garantin är
  minst en gång plus deduplicering på destinationssidan, inte strikt exakt en gång: BigQuery använder
  anropsloggens id som nyckel för varje rad och tar hänsyn till detta efter bästa förmåga inom sitt eget dedupliceringsfönster.
- **Överlappningsskydd** — cronjobbet och `POST .../run` kan utlösas samtidigt. En destination
  som redan bearbetas hoppas över i stället för att bearbetas två gånger (`skipped: true` i körningsresultatet),
  så en samtidig körning kan inte skicka om en batch eller flytta markören bakåt.
- **Återhämtning efter rensning** — om `cursor_row_id` hamnar över `MAX(rowid)` (hela tabellen har
  rensats och rad-id:na har börjat om), återställer köraren markören till 0 i stället för att permanent missa nya poster.

### Isolerad körare och gränser

Varje destinationskörning på Node startar en separat, kortlivad underprocess i operativsystemet (`child_process`
med IPC, inte `worker_threads`). Läsning av meddelandekroppar, JSON-tolkning/serialisering av nyttolast, destinationens
`prepare()` och destinationens nätverks-I/O körs där, inte i serverns händelseloop.
Endast konfiguration och små förloppsmeddelanden passerar via IPC; exporterade poster återvänder aldrig till
servern. Cronjobbet och routen för Kör nu behåller samma publika resultat och överlappningsskydd.

Underprocessen öppnar serverns upplösta `DATA_DIR/storage.sqlite` skrivskyddat med `node:sqlite`,
med `busy_timeout=5000` och `query_only=ON`. Den importerar ingen DB-singleton och utför inga
migreringar, säkerhetskopieringar eller SQLite-uppdateringar. Hantering av saknad/skadad artefaktmetadata (inklusive
UPDATE för skadade artefakter) finns fortfarande endast i kontrollpanelens detaljflöde. Båda flödena delar en ren
detaljresolver; exporten använder asynkrona filsystemsläsningar och samma prioritetsordning: artefakt → äldre
inline-lagring → äldre disklagring → ingen. En körning tar en ögonblicksbild av det högsta infogade rad-id:t
när underprocessen öppnar sin läsare; senare infogningar får vänta till nästa körning. Detta är en gräns för infogningar,
inte en långvarig SQLite-transaktion: WAL-skrivare och kontrollpunkter kan fortsätta arbeta under
nätverksväntetider. Uppdateringar/borttagningar av befintliga rader fryses inte av denna gräns.

Efter varje accepterad batch väntar underprocessen på en bekräftelse. Servern sparar först
markören med `advanceLogExportCursor` och skickar sedan `ack`; ingen nästa batch startar dessförinnan.
Ett sändningsfel, en krasch eller en tidsgränsöverskridning registreras som ett fel utan att markören flyttas fram för den batchen. Tidigare
bekräftade batcher förblir sparade; högst den enda obekräftade batchen kan skickas om.
En lyckad körning registreras först efter `done` och en normal avslutning av underprocessen. Vid fel avslutas underprocessen
med SIGTERM, som eskaleras till SIGKILL efter 500 ms, och köraren väntar tills processen har stängts.

| Miljövariabel                                 | Standardvärde | Syfte                                       |
| --------------------------------------------- | ------------- | ------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000        | Tidsgräns i faktisk tid per destination     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024          | Gräns för underprocessens V8 old-space i MB |

Ogiltiga värden, icke-positiva värden och värden som inte är heltal ersätts med standardvärdena. Heapinställningen är inte en gräns för total
RSS; mycket stora batcher kan fortfarande förbruka underprocessens minne och få körningen att misslyckas på ett säkert sätt.
Standardvärdet 1024 MB ger marginal för standardbatchen på 500 rader med artefakter på 512 KiB och
aktiverade meddelandekroppar, inklusive BigQuerys byteuppdelade JSON-serialisering. Det gör inte en
batch med 10000 rader med meddelandekroppar säker. Om V8-heapen tar slut registreras ett fel med en konkret åtgärd: minska batchstorleken
eller höj `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; markören stannar vid den senast
bekräftade batchen. Historiska meddelandekroppar som lagras inline/på disk omfattas inte av den moderna artefaktgränsen.
Driftansvariga måste budgetera RSS separat, särskilt i containrar med begränsat minne.

Barnprocessen ärver endast det upplösta `DATA_DIR`, `NODE_ENV`, explicit angivet `TZ` (äldre filnamnsbaserad
upplösning av lokal tid), `ELECTRON_RUN_AS_NODE` när det finns, samt följande indata för utgående trafik:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (och deras former med gemener),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
En global Undici-dispatcher delar serverns proxyupplösning som enbart baseras på miljövariabler och regler för att
kringgå proxyn för lokala värdar, inklusive `NO_PROXY`; den importerar inte `proxyFetch.ts` eller dess databas-/funktionsflaggor.
Proxyautentiseringsuppgifter maskeras i vidarebefordrad utdata och registrerade fel. Destinationens autentiseringsuppgifter
överförs endast i ett IPC-startmeddelande, aldrig via argv eller miljövariabler; vidarebefordrad utdata och fel
förses med prefix och saneras. Endast `ExperimentalWarning` inaktiveras i barnprocessens körningsargument för att undvika
att Nodes SQLite-varning upprepas vid varje cron-körning; andra varningstyper förblir synliga.

Destinationsmoduler måste kunna importeras utan beroenden på Next.js eller server-only. Den befintliga
BigQuery-implementeringen uppfyller redan det kontraktet. Cachelagrade åtkomsttoken finns endast under barnprocessens
körning, inte mellan körningar. Node är den runtime som stöds (`package.json` engines), men README:s avsnitt om
installation med Bun och `Dockerfile.bun` beskriver också en kompatibilitetsväg för produktion med
`bun:sqlite` (`src/lib/db/core.ts` / adaptrar). Under Bun behåller exporter därför den tidigare
körningen inom samma process och visar en engångsvarning: isolering av barnprocessens heap och timeout är inte tillgänglig. Använd
Node för isolering av händelseloopen och skydd mot minnesbrist (OOM); Bun betraktas inte som enbart avsett för utveckling här.

När `includeBodies` är aktiverat bör du föredra ett intervall på minutnivå, till exempel
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, framför att samla på dig en timmes nyttolaster.
Batch- och radgränser begränsar fortfarande varje körning. Kostnaden för processstart tillkommer per destination och körning;
detta byter en liten startkostnad mot isolering av serverns händelseloop, inte minskad total CPU-användning.

### Nyttolaster (promptar och genererade svar)

Som standard innehåller exporten endast de sammanfattningsfält som visas i loggarnas **lista**. Om du aktiverar
**Exportera promptar och svar** (`includeBodies`) skickas även det som loggarnas **detaljpanel**
visar för varje anrop:

| Fält                             | Innehåll                                                        |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | Anropets nyttolaster så som de visas i instrumentpanelen        |
| `pipeline_route_decision`        | Vilket mål och vilken modell routern valde                      |
| `pipeline_client_request`        | Den råa begäran exakt som klienten skickade den                 |
| `pipeline_openai_request`        | Efter översättning till det interna OpenAI-formatet             |
| `pipeline_provider_request`      | Så som den faktiskt skickades uppströms, i leverantörens format |
| `pipeline_provider_response`     | Det råa svaret från uppströmsleverantören                       |
| `pipeline_client_response`       | Det som returnerades till anroparen                             |
| `pipeline_error`                 | Felinformation på pipelinenivå för ett misslyckat anrop         |
| `bodies_truncated`               | Sant när något fält ovan nådde `maxBodyBytes`                   |

Detta är promptinnehåll, så det är **inaktiverat som standard** och är avsiktligt ett val per destination.
Det som skickas är det som instrumentpanelen visar, eftersom exporten och `getCallLogById` delar samma
detaljupplösning: nyttolasterna har
redan sanerats från personuppgifter och fått hemligheter maskerade när de skrivs, och ett anrop med en
`noLog`-API-nyckel lagrar ingen nyttolast alls, så det finns inget att exportera.

Nyttolaster läses per rad från filsystemsartefakten, så hydrering körs endast för destinationer
som har begärt det. Om en artefakt saknas eller är skadad exporteras sammanfattningen med null-värden för nyttolasterna i stället
för att batchen misslyckas och markören fastnar.

`maxBodyBytes` (standardvärde 262144) begränsar varje fält. Längre nyttolaster **trunkeras i stället för att
utelämnas** — en avklippt prompt besvarar fortfarande frågan ”vad efterfrågades” — och raden markeras med
`bodies_truncated`. Strömmade deltauppdateringar, bit för bit, exporteras inte; det sammansatta svaret finns
redan i `pipeline_provider_response` och `pipeline_client_response`.

---

## 2. Filer

| Del                                  | Plats                                        |
| ------------------------------------ | -------------------------------------------- |
| Destinationskontrakt                 | `src/lib/logExport/types.ts`                 |
| Register                             | `src/lib/logExport/registry.ts`              |
| Hemlighetshantering                  | `src/lib/logExport/secrets.ts`               |
| Körare (överordnad IPC)              | `src/lib/logExport/runner.ts`                |
| Processlivscykel                     | `src/lib/logExport/childRunner.ts`           |
| Startpunkt för underprocess          | `src/lib/logExport/exportChild.ts`           |
| Öppnare för skrivskyddad åtkomst     | `src/lib/db/logExportReadOnly.ts`            |
| Delad fråga/mappning                 | `src/lib/usage/callLogExportQueries.ts`      |
| Detaljresolver                       | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projektion                       | `src/lib/logExport/presenter.ts`             |
| BigQuery-destination                 | `src/lib/logExport/destinations/bigquery.ts` |
| Autentisering med Google-tjänstkonto | `src/lib/logExport/googleServiceAccount.ts`  |
| Källa för anropsloggar               | `src/lib/usage/callLogExportSource.ts`       |
| Persistens                           | `src/lib/db/logExportDestinations.ts`        |
| Cron-jobb                            | `src/lib/jobs/logExportJob.ts`               |
| REST-lager                           | `src/app/api/log-export/`                    |
| Kontrollpanelssida                   | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alla rutter kräver hanteringsautentisering (`requireManagementAuth`). Hemligheter returneras aldrig:
en lagrad hemlighet returneras som det bokstavliga värdet `__stored__`, och om det värdet skickas tillbaka vid en uppdatering
behålls den lagrade autentiseringsuppgiften.

Att skapa eller uppdatera en destination vars typ deklarerar en hemlighet **kräver
`STORAGE_ENCRYPTION_KEY`**. Utan den släpper `encrypt()` tyst igenom värdet oförändrat, så skrivningen
nekas med 400 i stället för att lagra en autentiseringsuppgift i klartext i SQLite (samma skydd som
Telegrams webhook använder).

| Metod    | Sökväg                                   | Syfte                                                        |
| -------- | ---------------------------------------- | ------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Destinationstyper + deras lista över konfigurationsfält      |
| `GET`    | `/api/log-export/destinations`           | Lista destinationer (hemligheter maskerade)                  |
| `POST`   | `/api/log-export/destinations`           | Skapa en destination                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Läs en destination                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Uppdatera namn / aktivering / konfiguration / batchhantering |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ta bort                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Kontrollera autentiseringsuppgifter utan att skriva något    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Töm kön nu, via samma flöde som den schemalagda körningen    |
| `GET`    | `/api/log-export/status`                 | Cron-status, senaste körningar, kö per mål                   |

`GET /api/log-export/types` är det som gör användargränssnittet generiskt: formuläret i kontrollpanelen renderas utifrån
de returnerade fältbeskrivningarna, så en ny destination kräver ingen ändring i användargränssnittet.

---

## 4. BigQuery-destination

Konfigurationsnycklar (`type: "bigquery"`):

| Key                  | Notes                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-projektet som innehåller datasetet                                                                              |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                     |
| `location`           | Används endast när datasetet måste skapas (standardvärde `EU`)                                                      |
| `serviceAccountJson` | Nyckel för tjänstekonto. Hemlighet: krypteras i vila och returneras aldrig                                          |
| `autoCreate`         | Skapa saknade dataset/tabeller; lägg villkorligt till nullbara kolumner för användningsbevis (standardvärde `true`) |

Tjänstekontot behöver `bigquery.tables.updateData` på måltabellen, samt
`bigquery.datasets.create` / `bigquery.tables.create` när `autoCreate` är aktiverat.
Uppdatering av en befintlig tabell för att lägga till de två nullbara fälten för användningsbevis
kräver även `bigquery.tables.update`. En saknad behörighet gör att exporten misslyckas utan att
dess cursor flyttas framåt.

En konfigurerad batch är en **cursor**-enhet, inte en HTTP-enhet: `send()` delar upp den i
insertAll-anrop med högst 500 rader, så ett stort `batch_size` kan inte överskrida BigQuerys
gräns på 10 MB per begäran. Tillfälliga statusar (408/429/500/502/503/504) försöks igen upp till
tre gånger med exponentiell backoff, med samma insertIds; autentiserings- och schemafel kastas vid
första försöket i stället för att förbruka körningen.

En tabell som skapades för bara några ögonblick sedan är ännu inte synlig för streaming-endpointen,
som svarar med 404 i några sekunder. Denna 404 försöks igen, men **endast när den här körningen
skapade tabellen** — en tabell som faktiskt saknas leder fortfarande till ett omedelbart fel. Observera
att om en tabell återskapas under ett namn som nyligen har tagits bort vägrar BigQuery streaminginsättningar
i flera minuter; det är en egenskap hos borttagning följd av återskapande, så föredra ett nytt tabellnamn
framför att ta bort och lägga till en tabell igen.

**Ett partiellt fel kommer som HTTP 200 med en icke-tom `insertErrors[]`.** Det behandlas som ett
fel och kastas, vilket stoppar cursorn från att gå förbi rader som BigQuery aldrig accepterade;
`tests/unit/log-export-bigquery.test.ts` låser fast detta beteende.

Transporten är vanlig REST — en självsignerad RS256-assertion byts mot en åtkomsttoken på
`https://oauth2.googleapis.com/token`, varefter rader skickas till `tabledata.insertAll`. Ingen Google-SDK
hämtas in. Åtkomsttokens cachas i processen per (tjänstekonto, scope).

Den skapade tabellen innehåller en kolumn per fält på fliken Loggar samt `exported_at`, och är
utformad för hur anropsloggar faktiskt efterfrågas:

- **Dagspartitionerad på `timestamp`**, så en fråga som begränsas av datum endast genomsöker dessa dagar.
- **Klustrad efter `api_key_name`, `provider`, `model`, `status`** (i den ordningen), så filtrering efter
  vem som körde den, vart den skickades eller om den misslyckades beskär block inom varje partition. BigQuery
  tillåter högst fyra klustringskolumner och ordningen spelar roll: ett filter på enbart `api_key_name`
  beskär, medan ett filter på enbart `status` inte gör det.
- **Valfri partitionslagringstid** via `partitionExpirationDays` (0 behåller allt), tillämpas
  när tabellen skapas.

Båda inställningarna tillämpas när tabellen skapas. En befintlig tabell behåller den layout den redan
har, så rikta destinationen mot ett nytt tabell-id om du vill börja använda dem.

`tests/unit/log-export-bigquery.test.ts` säkerställer att mappningen och tabellschemat förblir
synkroniserade, så att en ny anropsloggkolumn inte kan tappas bort i tysthet på vägen ut.

Batchar delas upp efter **både** antal rader och serialiserade byte. Endast antal rader räcker inte
när nyttolaster exporteras: 500 rader som innehåller promptar kan vara tiotals megabyte, och insertAll
avvisar en begäran över 10 MB. Delar avslutas vid 500 rader eller 9 MB, beroende på vilket som inträffar först.

---

## 5. OTLP/HTTP-destination

Konfigurationen använder `type: "otlp-http"`. Detta är en schemalagd, cursor-baserad export av
persistenta samtalsloggar, inte den best-effort-sink för live-routinghändelser som finns i
`open-sse/services/routing/otel.ts`. Den läser inte eller ändrar den sinkens miljövariabler,
tidsinställningar eller buffertar. Om båda aktiveras kan två oberoende typer av spans skapas;
använd instrumenteringsomfånget `omniroute.log-export` för att skilja dessa samtalslogg-spans åt.

| Nyckel                   | Standardvärde / syfte                                                             |
| ------------------------ | --------------------------------------------------------------------------------- |
| `endpoint`               | Fullständig HTTP(S)-adress för traces krävs; inget `/v1/traces`-suffix läggs till |
| `headers`                | Valfria `Name: value`-rader eller JSON-objekt med strängar; krypteras             |
| `requestHeaderAllowlist` | Tom (av); klienthuvudnamn/-prefix som ska fångas som span-attribut                |
| `serviceName`            | `omniroute`; resursen `service.name`                                              |
| `langfuseMapping`        | `false`; lägger till Langfuse-attribut för generation/session/användare           |
| `identity`               | `pseudonymous`, `keyName` eller `none`                                            |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                           |
| `timeoutMs`              | `30000` per HTTP-försök                                                           |
| `environment`            | Ej angivet; valfritt `langfuse.environment`                                       |

Den generiska dashboarden återger dessa fält. `paths` accepterar en API-array eller ett textområde
med exakta sökvägar separerade med radbrytningar/kommatecken. Embeddings, rerank och andra sökvägar
övergås om de inte uttryckligen tillåts. Överhoppade rader avancerar fortfarande cursorn; den
befintliga runnerns räknare `exported`/`exportedTotal` räknar bearbetade källrader, inklusive
filtrerade rader, snarare än accepterade spans. Filtreringen görs i child-processen utan att dess
IPC-/cursor-kontrakt ändras.

URL-valideringen använder den DB-fria hjälpfunktionen `parseAndValidateNonMetadataUrl` från
`src/shared/network/outboundUrlGuard.ts`: policyn `block-metadata`. Den har samma ovillkorliga
kontroller av metadata/protokoll/inbäddade autentiseringsuppgifter som webhook-valideraren, med
privata URL:er tillåtna, men tillåter avsiktligt localhost-/LAN-mål utan en global åsidosättning
av feature-flaggan. Detta möjliggör self-hostade Langfuse-, Phoenix-, Tempo- och Collector-endpoints,
inklusive privata HTTP-endpoints. Molnmetadata-värdar blockeras alltid. Omdirigeringar följs inte,
så en collector kan inte omdirigera autentiseringsuppgifter till en annan värd. Precis som den
befintliga lexikala URL-vakten låser detta inte DNS-upplösningen; konfigurera endast operatörskontrollerade
värdar. Föredra HTTPS när endpointen inte finns i ett betrott nätverk.

### Nyttolast och leverans

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) innehåller en
CLIENT-span per tillåten rad, namngiven efter dess exakta request-sökväg. Sökvägsnamngivningen
skiljer Chat Completions, Responses och Messages åt utan att modell- eller identitetsdata bäddas
in i span-namnet. Resursattributen innehåller `service.name` och paketets `service.version`.

Den normala loggaren för chattförsök (`open-sse/handlers/chatCore/attemptLogging.ts`) skriver
`duration = Date.now() - startTime` när körningen slutförs och tillhandahåller ingen tidsstämpel;
`saveCallLogOperation` i `src/lib/usage/callLogs.ts` använder som standard skrivtidpunkten
(slutförandetiden) som tidsstämpel. Exporten anger därför end = radens tidsstämpel och start = end − duration
(millisekunder, konverterade till decimala nanosekunder). Historiska tidsstämplar som tillhandahålls
av anroparen bevaras också som sluttid; det finns ingen diskriminator per rad för start/slutförande.
En null-duration blir noll. Ogiltiga eller saknade tidsstämplar gör att batchen misslyckas i stället
för att skapa icke-deterministiska spans. `ttftMs` är nullable och mappas till `omniroute.ttft_ms`.

Attributen omfattar `gen_ai.operation.name="chat"`, leverantör, begärd/svarsmodell,
in-/utdatatoken, valfria cache-läsnings-/cache-skapande-/resonemangstoken, HTTP-status,
kombination, cachekälla, sessionstagg och korrelations-ID. Heltalsvärden och tidsstämplar i OTLP
är decimala strängar; strängar, booleska värden och bråktal använder sina inbyggda OTLP-värdevarianter.
Felspans har statusen ERROR och ett sanerat statusmeddelande. Den kanoniska posten har ingen URL
till upstream-värden, så `server.address` utelämnas i stället för att felaktigt identifiera
collectorn som modellservern. Kostnad exporteras inte.

Endast `includeBodies=true` läser in innehåll. Med `langfuseMapping=false` innehåller
`gen_ai.input.messages` / `gen_ai.output.messages` den sanerade JSON-koden för request/response-kroppen
så som den lagras av OmniRoute (kanoniserad när den kan parsas), inte en omformad semconv-meddelandearray.
Avkortade/icke-JSON-kroppar förblir råtext. Med `langfuseMapping=true` avges kroppar endast som
`langfuse.observation.input` / `langfuse.observation.output`; attributen
`gen_ai.*.messages` utelämnas så att varje kropp skickas en gång. Båda lägena ärver
`maxBodyBytes` från den befintliga inläsningsvägen;
`omniroute.bodies_truncated=true` markerar avkortning.
Inga extra pipeline-snapshots eller osanerade artefaktläsningar läggs till av denna destination;
valfri fångst av request-huvuden använder den befintliga inlästa klientögonblicksbilden som beskrivs nedan.
Använd en minutbaserad frekvens, till exempel `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, när kroppar
exporteras, i stället för att samla på hög ett timbaserat backlog.

### Valfria request-huvuden från klienten

Fångst av headers är **avstängd som standard**. Ange `requestHeaderAllowlist` i destinationskonfigurationen
och aktivera **Export prompts and responses** (`includeBodies: true` på destinationen).
Allowlisten accepterar en API-array eller ett textområde med namn separerade med radbrytningar/kommatecken:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Namn matchas skiftlägesokänsligt och exakt, såvida inte en enda avslutande `*` väljer ett icke-tomt
prefix för headernamn. Ett ensamt `*`, inbäddade jokertecken och ogiltiga HTTP-headernamn avvisas.
Det finns högst 64 selektorer, där varje namn/prefix består av högst 256 ASCII-byte.
Den här inställningen är separat från `headers`, som autentiserar exportören mot samlaren.

Capture läser endast `pipeline_client_request`, som fylls i från den sparade detaljerade pipelinen's
`clientRawRequest` (eller äldre `clientRequest`). Den faller aldrig tillbaka på providerns request-headers.
Detaljerad pipelinelogging måste ha varit aktiverad när requesten registrerades. När
`includeBodies` är inaktiverat, eller när JSON för klientögonblicksbilden saknas, är skadad eller
avklippt, genereras inga headerattribut. Om `maxBodyBytes` ökas kan det förhindra att ögonblicksbilden
klipps vid export; det kan inte återställa detaljer som aldrig sparades. En ögonblicksbild som överstiger
1 MiB eller innehåller fler än 256 headerposter ignoreras. Den befintliga exporten av prompt/svar förblir
aktiverad parallellt med headerinsamlingen; allowlisten tillhandahåller inte ett hydratiseringsläge som
endast gäller headers.

Valda värden blir OTLP-strängarrayer med namnet `http.request.header.<full lowercase header name>`,
även för en enda sträng. Exempelvis blir `X-OmniRoute-Meta-Team: example-team`
`http.request.header.x-omniroute-meta-team` med
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Hela prefixet bevaras: detta är vanliga headers, utan tolkning av affärsfält eller konvertering till
`omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` ändrar inte headersemantiken. En vald
`User-Agent` med ett enda värde sätter även standardfältet `user_agent.original`. Kommatecken i ett
enskilt värde delas inte upp. Skiftlägesvarianter slås ihop i den ordning de sparats; om någon variant
är ogiltig utelämnas hela headern. Attributen ordnas efter namn i gemener.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-nyckelheaders, namn som innehåller
markörer för auth/token/secret/password/credential samt interna gateway-uppgifter utesluts alltid,
även om de har valts eller delvis maskerats i lagringen. Kända uppgiftsmönster använder den gemensamma
uppgiftsdetektorn; redigeringsmarkörer utelämnas och exporteras inte som säkra värden.
Endast strängar och icke-tomma strängarrayer accepteras; tal eller objekt omvandlas inte.
Ogiltiga namn, prototypnycklar, kontrolltecken (förutom horisontell tabb) och felaktig Unicode ignoreras
utan att batchen misslyckas eller att deras innehåll återspeglas i fel.

Varje span samlar in högst 32 headers, 16 värden per header, 4096 UTF-8-byte per värde
och totalt 16384 UTF-8-byte för de insamlade headernamnen och värdena. För stora eller ogiltiga
headers utelämnas i sin helhet och klipps inte. Valet av selektion är ett integritetsbeslut för
operatören: namn som ser säkra ut kan fortfarande innehålla personuppgifter, och dessa gränser/detektorer
är inte en generell PII-rensare.

### Leveransbegränsningar

Requests begränsas till 500 spans och 4 MiB UTF-8-JSON, inklusive omslaget.
Varje tillåten span storlekskontrolleras före den första requesten i en cursor-batch. En enskild
span som är större än gränsen skickar ingen del av den batchen och misslyckas med vägledning om att
sänka `maxBodyBytes`; den släpps inte tyst. Förkontrollen behåller endast postreferenser och
byteantal och kasserar varje temporär span/JSON; spans byggs om för begränsade delar i stället för
att hålla en andra serialiserad kopia av batchen. HTTP 408/429/5xx, nätverksfel och timeouts får högst
tre försök, med exponentiell backoff på 250/500 ms. `Retry-After` i sekunder eller HTTP-datum
kan förlänga en fördröjning upp till 5 sekunder. Övriga statusar misslyckas omedelbart. OTLP:s
partiella avvisning med 2xx kastar också ett fel i stället för att bekräfta en förlorad span; tomma eller
giltiga JSON-bekräftelser accepteras, med en gräns på 64 KiB för svarsläsning.

Fel innehåller endast fakta som ägs av exportören: HTTP-status, återförsöksklass, antal försök och
antal skickade spans, eller fasta formuleringar för bekräftelse-/nätverksfel. Samlarens svarskroppar,
antal för partiella lyckade leveranser och svarshuvuden kopieras aldrig till fel, loggar eller
instrumentpanelen. En misslyckad eller delvis accepterad batch bekräftas inte: destinationen visar
Failing med den statusen, cursorn stannar vid den senast bekräftade batchen och nästa körning
skickar samma rader igen. Permanenta statusar fortsätter att misslyckas tills samlaren eller
konfigurationen har åtgärdats. Använd samlarens egna loggar för svarsdetaljer.
Felsammanfattningar i anropsloggen behåller sin separata redigering.
`prepare()` provisionerar ingenting; Test skickar exakt `{"resourceSpans":[]}` och rapporterar
HTTP-statusen utan att skriva spans till anropsloggen.

Trace-id:n och span-id:n är de första 32 respektive 16 hexadecimala siffrorna i SHA-256 över
`"omniroute.trace\\0" + callLogId` respektive `"omniroute.span\\0" + callLogId`. Återskickade
spans har identiska id:n. Detta är ingen garanti för deduplicering: vissa backends, inklusive Langfuse
v4-ingestion, deduplicerar inte spans med samma id. En krasch eller ett fel i en del av en chunk kan
skicka om högst den enda obekräftade cursor-batchen; hela den batchen kan dupliceras, inte bara dess
senaste HTTP-chunk. Välj cursor-batchens storlek med denna avvägning i åtanke.

### Langfuse-exempel

Konfigurera dessa fält för en självhostad Langfuse-instans:

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

Bygg Authorization-värdet lokalt som Base64 av den bokstavliga strängen `public-key:secret-key`
(till exempel med `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Klistra inte in riktiga uppgifter i loggar, skärmbilder eller ärenden. Mappningen
sätter automatiskt `x-langfuse-ingestion-version: 4`; Authorization anges fortfarande i `headers`.
Både headers och det genererade identitetssaltet använder den befintliga krypterade mekanismen för
hemliga fält och API-platshållare; `STORAGE_ENCRYPTION_KEY` krävs.

Mappningen lägger till generationstyp/-modell, JSON-användningsdetaljer (indata/utdata/total och tillgängliga cache-nycklar), ögonblicksbilder av JSON-indata/utdata, nivån ERROR/DEFAULT, sanerat statusmeddelande, spårnamn, sessions-ID, valfri miljö och filtrerbar
`langfuse.observation.metadata.<key>` för leverantör, begärd modell, sökväg, kombination, cachekälla och status. `langfuse.observation.completion_start_time` är ISO 8601 vid
start + TTFT endast när TTFT är känt och ligger inom varaktigheten. Inga kostnadsattribut skickas.

Identitetslägen gäller för `langfuse.user.id`:

- `pseudonymous` (standard): HMAC-SHA256 av API-nyckelns interna ID med ett slumpmässigt
  32-byte-salt per destination. Saltet genereras vid skapandet om det saknas, krypteras
  som `identitySalt`, returneras aldrig och bevaras vid redigeringar. Råa nyckel-ID:n läggs aldrig
  i span-attribut. Om en destinations salt återskapas eller roteras ändras identiteterna.
- `keyName`: det konfigurerade API-nyckelnamnet, vilket avsiktligt avslöjar operatörens etikett.
- `none`: inget användar-ID. Sessionstaggar exporteras fortfarande när de finns; dessa lägen
  anonymiserar inte godtyckligt promptinnehåll eller sessions-/korrelationsetiketter som tillhandahålls av operatören.

### Starta utan en historisk inläsning

Endast vid skapandet kan du aktivera **Start from current position (skip existing logs)** eller skicka
`startFromCurrentPosition: true` på toppnivå i create API-nyttolasten. Detta initierar
`cursor_row_id` till det aktuella maximala bevarade anropsloggs-rad-ID:t med hjälp av de befintliga
markörhjälparna, utan en migrering. Standardvärdet är false (markör 0 och historisk inläsning av bevarade data).
Detta är inte en inställning för att återställa markören vid uppdatering.

Tillägget av det delade `ttftMs` lägger också till en nullable `ttft_ms`-kolumn i BigQuery-mappningen
och schemat för nya tabeller: schematestet kräver att varje kanoniskt postfält har en kolumn. Befintliga
tabeller fortsätter att exporteras oförändrade: `prepare()` läser tabellschemat och utelämnar endast `ttft_ms`
när den kolumnen saknas. Lägg till den nullable INT64-kolumnen för att få TTFT
vid nästa körning, eller använd en ny tabell. Den valfria TTFT-kolumnen utlöser inte en schemauppdatering. Kolumner för användningsunderlag
följer det villkorliga, opt-in-kompatibilitetsflödet nedan; andra radfält behåller strikt schemakontroll.

---

## 6. Lägga till en destination

1. Skapa `src/lib/logExport/destinations/<name>.ts` som exporterar en `LogExportDestinationType`:
   ett Zod-`configSchema`, en `fields`-deskriptorarray för användargränssnittet, `secretFields` och en
   `createClient(config)` som returnerar `test()` / `prepare()` / `send(records)`.
2. Lägg till den i arrayen `DESTINATIONS` i `src/lib/logExport/registry.ts`.
3. Skriv tester under `tests/unit/`.

Det är hela ändringen: persistensen, cron-jobbet, REST-lagret, krypteringen av hemligheter och
formuläret i kontrollpanelen läser alla registret.

Två regler för en ny destination:

- `send()` **måste kasta ett undantag** vid ett partiellt fel. Ett lyckat anrop betyder ”destinationen har dessa rader”,
  och markören flyttas permanent förbi dem.
- En destination som tar emot en användarangiven URL måste validera den via
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) innan den hämtar data,
  på samma sätt som webhooks gör. BigQuery behöver inte detta: dess värdar är konstanter.

---

## 7. Användning

- **Instrumentpanel**: Integreringar → Loggexport. Lägg till en destination, kör **Testa** för att kontrollera autentiseringsuppgifterna
  utan att skriva rader och aktivera den sedan.
- **Efterkö**: varje destinationskort visar väntande rader och markören; `GET
/api/log-export/status` returnerar samma siffror samt de 20 senaste jobbkörningarna.
- **En destination som misslyckas påverkar inte de andra** — körningssammanfattningen registrerar status
  per destination i `last_status` / `last_error`, och jobbkörningshistoriken behåller det sammanlagda resultatet.
- **Om du tar bort en destination tas dess markör bort.** Om du lägger till den igen börjar den från det äldsta
  bevarade anropslogget, vilket skickar rader som destinationen kanske redan har igen. I BigQuery absorberar `insertId` detta per rad
  endast inom BigQuerys eget dedupliceringsfönster, så föredra att inaktivera
  en destination framför att ta bort den.

### Kompatibilitet för schemat för användningsbevis

Nya BigQuery-tabeller innehåller nullbara `usage_evidence` (STRING som innehåller JSON) och
`usage_estimated` (BOOL). När `autoCreate` är aktiverat kan en befintlig tabell endast få
dessa saknade nullbara kolumner. Exportören bevarar hela det befintliga schemat,
inklusive fältmetadata, och skickar en villkorad PATCH med den returnerade etaggen. En samtidig
schemaändring gör att exporten misslyckas i stället för att skriva över
den; nästa körning läser tabellen igen.

När `autoCreate` är inaktiverat lägger du själv till dessa kolumner innan du exporterar poster
med användningsbevis. Saknade schema-/etagmetadata eller en misslyckad uppdatering förhindrar också
infogningar som innehåller användningsbevis. Exportmarkören avancerar inte vid det felet och
användningsbevis tas aldrig bort i tysthet. Lokal loggbevaring gäller fortfarande medan en export är blockerad,
så lös felet innan de bevarade källraderna löper ut.
