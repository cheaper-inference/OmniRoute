# Log export (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Continue, incrementele export van OmniRoute-aanroeplogs naar een externe analyseopslag.

Het tabblad Logs in het dashboard bewaart de aanvraaggeschiedenis in SQLite (`call_logs`), begrensd door
rotatie en bewaartermijnen. Logexport verstuurt dezelfde records volgens een schema, zodat ze langer
bewaard kunnen blijven dan de lokale database en met andere gegevens kunnen worden gecombineerd. BigQuery is de eerste bestemming; de
pijplijn is opgezet als een register, zodat meer bestemmingen kunnen worden toegevoegd.

---

## 1. Hoe het werkt

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Schema** — één cron-taak in `JobRegistry`, `log_export`, met als standaard `0 * * * *` (elk uur,
  UTC). Geregistreerd in `src/lib/initCloudSync.ts`; te overschrijven met `OMNIROUTE_LOG_EXPORT_CRON`.
  Elke uitvoering verwerkt alle **ingeschakelde** bestemmingen achtereenvolgens.
- **Cursor** — de impliciete `call_logs.rowid` van SQLite, per bestemming opgeslagen in
  `log_export_destinations.cursor_row_id`. `timestamp` is bewust niet de cursor: aanroepers
  kunnen hun eigen waarde opgeven, waardoor een trage aanvraag kan worden weggeschreven na een snellere die
  later begon. Een tijdstempelcursor zou die dan overslaan.
- **Batchverwerking** — `batch_size` rijen per aanvraag (standaard 500), `max_rows_per_run` rijen per uitvoering
  (standaard 10000), zodat een grote achterstand over meerdere uitvoeringen wordt verwerkt in plaats van één uitvoering te blokkeren.
- **Aflevering** — de cursor wordt pas bijgewerkt nadat `send()` is voltooid. Bij een mislukte batch blijft de
  cursor staan, zodat dezelfde rijen bij de volgende uitvoering opnieuw worden geprobeerd. De garantie is
  minimaal één aflevering met ontdubbeling aan de bestemmingszijde, niet strikt precies één aflevering: BigQuery gebruikt de
  aanroeplog-id als sleutel voor elke rij en houdt daar binnen zijn eigen ontdubbelingsvenster naar beste vermogen rekening mee.
- **Overlapbeveiliging** — de cron-uitvoering en `POST .../run` kunnen tegelijk worden gestart. Een bestemming
  die al wordt verwerkt, wordt overgeslagen in plaats van tweemaal verwerkt (`skipped: true` in het uitvoeringsresultaat),
  zodat een gelijktijdige uitvoering geen batch opnieuw kan versturen of de cursor kan terugzetten.
- **Herstel na leegmaken** — als `cursor_row_id` hoger uitkomt dan `MAX(rowid)` (de hele tabel is
  leeggemaakt en de rowid-waarden zijn opnieuw begonnen), zet de uitvoerder de cursor terug naar 0 in plaats van permanent geen records meer te zien.

### Geïsoleerde uitvoerder en limieten

Elke bestemmingsuitvoering op Node start een afzonderlijk, kortstondig onderliggend besturingssysteemproces (`child_process`
met IPC, niet `worker_threads`). Het lezen van body's, het parsen/serialiseren van payload-JSON, het aanroepen van
`prepare()` voor de bestemming en alle netwerk-I/O naar de bestemming vinden daar plaats, niet in de eventloop van de server.
Alleen configuratie en kleine voortgangsberichten gaan via IPC; geëxporteerde records keren nooit terug naar
de server. De cron-taak en de route Nu uitvoeren behouden hetzelfde publieke resultaat en dezelfde overlapbeveiliging.

Het onderliggende proces opent het door de server bepaalde `DATA_DIR/storage.sqlite` alleen-lezen met `node:sqlite`,
met `busy_timeout=5000` en `query_only=ON`. Het importeert geen databasesingleton en voert geen
migraties, back-ups of SQLite-updates uit. De administratie van ontbrekende/beschadigde artefacten (inclusief de
UPDATE voor beschadigde artefacten) blijft uitsluitend onderdeel van het detailpad in het dashboard. Beide paden delen een zuivere
detailresolver; export gebruikt asynchrone bestandssysteemlezingen en dezelfde resolutievolgorde: artefact → verouderd
inline → verouderd op schijf → geen. Een uitvoering legt de maximale invoeg-rowid vast
wanneer het onderliggende proces zijn lezer opent; latere invoegingen wachten op de volgende uitvoering. Dit is een invoeggrens,
geen langdurige SQLite-transactie: WAL-schrijvers en checkpoints blijven vrij tijdens
het wachten op het netwerk. Updates/verwijderingen van bestaande rijen worden door deze grens niet bevroren.

Na elke geaccepteerde batch wacht het onderliggende proces op een bevestiging. De server slaat eerst
de cursor op met `advanceLogExportCursor` en verstuurt vervolgens `ack`; vóór die tijd begint er geen volgende batch.
Een verzendfout, crash of time-out registreert een fout zonder de cursor voor die batch bij te werken. Eerder
bevestigde batches blijven vastgelegd; hoogstens de ene onbevestigde batch kan opnieuw worden verstuurd.
Succes wordt pas geregistreerd na `done` en een normale beëindiging van het onderliggende proces. Bij fouten wordt het onderliggende proces beëindigd
met SIGTERM, na 500 ms opgeschaald naar SIGKILL, en wacht de uitvoerder totdat het proces is afgesloten.

| Omgevingsvariabele                            | Standaard | Doel                                                   |
| --------------------------------------------- | --------- | ------------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000    | Maximale verstreken tijd per bestemming                |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024      | V8-old-space-limiet van het onderliggende proces in MB |

Bij ongeldige, niet-positieve of niet-gehele waarden worden de standaardwaarden gebruikt. De heapinstelling is geen totale
RSS-limiet; zeer grote batches kunnen het geheugen van het onderliggende proces nog steeds uitputten en de uitvoering veilig laten mislukken.
De standaardwaarde van 1024 MB laat ruimte voor de standaardbatch van 500 rijen met artefacten van 512 KiB wanneer
body's zijn ingeschakeld, inclusief de JSON-serialisatie van BigQuery in op bytes gebaseerde blokken. Dit maakt een
batch van 10000 rijen met body's niet veilig. Uitputting van de V8-heap registreert een fout met een concrete herstelactie: verklein de batch
of verhoog `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; de cursor blijft bij de laatst
bevestigde batch. Historische inline/op schijf opgeslagen body's vallen niet onder de moderne artefactlimiet.
Beheerders moeten apart rekening houden met het RSS-geheugengebruik, vooral in containers met een geheugenlimiet.

Het onderliggende proces erft alleen de bepaalde `DATA_DIR`, `NODE_ENV`, expliciete `TZ` (voor de
verwerking van lokale tijd in verouderde bestandsnamen), `ELECTRON_RUN_AS_NODE` indien aanwezig, en de volgende invoer voor uitgaand verkeer:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (en hun varianten in kleine letters),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Een globale Undici-dispatcher deelt de uitsluitend op omgevingsvariabelen gebaseerde proxybepaling en de regels voor het
omzeilen van de proxy voor lokale hosts van de server, inclusief `NO_PROXY`; deze importeert noch `proxyFetch.ts`, noch de bijbehorende database-/functieflags.
Proxyreferenties worden verwijderd uit doorgestuurde uitvoer en vastgelegde fouten. Referenties voor de bestemming
worden uitsluitend in één IPC-startbericht verzonden, nooit via argv of de omgeving; doorgestuurde uitvoer en fouten
krijgen een voorvoegsel en worden opgeschoond. Alleen `ExperimentalWarning` wordt uitgeschakeld in de uitvoeringsargumenten van het onderliggende proces om te voorkomen
dat de SQLite-waarschuwing van Node bij elke cron-uitvoering wordt herhaald; andere waarschuwingstypen blijven zichtbaar.

Bestemmingsmodules moeten geïmporteerd kunnen worden zonder Next.js-/server-only-afhankelijkheden. De bestaande
BigQuery-implementatie voldoet al aan die vereiste. Caches voor toegangstokens blijven alleen bestaan tijdens de uitvoering
van het onderliggende proces, niet tussen uitvoeringen. Node is de ondersteunde runtime (engines in `package.json`), maar de Bun-installatiesectie
in de README en `Dockerfile.bun` bieden ook een compatibiliteitsroute voor productie met
`bun:sqlite` (`src/lib/db/core.ts` / adapters). Onder Bun behouden exports daarom het eerdere
uitvoeringspad binnen hetzelfde proces en geven ze een eenmalige waarschuwing: heap-/time-outisolatie via een onderliggend proces is niet beschikbaar. Gebruik
Node voor eventloop- en OOM-isolatie; Bun wordt hier niet als uitsluitend voor ontwikkeling beschouwd.

Wanneer `includeBodies` is ingeschakeld, verdient een interval op minutenniveau zoals
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` de voorkeur boven het opbouwen van een uur aan achterstallige payloads.
Batch- en rijlimieten begrenzen nog steeds elke uitvoering. Het proces wordt per bestemming per uitvoering opgestart;
hierbij worden geringe opstartkosten ingeruild voor isolatie van de server-eventloop, niet voor een lager totaal CPU-gebruik.

### Payloads (prompts en antwoorden)

Standaard bevat de export alleen de samenvattingsvelden die de **lijst** met logs toont. Door
**Prompts en antwoorden exporteren** (`includeBodies`) in te schakelen, wordt daarnaast geëxporteerd wat het **detailvenster**
van de logs voor elke aanroep toont:

| Veld                             | Inhoud                                                                   |
| -------------------------------- | ------------------------------------------------------------------------ |
| `request_body` / `response_body` | De payloads van de aanroep zoals het dashboard ze weergeeft              |
| `pipeline_route_decision`        | Welk doel en model de router heeft gekozen                               |
| `pipeline_client_request`        | Het onbewerkte verzoek, precies zoals de client het heeft verzonden      |
| `pipeline_openai_request`        | Na omzetting naar de interne OpenAI-structuur                            |
| `pipeline_provider_request`      | Zoals daadwerkelijk upstream verzonden, in het formaat van de provider   |
| `pipeline_provider_response`     | Het onbewerkte upstream-antwoord                                         |
| `pipeline_client_response`       | Wat aan de aanroeper is teruggegeven                                     |
| `pipeline_error`                 | Foutdetails op pipelineniveau voor een mislukte aanroep                  |
| `bodies_truncated`               | Waar wanneer een van de bovenstaande velden `maxBodyBytes` heeft bereikt |

Dit is promptinhoud, dus deze optie staat **standaard uit** en is bewust een keuze per bestemming.
Wat wordt geëxporteerd, is wat het dashboard toont, omdat de export en `getCallLogById` dezelfde verwerking
van details delen: payloads zijn
al ontdaan van persoonsgegevens en geheimen wanneer ze worden opgeslagen, en een aanroep met een
`noLog`-API-sleutel slaat helemaal geen payload op, zodat er niets te exporteren is.

Payloads worden per rij uit het bestandssysteemartefact gelezen, dus het laden ervan gebeurt alleen voor bestemmingen
die daarom hebben gevraagd. Bij een ontbrekend of beschadigd artefact wordt de samenvatting geëxporteerd met null-payloads, in plaats
van de batch te laten mislukken en de cursor te laten vastlopen.

`maxBodyBytes` (standaard 262144) begrenst elk veld. Langere payloads worden **afgekapt in plaats van
weggelaten** — een ingekorte prompt beantwoordt nog steeds de vraag "wat werd er gevraagd" — en de rij wordt gemarkeerd met
`bodies_truncated`. Gestreamde delta's per chunk worden niet geëxporteerd; het samengestelde antwoord staat
al in `pipeline_provider_response` en `pipeline_client_response`.

---

## 2. Bestanden

| Onderdeel                            | Locatie                                      |
| ------------------------------------ | -------------------------------------------- |
| Bestemmingscontract                  | `src/lib/logExport/types.ts`                 |
| Register                             | `src/lib/logExport/registry.ts`              |
| Geheimenbeheer                       | `src/lib/logExport/secrets.ts`               |
| Runner (IPC van bovenliggend proces) | `src/lib/logExport/runner.ts`                |
| Proceslevenscyclus                   | `src/lib/logExport/childRunner.ts`           |
| Startpunt voor onderliggend proces   | `src/lib/logExport/exportChild.ts`           |
| Alleen-lezenopener                   | `src/lib/db/logExportReadOnly.ts`            |
| Gedeelde query/mapping               | `src/lib/usage/callLogExportQueries.ts`      |
| Detailresolver                       | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projectie                        | `src/lib/logExport/presenter.ts`             |
| BigQuery-bestemming                  | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-authenticatie              | `src/lib/logExport/googleServiceAccount.ts`  |
| Aanroeplogbron                       | `src/lib/usage/callLogExportSource.ts`       |
| Persistente opslag                   | `src/lib/db/logExportDestinations.ts`        |
| Cron-taak                            | `src/lib/jobs/logExportJob.ts`               |
| REST-laag                            | `src/app/api/log-export/`                    |
| Dashboardpagina                      | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Alle routes vereisen beheerauthenticatie (`requireManagementAuth`). Geheimen worden nooit geretourneerd:
een opgeslagen geheim wordt geretourneerd als de letterlijke waarde `__stored__`, en als die waarde bij een update wordt teruggestuurd,
blijft het opgeslagen authenticatiegegeven behouden.

Het aanmaken of bijwerken van een bestemming waarvan het type een geheim declareert, **vereist
`STORAGE_ENCRYPTION_KEY`**. Zonder deze sleutel geeft `encrypt()` de invoer ongemerkt ongewijzigd door, dus wordt de schrijfactie
geweigerd met een 400 in plaats van een authenticatiegegeven als platte tekst in SQLite op te slaan (dezelfde beveiliging die de
Telegram-webhook toepast).

| Methode  | Pad                                      | Doel                                                                   |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Bestemmingstypen + hun lijst met configuratievelden                    |
| `GET`    | `/api/log-export/destinations`           | Bestemmingen weergeven (geheimen afgeschermd)                          |
| `POST`   | `/api/log-export/destinations`           | Een bestemming aanmaken                                                |
| `GET`    | `/api/log-export/destinations/{id}`      | Eén bestemming ophalen                                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | Naam / ingeschakelde status / configuratie / batchverwerking bijwerken |
| `DELETE` | `/api/log-export/destinations/{id}`      | Verwijderen                                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | Authenticatiegegevens testen, niets schrijven                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Achterstand nu verwerken, via hetzelfde pad als de geplande uitvoering |
| `GET`    | `/api/log-export/status`                 | Cron-status, recente uitvoeringen, achterstand per bestemming          |

`GET /api/log-export/types` maakt de UI generiek: het dashboardformulier wordt opgebouwd op basis van
de geretourneerde veldbeschrijvingen, zodat een nieuwe bestemming geen UI-wijziging vereist.

---

## 4. BigQuery-bestemming

Configuratiesleutels (`type: "bigquery"`):

| Sleutel              | Opmerkingen                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-project dat de dataset bevat                                                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                     |
| `location`           | Alleen gebruikt wanneer de dataset moet worden aangemaakt (standaard `EU`)                                          |
| `serviceAccountJson` | Sleutel van het serviceaccount. Geheim: versleuteld opgeslagen, nooit teruggegeven                                  |
| `autoCreate`         | Ontbrekende dataset/tabel aanmaken; conditioneel nullable kolommen voor gebruiksbewijs toevoegen (standaard `true`) |

Het serviceaccount heeft `bigquery.tables.updateData` nodig op de doeltabel, plus
`bigquery.datasets.create` / `bigquery.tables.create` wanneer `autoCreate` is ingeschakeld.
Voor het bijwerken van een bestaande tabel om de twee nullable velden voor gebruiksbewijs toe te
voegen, is ook `bigquery.tables.update` vereist. Een ontbrekende machtiging laat de export
mislukken zonder de cursor vooruit te schuiven.

Een geconfigureerde batch is een **cursor-eenheid**, geen HTTP-eenheid: `send()` verdeelt deze in
insertAll-aanroepen van maximaal 500 rijen, zodat een grote `batch_size` de limiet van 10 MB per
BigQuery-verzoek niet kan overschrijden. Tijdelijke statussen (408/429/500/502/503/504) worden
maximaal drie keer opnieuw geprobeerd met exponentiële back-off, waarbij dezelfde insertIds
opnieuw worden gebruikt; authenticatie- en schemafouten leiden al bij de eerste poging tot een
exception, in plaats van de uitvoering onnodig te laten doorgaan.

Een tabel die zojuist is aangemaakt, is nog niet zichtbaar voor het streaming-eindpunt, dat
gedurende enkele seconden 404 retourneert. Die 404 wordt opnieuw geprobeerd, maar **alleen wanneer
deze uitvoering de tabel heeft aangemaakt** — een daadwerkelijk ontbrekende tabel mislukt nog
steeds direct. Let op: wanneer een tabel onder een naam die onlangs is verwijderd opnieuw wordt
aangemaakt, weigert BigQuery gedurende enkele minuten streaming-inserts; dat is een eigenschap
van verwijderen en daarna opnieuw aanmaken. Gebruik daarom bij voorkeur een nieuwe tabelnaam in
plaats van een tabel te verwijderen en opnieuw toe te voegen.

**Een gedeeltelijke fout komt binnen als HTTP 200 met een niet-lege `insertErrors[]`.** Dit wordt
als een fout behandeld en leidt tot een exception. Daarmee wordt voorkomen dat de cursor voorbij
rijen gaat die BigQuery nooit heeft geaccepteerd; `tests/unit/log-export-bigquery.test.ts` legt dit
gedrag vast.

Het transport gebruikt eenvoudige REST — een zelfondertekende RS256-assertie wordt uitgewisseld
voor een toegangstoken op
`https://oauth2.googleapis.com/token`, waarna rijen naar `tabledata.insertAll` worden gestuurd.
Er wordt geen Google SDK binnengehaald. Toegangstokens worden in het proces gecachet per
(serviceaccount, scope).

De aangemaakte tabel bevat één kolom per veld op het tabblad Logs plus `exported_at`, en is
ingericht voor de manier waarop aanroeplogboeken daadwerkelijk worden opgevraagd:

- **Gepartitioneerd per dag op `timestamp`**, zodat een query die door een datum wordt begrensd
  alleen die dagen scant.
- **Geclusterd op `api_key_name`, `provider`, `model`, `status`** (in die volgorde), zodat
  filteren op wie de aanroep uitvoerde, waar deze naartoe ging of of deze mislukte, blokken binnen
  elke partitie uitsluit. BigQuery staat maximaal vier clusterkolommen toe en de volgorde is van
  belang: een filter op alleen `api_key_name` sluit blokken uit, een filter op alleen `status` doet
  dat niet.
- **Optioneel behoud van partities** via `partitionExpirationDays` (0 behoudt alles), toegepast
  wanneer de tabel wordt aangemaakt.

Beide instellingen worden toegepast bij het aanmaken. Een bestaande tabel behoudt de indeling die
deze al heeft. Wijs de bestemming daarom naar een nieuwe tabel-id als je deze instellingen wilt
gebruiken.

`tests/unit/log-export-bigquery.test.ts` controleert dat de mapper en het tabelschema synchroon
blijven, zodat een nieuwe kolom voor aanroeplogboeken onderweg niet stilletjes kan worden
weggelaten.

Batches worden opgesplitst op basis van **zowel het aantal rijen als het aantal
geserialiseerde bytes**. Alleen het aantal rijen is niet voldoende zodra payloads worden
geëxporteerd: 500 rijen met prompts kunnen tientallen megabytes groot zijn, en insertAll weigert
een verzoek van meer dan 10 MB. Delen worden gesloten bij 500 rijen of 9 MB, afhankelijk van wat
het eerst wordt bereikt.

---

## 5. OTLP/HTTP-tracesbestemming

De configuratie gebruikt `type: "otlp-http"`. Dit is een geplande, cursorgebaseerde export van
bewaarde oproeplogboeken, niet de best-effort live sink voor routeringsgebeurtenissen in
`open-sse/services/routing/otel.ts`. Deze leest de omgevingsvariabelen, timers of buffers van die
sink niet en wijzigt ze ook niet. Als u beide inschakelt, kunnen twee onafhankelijke soorten spans
worden geproduceerd; gebruik de instrumentatiescope `omniroute.log-export` om deze oproeplogspans
van elkaar te onderscheiden.

| Sleutel                  | Standaardwaarde/doel                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `endpoint`               | Vereiste volledige HTTP(S)-traces-URL; er wordt geen `/v1/traces`-achtervoegsel toegevoegd                 |
| `headers`                | Optionele regels van het type `Name: value` of JSON-object met tekenreeksen; versleuteld                   |
| `requestHeaderAllowlist` | Leeg (uitgeschakeld); namen/voorvoegsels van clientheaders die als spanattributen moeten worden vastgelegd |
| `serviceName`            | `omniroute`; resource `service.name`                                                                       |
| `langfuseMapping`        | `false`; voegt Langfuse-generation/session/user-attributen toe                                             |
| `identity`               | `pseudonymous`, `keyName` of `none`                                                                        |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                                    |
| `timeoutMs`              | `30000` per HTTP-poging                                                                                    |
| `environment`            | Niet ingesteld; optioneel `langfuse.environment`                                                           |

Het algemene dashboard geeft deze velden weer. `paths` accepteert een API-array of een tekstvak
met exacte paden, gescheiden door nieuwe regels/komma's. Embeddings, reranking en andere paden
worden overgeslagen tenzij ze expliciet zijn toegestaan. Overgeslagen rijen verhogen de cursor
nog steeds; de tellers `exported`/`exportedTotal` van de bestaande runner tellen verwerkte
bronrijen, inclusief gefilterde rijen, in plaats van geaccepteerde spans. Het filteren gebeurt in
het child-proces, zonder het IPC-/cursorcontract ervan te wijzigen.

URL-validatie gebruikt de DB-vrije helper `parseAndValidateNonMetadataUrl` uit
`src/shared/network/outboundUrlGuard.ts`: het beleid `block-metadata`. Dit heeft dezelfde
onvoorwaardelijke controles op metadata, protocollen en ingebedde referenties als de
webhookvalidator, waarbij private URL's zijn toegestaan, maar staat localhost-/LAN-doelen
bewust toe zonder een algemene feature-flag-override. Hierdoor zijn self-hosted Langfuse-,
Phoenix-, Tempo- en Collector-eindpunten mogelijk, inclusief private HTTP-eindpunten.
Cloud-metadat hosts worden altijd geblokkeerd. Redirects worden niet gevolgd, zodat een
collector geen referenties naar een andere host kan doorsturen. Net als de bestaande lexicale
URL-guard legt dit geen DNS-resolutie vast; configureer alleen hosts die door de operator worden
beheerd. Geef de voorkeur aan HTTPS wanneer het eindpunt zich niet op een vertrouwd netwerk
bevindt.

### Payload en levering

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) bevat één
CLIENT-span per toegestane rij, genoemd naar het exacte aanvraagpad. Door naamgeving op basis van
het pad worden Chat Completions, Responses en Messages van elkaar onderscheiden zonder model- of
identiteitsgegevens in de span-naam op te nemen. Resource-attributen omvatten `service.name` en
de `service.version` van het pakket.

De normale logger voor chatpogingen (`open-sse/handlers/chatCore/attemptLogging.ts`) schrijft
`duration = Date.now() - startTime` bij voltooiing en levert geen tijdstempel;
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` stelt de tijdstempel standaard in op het
moment van schrijven (voltooiing). De export stelt daarom end in op de tijdstempel van de rij en
start op end − duration (milliseconden, omgerekend naar decimale nanoseconden). Door de aanroeper
geleverde historische tijdstempels worden eveneens als eindtijd behouden; er is geen onderscheid
per rij tussen start en voltooiing. Een null-duration wordt nul. Ongeldige of ontbrekende
tijdstempels laten de batch mislukken in plaats van niet-deterministische spans te creëren.
`ttftMs` is nullable en wordt gekoppeld aan `omniroute.ttft_ms`.

Attributen omvatten `gen_ai.operation.name="chat"`, provider, aangevraagd/responsmodel,
invoer-/uitvoertokens, optionele cache-read-/cache-creation-/reasoning-tokens, HTTP-status,
combinatie, cachebron, sessietag en correlatie-id. Gehele OTLP-waarden en tijdstempels zijn
decimale tekenreeksen; tekenreeksen, booleans en gebroken getallen gebruiken hun eigen OTLP-
waardevarianten. Foutspans hebben de status ERROR en een opgeschoonde statusmelding. Het
canonieke record bevat geen upstream-host-URL, dus `server.address` wordt weggelaten in plaats
van de collector onterecht als modelserver te identificeren. Kosten worden niet geëxporteerd.

Alleen `includeBodies=true` laadt inhoud. Met `langfuseMapping=false` bevatten
`gen_ai.input.messages` / `gen_ai.output.messages` de opgeschoonde JSON van de aanvraag-/
responsbody zoals opgeslagen door OmniRoute (gecanonicaliseerd wanneer parseerbaar), en niet een
opnieuw vormgegeven semconv-berichtenarray. Afgekapte/niet-JSON-bodies blijven onbewerkte tekst.
Met `langfuseMapping=true` worden bodies alleen uitgegeven als
`langfuse.observation.input` / `langfuse.observation.output`; de attributen
`gen_ai.*.messages` worden weggelaten zodat elke body één keer wordt verzonden. Beide modi nemen
`maxBodyBytes` over van het bestaande hydratatiepad; `omniroute.bodies_truncated=true` markeert
afkapping.
Deze bestemming voegt geen extra pipeline-snapshots of het uitlezen van niet-opgeschoonde
artefacten toe; het optioneel vastleggen van aanvraagheaders gebruikt de bestaande geladen
clientsnapshot die hieronder wordt beschreven. Gebruik bij het exporteren van bodies een cadence
op minuteniveau, zoals `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, in plaats van elk uur een
achterstand op te bouwen.

### Optionele aanvraagheaders van de client

Het vastleggen van headers is **standaard uitgeschakeld**. Stel `requestHeaderAllowlist` in de
bestemmingsconfiguratie in en schakel **Prompts en antwoorden exporteren** in
(`includeBodies: true` op de bestemming).
De allowlist accepteert een API-array of een tekstvak met namen, gescheiden door nieuwe regels of
komma's:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Namen komen hoofdletterongevoelig en exact overeen, tenzij een enkele afsluitende `*` een niet-lege
headernaam-prefix selecteert. Een losse `*`, ingesloten wildcards en ongeldige HTTP-headernamen worden
afgewezen. Er zijn maximaal 64 selectors, elk met een naam/prefix van maximaal 256 ASCII-bytes.
Deze instelling staat los van `headers`, waarmee de exporter zich bij de collector authenticeert.

Capture leest uitsluitend `pipeline_client_request`, dat wordt gevuld vanuit `clientRawRequest` van de
opgeslagen gedetailleerde pipeline (of het legacy-veld `clientRequest`). Er wordt nooit teruggevallen op
requestheaders van de provider. Gedetailleerde pipelinelogging moet zijn ingeschakeld toen het request
werd vastgelegd. Als `includeBodies` is uitgeschakeld, of als de JSON van de client-snapshot ontbreekt,
beschadigd of afgekapt is, worden er geen headerattributen uitgegeven. Door `maxBodyBytes` te verhogen
kan afkappen van de snapshot tijdens het exporteren worden voorkomen; hiermee kan detail dat nooit is
opgeslagen niet worden hersteld. Een snapshot van meer dan 1 MiB of met meer dan 256 headeritems wordt
genegeerd. De bestaande export van prompt en response blijft naast headercapture ingeschakeld; de
allowlist biedt geen hydrationmodus die uitsluitend headers verwerkt.

Geselecteerde waarden worden OTLP-stringarrays met de naam
`http.request.header.<full lowercase header name>`, ook voor één enkele string. Bijvoorbeeld,
`X-OmniRoute-Meta-Team: example-team` wordt
`http.request.header.x-omniroute-meta-team` met
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
De volledige prefix blijft behouden: dit zijn gewone headers, zonder parsing van bedrijfsvelden of
conversie naar `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` wijzigt de semantiek van
headers niet. Een geselecteerde header `User-Agent` met één waarde stelt ook de standaard scalar
`user_agent.original` in. Komma's binnen één waarde worden niet gesplitst. Varianten van hoofdletters
en kleine letters worden samengevoegd in de volgorde waarin ze zijn opgeslagen; als een variant
ongeldig is, wordt die volledige header weggelaten. Attributen worden op kleine letters van de naam
gesorteerd.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key-headers, namen met
auth/token/secret/password/credential-markeringen en interne gatewayreferenties worden altijd
uitgesloten, ook als ze zijn geselecteerd of gedeeltelijk gemaskeerd in de opslag. Bekende
referentiepatronen gebruiken opnieuw de gedeelde referentiedetector; redactie-markeringen worden
weggelaten en niet als veilige waarden geëxporteerd. Alleen strings en niet-lege stringarrays worden
geaccepteerd; getallen of objecten worden niet automatisch geconverteerd. Ongeldige namen,
prototype-sleutels, besturingstekens (behalve horizontale tabs) en ongeldige Unicode worden genegeerd
zonder dat de batch mislukt of de inhoud ervan in fouten wordt weergegeven.

Elke span bevat maximaal 32 headers, 16 waarden per header, 4096 UTF-8-bytes per waarde en in totaal
16384 UTF-8-bytes voor de vastgelegde headernamen en -waarden. Te grote of ongeldige headers worden
volledig weggelaten en niet afgekapt. Selectie is een privacybeslissing van de operator: ogenschijnlijk
veilige namen kunnen nog steeds persoonsgegevens bevatten, en deze limieten/detectors zijn geen
algemene PII-scrubber.

### Leveringslimieten

Requests zijn beperkt tot 500 spans en 4 MiB UTF-8-JSON, inclusief de envelope.
Elke toegestane span wordt gecontroleerd op grootte vóór het eerste request van een cursorsbatch. Als
een afzonderlijke span groter is dan de limiet, wordt geen deel van die batch verzonden en mislukt de
bewerking met instructies om `maxBodyBytes` te verlagen; de span wordt niet stilzwijgend verwijderd.
De preflight-bewerking bewaart alleen recordreferenties en byteaantallen en verwijdert elke tijdelijke
span/JSON; spans worden opnieuw opgebouwd voor begrensde chunks, zodat er geen tweede geserialiseerde
kopie van de batch wordt bewaard. HTTP 408/429/5xx, netwerkfouten en time-outs krijgen maximaal
drie pogingen, met een exponentiële backoff van 250/500 ms. `Retry-After`-seconden of HTTP-datums
kunnen een vertraging tot maximaal 5 seconden verlengen. Andere statussen mislukken onmiddellijk.
OTLP 2xx-gedeeltelijke afwijzing genereert ook een fout in plaats van een verloren span te bevestigen;
lege of geldige JSON-bevestigingen worden geaccepteerd, met een limiet van 64 KiB voor het lezen van
de response.

Fouten bevatten alleen feiten die eigendom zijn van de exporter: HTTP-status, retryklasse, aantal
pogingen en verzonden spanaantallen, of vaste bewoordingen voor bevestigings-/netwerkfouten.
Response-inhoud van de collector, aantallen gedeeltelijke successen en responseheaders worden nooit
overgenomen in fouten, logs of het dashboard. Een mislukte of gedeeltelijk geaccepteerde batch wordt
niet bevestigd: de bestemming toont Failing met die status, de cursor blijft op de laatst bevestigde
batch staan en de volgende run verzendt dezelfde rijen opnieuw. Permanente statussen blijven mislukken
totdat de collector of configuratie is hersteld. Gebruik de eigen logs van de collector voor
responsegegevens. Foutsamenvattingen in het call-log behouden hun afzonderlijke redactie.
`prepare()` maakt niets aan; Test verstuurt exact `{"resourceSpans":[]}` en rapporteert de
HTTP-status zonder call-log-spans te schrijven.

Trace-id's en span-id's zijn de eerste 32/16 hexadecimale cijfers van SHA-256 over
`"omniroute.trace\\0" + callLogId` en `"omniroute.span\\0" + callLogId`. Opnieuw verzonden gegevens
bevatten identieke id's. Dit is geen garantie voor deduplicatie: sommige backends, waaronder de
Langfuse v4-ingestie, dedupliceren spans met dezelfde id niet. Door een crash of een gedeeltelijk
mislukte chunk kan maximaal de ene niet-bevestigde cursorsbatch opnieuw worden verzonden; die volledige
batch kan worden gedupliceerd, niet alleen de laatste HTTP-chunk. Kies de grootte van de cursorsbatch
met die afweging in gedachten.

### Langfuse-voorbeeld

Configureer deze velden voor een zelfgehoste Langfuse-instantie:

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

Bouw de Authorization-waarde lokaal op als Base64 van de letterlijke tekenreeks
`public-key:secret-key` (bijvoorbeeld met `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Plak echte referenties niet in logs, schermafbeeldingen of issues. De mapping stelt automatisch
`x-langfuse-ingestion-version: 4` in; Authorization wordt nog steeds aangeleverd in `headers`.
Zowel headers als de gegenereerde identity-salt gebruiken het bestaande mechanisme voor versleutelde
geheime velden en API-placeholders; `STORAGE_ENCRYPTION_KEY` is vereist.

Mapping voegt het generatie type/model, JSON-gebruiksdetails (input/output/totaal en beschikbare
cachesleutels), JSON-input-/outputsnapshots, het niveau ERROR/DEFAULT, een opgeschoond
statusbericht, de tracenaam, sessie-ID, optionele omgeving en het filterbare
`langfuse.observation.metadata.<key>` toe voor provider, aangevraagd model, pad, combinatie, cachebron
en status. `langfuse.observation.completion_start_time` is ISO 8601 op het startmoment + TTFT, alleen
wanneer TTFT bekend is en binnen de duur valt. Er worden geen kostenattributen verzonden.

Identiteitsmodi zijn van toepassing op `langfuse.user.id`:

- `pseudonymous` (standaard): HMAC-SHA256 van de interne ID van de API-sleutel met een willekeurige
  salt van 32 bytes per bestemming. De salt wordt bij het aanmaken gegenereerd als deze ontbreekt,
  versleuteld als `identitySalt`, nooit geretourneerd en tijdens bewerkingen behouden. Ruwe
  sleutel-ID's worden nooit in spanattributen geplaatst. Het opnieuw aanmaken of roteren van de salt
  van een bestemming wijzigt de identiteiten.
- `keyName`: de geconfigureerde naam van de API-sleutel, waarbij dat operatorlabel bewust wordt
  onthuld.
- `none`: geen gebruikers-ID. Sessietags worden nog steeds geëxporteerd wanneer deze aanwezig zijn;
  deze modi anonimiseren geen willekeurige promptinhoud of door operators aangeleverde sessie-/
  correlatielabels.

### Starten zonder backfill

Alleen bij het aanmaken activeer je **Starten vanaf de huidige positie (bestaande logboeken overslaan)** of geef je
`startFromCurrentPosition: true` door op het hoogste niveau van de create API-payload. Hiermee wordt
`cursor_row_id` geïnitialiseerd op de huidige maximale bewaarde rowid van het call-log met behulp van de
bestaande cursorhelpers, zonder migratie. De standaardwaarde is false (cursor 0 en backfill van de
bewaarde geschiedenis). Dit is geen instelling voor het resetten van de cursor tijdens updates.

De gedeelde toevoeging van `ttftMs` voegt ook een nullable kolom `ttft_ms` toe aan de BigQuery-mapper
en het schema van nieuwe tabellen: de schematest vereist dat elk canoniek recordveld een kolom heeft.
Bestaande tabellen blijven ongewijzigd exporteren: `prepare()` leest het tabelschema en laat alleen
`ttft_ms` weg wanneer die kolom ontbreekt. Voeg de nullable INT64-kolom toe om TTFT bij de volgende
uitvoering te krijgen, of gebruik een nieuwe tabel. De optionele TTFT-kolom activeert geen
schemaupdatering. Gebruiksevidentie-kolommen volgen de onderstaande voorwaardelijke, opt-in
compatibiliteitsprocedure; voor andere rijvelden blijft strikte schemacontrole gelden.

---

## 6. Een bestemming toevoegen

1. Maak `src/lib/logExport/destinations/<name>.ts` aan dat een `LogExportDestinationType` exporteert:
   een Zod-`configSchema`, een `fields`-descriptorarray voor de UI, `secretFields` en een
   `createClient(config)` die `test()` / `prepare()` / `send(records)` retourneert.
2. Voeg deze toe aan de `DESTINATIONS`-array in `src/lib/logExport/registry.ts`.
3. Schrijf tests onder `tests/unit/`.

Dat is de volledige wijziging: de persistenti laag, de cronjob, de REST-laag, de versleuteling van geheimen en het
dashboardformulier lezen allemaal het register.

Twee regels voor een nieuwe bestemming:

- `send()` **moet een fout opwerpen** bij een gedeeltelijke mislukking. Succesvolle voltooiing betekent "de bestemming heeft deze rijen",
  en de cursor schuift er definitief voorbij.
- Een bestemming die een door de gebruiker opgegeven URL accepteert, moet deze vóór het ophalen valideren met
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  op dezelfde manier als webhooks. BigQuery heeft dit niet nodig: de hosts ervan zijn constanten.

---

## 7. Bediening

- **Dashboard**: Integraties → Logexport. Voeg een bestemming toe, voer **Test** uit om de inloggegevens te controleren
  zonder rijen te schrijven en schakel de bestemming vervolgens in.
- **Achterstand**: op elke bestemmingskaart worden de openstaande rijen en de cursor weergegeven; `GET
/api/log-export/status` retourneert dezelfde cijfers plus de laatste 20 taakuitvoeringen.
- **Een falende bestemming laat de andere bestemmingen niet falen** — het uitvoeringsoverzicht registreert de status per bestemming
  in `last_status` / `last_error`, en de geschiedenis van taakuitvoeringen bewaart het totaaloverzicht.
- **Een bestemming verwijderen verwijdert de bijbehorende cursor.** Als u de bestemming opnieuw toevoegt, wordt gestart bij het oudste
  bewaarde aanroeplogboek, waardoor rijen opnieuw worden verzonden die de bestemming mogelijk al bevat. Op BigQuery voorkomt de
  `insertId` dit alleen binnen het eigen deduplicatievenster van BigQuery, dus schakel een bestemming bij voorkeur uit
  in plaats van deze te verwijderen.

### Compatibiliteit van het schema voor gebruiksbewijs

Nieuwe BigQuery-tabellen bevatten `usage_evidence` (STRING met JSON) en
`usage_estimated` (BOOL), beide nullable. Als `autoCreate` is ingeschakeld, kan een bestaande tabel alleen
deze ontbrekende nullable kolommen ontvangen. De exporter behoudt het volledige bestaande schema,
inclusief veldmetagegevens, en verstuurt een voorwaardelijke PATCH met de geretourneerde etag. Een gelijktijdige
schemewijziging laat de export mislukken in plaats van deze te overschrijven; bij de volgende uitvoering wordt de
tabel opnieuw gelezen.

Als `autoCreate` is uitgeschakeld, voegt u deze kolommen zelf toe voordat u records met gebruiksbewijs exporteert.
Ontbrekende schema-/etagmetagegevens of een mislukte update verhinderen ook invoegingen die gebruiksbewijs bevatten.
De exportcursor schuift bij die fout niet op en bewijs wordt nooit stilzwijgend verwijderd. Lokale logretentie blijft van
toepassing zolang een export is geblokkeerd, dus los de fout op voordat bewaarde bronrijen verlopen.
