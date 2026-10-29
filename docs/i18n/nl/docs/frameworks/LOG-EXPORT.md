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

| Sleutel              | Opmerkingen                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `projectId`          | GCP-project dat de dataset bevat                                                   |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                    |
| `tableId`            | `[A-Za-z0-9_]+`                                                                    |
| `location`           | Alleen gebruikt als de dataset moet worden aangemaakt (standaard `EU`)             |
| `serviceAccountJson` | Sleutel van het serviceaccount. Geheim: versleuteld opgeslagen, nooit teruggegeven |
| `autoCreate`         | De dataset en tabel bij de eerste export aanmaken (standaard `true`)               |

Het serviceaccount heeft `bigquery.tables.updateData` nodig op de doeltabel, plus
`bigquery.datasets.create` / `bigquery.tables.create` wanneer `autoCreate` is ingeschakeld.

Een geconfigureerde batch is een **cursor**-eenheid, geen HTTP-eenheid: `send()` splitst deze op in insertAll-
aanroepen van maximaal 500 rijen, zodat een grote `batch_size` de aanvraaglimiet van 10 MB van BigQuery niet kan overschrijden.
Bij tijdelijke statussen (408/429/500/502/503/504) wordt maximaal drie keer opnieuw geprobeerd met exponentieel
oplopende wachttijden, waarbij dezelfde insertIds worden hergebruikt; authenticatie- en schemafouten veroorzaken bij de eerste poging een uitzondering, in plaats
van de uitvoering te verspillen.

Een tabel die zojuist is aangemaakt, is nog niet zichtbaar voor het streamingendpoint, dat enkele seconden lang
404 retourneert. Bij die 404 wordt opnieuw geprobeerd, maar **alleen als deze uitvoering de tabel heeft aangemaakt** —
een daadwerkelijk ontbrekende tabel leidt nog steeds direct tot een fout. Houd er rekening mee dat BigQuery streaming-invoegingen enkele minuten weigert
als een tabel opnieuw wordt aangemaakt onder een naam die onlangs is verwijderd; dat is een
eigenschap van verwijderen en opnieuw aanmaken, dus gebruik liever een nieuwe tabelnaam dan een tabel te verwijderen en opnieuw toe te voegen.

**Een gedeeltelijke fout wordt geretourneerd als HTTP 200 met een niet-lege `insertErrors[]`.** Dit wordt behandeld als
een fout en veroorzaakt een uitzondering, waardoor de cursor niet verdergaat dan rijen die BigQuery nooit
heeft geaccepteerd; `tests/unit/log-export-bigquery.test.ts` legt dit gedrag vast.

Het transport verloopt via gewone REST — een zelfondertekende RS256-assertie wordt ingewisseld voor een toegangstoken bij
`https://oauth2.googleapis.com/token`, waarna rijen naar `tabledata.insertAll` worden verstuurd. Er wordt geen Google SDK
binnengehaald. Toegangstokens worden binnen het proces gecachet per (serviceaccount, scope).

De aangemaakte tabel bevat één kolom per veld op het tabblad Logs plus `exported_at`, en is ingedeeld op basis van
hoe aanroeplogboeken daadwerkelijk worden doorzocht:

- **Per dag gepartitioneerd op `timestamp`**, zodat een query met een datumbereik alleen die dagen scant.
- **Geclusterd op `api_key_name`, `provider`, `model`, `status`** (in die volgorde), zodat filteren op
  wie de aanroep uitvoerde, waar deze naartoe ging of of deze mislukte, blokken binnen elke partitie uitsluit. BigQuery
  staat maximaal vier clusterkolommen toe en de volgorde is van belang: een filter op alleen `api_key_name`
  sluit blokken uit, een filter op alleen `status` niet.
- **Optionele bewaartermijn voor partities** via `partitionExpirationDays` (0 bewaart alles), toegepast
  wanneer de tabel wordt aangemaakt.

Beide instellingen worden toegepast bij het aanmaken. Een bestaande tabel behoudt de bestaande indeling, dus
laat de bestemming naar een nieuwe tabel-ID verwijzen als u deze instellingen wilt gebruiken.

`tests/unit/log-export-bigquery.test.ts` controleert dat de mapper en het tabelschema synchroon blijven,
zodat een nieuwe kolom in het aanroeplogboek niet ongemerkt verloren kan gaan tijdens de export.

Batches worden opgesplitst op basis van **zowel** het aantal rijen als het aantal geserialiseerde bytes. Alleen het aantal rijen is niet voldoende
zodra payloads worden geëxporteerd: 500 rijen met prompts kunnen tientallen megabytes beslaan, en insertAll
weigert aanvragen van meer dan 10 MB. Een deelbatch wordt afgesloten bij 500 rijen of 9 MB, afhankelijk van welke grens het eerst wordt bereikt.

---

## 5. OTLP/HTTP-bestemming voor traces

De configuratie gebruikt `type: "otlp-http"`. Dit is een geplande, cursorgestuurde export van opgeslagen
aanroeplogboeken, niet de best-effort-sink voor live routeringsgebeurtenissen in
`open-sse/services/routing/otel.ts`. Deze export leest of wijzigt de omgevingsvariabelen,
timers of buffers van die sink niet. Als beide worden ingeschakeld, kunnen er twee onafhankelijke soorten spans ontstaan;
gebruik de instrumentatiescope `omniroute.log-export` om deze spans uit aanroeplogboeken te onderscheiden.

| Sleutel                  | Standaard / doel                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `endpoint`               | Vereiste volledige HTTP(S)-URL voor traces; het achtervoegsel `/v1/traces` wordt niet toegevoegd |
| `headers`                | Optionele regels met `Name: value` of een JSON-object met tekenreeksen; versleuteld              |
| `requestHeaderAllowlist` | Leeg (uit); namen/voorvoegsels van clientheaders die als spanattributen worden vastgelegd        |
| `serviceName`            | `omniroute`; resource `service.name`                                                             |
| `langfuseMapping`        | `false`; voegt Langfuse-attributen voor generatie/sessie/gebruiker toe                           |
| `identity`               | `pseudonymous`, `keyName` of `none`                                                              |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                          |
| `timeoutMs`              | `30000` per HTTP-poging                                                                          |
| `environment`            | Niet ingesteld; optioneel `langfuse.environment`                                                 |

Het generieke dashboard geeft deze velden weer. `paths` accepteert een API-array of een tekstgebied
met exacte paden, gescheiden door nieuwe regels/komma's. Embeddings, rerank en andere paden worden
overgeslagen, tenzij ze expliciet zijn toegestaan. Overgeslagen rijen verplaatsen de cursor nog steeds; de bestaande
tellers `exported`/`exportedTotal` van de runner tellen verwerkte bronrijen, inclusief gefilterde
rijen, in plaats van geaccepteerde spans. Het filteren gebeurt in het onderliggende proces, zonder het
IPC-/cursorcontract te wijzigen.

URL-validatie gebruikt de helper `parseAndValidateNonMetadataUrl`, die geen database nodig heeft, uit
`src/shared/network/outboundUrlGuard.ts`: het beleid `block-metadata`. Deze heeft dezelfde
onvoorwaardelijke controles op metadata, protocollen en ingesloten inloggegevens als de webhookvalidator met
privé-URL's toegestaan, maar staat bewust localhost-/LAN-doelen toe zonder een globale
featureflag-override. Dit maakt zelfgehoste Langfuse-, Phoenix-, Tempo- en Collector-
endpoints mogelijk, inclusief privé-HTTP-endpoints. Cloudmetadatahosts worden altijd geblokkeerd.
Omleidingen worden niet gevolgd, zodat een collector inloggegevens niet naar een andere host kan omleiden.
Net als de bestaande lexicale URL-beveiliging zet dit de DNS-resolutie niet vast; configureer alleen
hosts die door de beheerder worden beheerd. Geef de voorkeur aan HTTPS wanneer het endpoint zich niet op een vertrouwd netwerk bevindt.

### Payload en aflevering

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) bevat één
CLIENT-span per toegestane rij, met het exacte aanvraagpad als naam. Naamgeving op basis van het pad onderscheidt
Chat Completions, Responses en Messages zonder model- of identiteitsgegevens in de
spannaam op te nemen. Resourceattributen omvatten `service.name` en de `service.version` van het pakket.

De normale logger voor chatpogingen (`open-sse/handlers/chatCore/attemptLogging.ts`) schrijft
`duration = Date.now() - startTime` bij voltooiing en levert geen tijdstempel aan;
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` stelt het tijdstempel standaard in op het schrijf-
(voltooiings)tijdstip. De export stelt daarom einde = tijdstempel van de rij en begin = einde − duur in
(milliseconden, omgezet naar decimale nanoseconden). Historische tijdstempels die door de aanroeper zijn aangeleverd,
blijven eveneens behouden als eindtijd; er is geen aanduiding per rij die onderscheid maakt tussen begin en voltooiing.
Een null-duur wordt nul. Ongeldige/ontbrekende tijdstempels laten de batch mislukken in plaats van
niet-deterministische spans te maken. `ttftMs` kan null zijn en wordt toegewezen aan `omniroute.ttft_ms`.

Attributen omvatten `gen_ai.operation.name="chat"`, provider, aangevraagd model/antwoordmodel,
invoer-/uitvoertokens, optionele tokens voor cachelezen/cacheaanmaak/redeneren, HTTP-status,
combo, cachebron, sessietag en correlatie-id. Gehele OTLP-waarden en tijdstempels
zijn decimale tekenreeksen; tekenreeksen, booleans en niet-gehele getallen gebruiken hun eigen OTLP-waardevarianten.
Foutspans hebben de status ERROR en een opgeschoond statusbericht. Het canonieke
record bevat geen upstream-host-URL, dus `server.address` wordt weggelaten in plaats van
de collector ten onrechte als modelserver aan te duiden. Kosten worden niet geëxporteerd.

Alleen `includeBodies=true` laadt de inhoud. Met `langfuseMapping=false`
bevatten `gen_ai.input.messages` / `gen_ai.output.messages` de opgeschoonde JSON van de aanvraag-/antwoordbody
zoals opgeslagen door OmniRoute (gecanonicaliseerd indien parseerbaar), niet een opnieuw vormgegeven semconv-
berichtenarray. Afgekapte/niet-JSON-body's blijven onbewerkte tekst. Met `langfuseMapping=true`
worden body's alleen uitgevoerd als `langfuse.observation.input` / `langfuse.observation.output`;
de attributen `gen_ai.*.messages` worden weggelaten, zodat elke body één keer wordt verzonden. Beide modi
erven `maxBodyBytes` van het bestaande laadpad;
`omniroute.bodies_truncated=true` markeert afkapping.
Deze bestemming voegt geen extra pipelinesnapshots of leesbewerkingen van niet-opgeschoonde artefacten toe;
het optioneel vastleggen van aanvraagheaders gebruikt de hieronder beschreven bestaande geladen clientsnapshot.
Gebruik bij het exporteren van body's een interval op minuutniveau, zoals `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
in plaats van elk uur een achterstand op te bouwen.

### Optionele aanvraagheaders van de client

Het vastleggen van headers staat **standaard uit**. Stel `requestHeaderAllowlist` in de bestemmingsconfiguratie in
en schakel **Prompts en antwoorden exporteren** in (`includeBodies: true` op de bestemming).
De lijst met toegestane headers accepteert een API-array of een tekstgebied met namen gescheiden door nieuwe regels/komma's:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Namen worden hoofdletterongevoelig en exact vergeleken, tenzij één afsluitende `*` een niet-leeg
voorvoegsel van een headernaam selecteert. Een losse `*`, ingebedde jokertekens en ongeldige HTTP-headernamen worden geweigerd.
Er zijn maximaal 64 selectors, elk met een naam/voorvoegsel van maximaal 256 ASCII-bytes.
Deze instelling staat los van `headers`, waarmee de exporter zich bij de collector authenticeert.

Bij het vastleggen wordt alleen `pipeline_client_request` gelezen, dat wordt gevuld vanuit `clientRawRequest`
(of het verouderde `clientRequest`) van de opgeslagen gedetailleerde pipeline. Er wordt nooit teruggevallen op requestheaders van de provider.
Gedetailleerde pipelinelogging moet ingeschakeld zijn geweest toen het verzoek werd vastgelegd. Als
`includeBodies` is uitgeschakeld, of als de JSON van de clientsnapshot ontbreekt, beschadigd of afgekapt is, worden er geen headerattributen
uitgevoerd. Het verhogen van `maxBodyBytes` kan voorkomen dat snapshots tijdens het exporteren worden afgekapt;
het kan geen details herstellen die nooit zijn opgeslagen. Een snapshot groter dan 1 MiB of met meer dan
256 headeritems wordt genegeerd. De bestaande export van prompts/antwoorden blijft ingeschakeld naast
het vastleggen van headers; de toestemmingslijst biedt geen hydratatiemodus voor uitsluitend headers.

Geselecteerde waarden worden OTLP-stringarrays onder `http.request.header.<full lowercase header name>`,
zelfs bij één enkele string. Zo wordt `X-OmniRoute-Meta-Team: example-team`
`http.request.header.x-omniroute-meta-team` met
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Het volledige voorvoegsel blijft behouden: dit zijn gewone headers, zonder parsing van bedrijfsvelden of
conversie naar `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` verandert de semantiek van headers
niet. Een geselecteerde `User-Agent` met één waarde stelt ook de standaard scalaire waarde
`user_agent.original` in. Komma's binnen één waarde worden niet gebruikt om de waarde op te splitsen. Hoofdlettervarianten worden samengevoegd in de volgorde van de opgeslagen
items; bij een ongeldige variant wordt die volledige header weggelaten. Attributen worden geordend op naam in kleine letters.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-sleutelheaders, namen die
auth/token/secret/password/credential-markeringen bevatten en interne gatewayreferenties worden altijd
uitgesloten, zelfs als ze geselecteerd zijn of gedeeltelijk gemaskeerd zijn opgeslagen. Voor bekende patronen van toegangsgegevens wordt
de gedeelde detector voor toegangsgegevens hergebruikt; maskeringsmarkeringen worden weggelaten en niet als veilige waarden geëxporteerd.
Alleen strings en niet-lege stringarrays worden geaccepteerd; getallen of objecten worden niet geconverteerd.
Ongeldige namen, prototypesleutels, besturingstekens (behalve horizontale tabs) en ongeldige Unicode
worden genegeerd zonder dat de batch mislukt of hun inhoud in fouten wordt weergegeven.

Elke span legt maximaal 32 headers vast, met 16 waarden per header, 4096 UTF-8-bytes per waarde
en in totaal 16384 UTF-8-bytes voor alle vastgelegde headernamen en -waarden. Te grote/ongeldige headers
worden volledig weggelaten, niet afgekapt. Selectie is een privacybeslissing van de beheerder: onschuldig ogende namen
kunnen nog steeds persoonsgegevens bevatten, en deze limieten/detectoren zijn geen algemeen hulpmiddel om persoonsgegevens te verwijderen.

### Leveringslimieten

Verzoeken zijn beperkt tot 500 spans en 4 MiB UTF-8-JSON, inclusief de envelop.
Elke toegestane span wordt op grootte gecontroleerd vóór het eerste verzoek van een cursorbatch. Als een afzonderlijke
span groter is dan de limiet, wordt geen enkel deel van die batch verzonden en treedt een fout op met het advies om
`maxBodyBytes` te verlagen; de span wordt niet stilzwijgend overgeslagen. De voorafgaande controle bewaart alleen recordverwijzingen en
byteaantallen en verwijdert elke tijdelijke span/JSON; spans worden opnieuw opgebouwd voor begrensde delen
in plaats van een tweede geserialiseerde kopie van de batch in het geheugen te houden. Bij HTTP 408/429/5xx, netwerkfouten en time-outs worden maximaal
drie pogingen gedaan, met exponentiële wachttijden van 250/500 ms. `Retry-After` in seconden of als HTTP-datum
kan een wachttijd verlengen tot maximaal 5 seconden. Andere statussen leiden direct tot een fout. Ook een gedeeltelijke afwijzing met OTLP 2xx veroorzaakt een fout in plaats van
een verloren span als ontvangen te bevestigen; lege bevestigingen of bevestigingen met geldige JSON worden geaccepteerd, met een
leeslimiet van 64 KiB voor het antwoord.

Fouten bevatten alleen gegevens van de exporter zelf: HTTP-status, herhaalclassificatie, aantal pogingen en aantal verzonden
spans, of vaste formuleringen voor bevestigings-/netwerkfouten. Antwoordbodies van de collector,
aantallen van gedeeltelijk geslaagde verwerkingen en antwoordheaders worden nooit overgenomen in fouten, logs of het
dashboard. Een mislukte of gedeeltelijk geaccepteerde batch wordt niet als ontvangen bevestigd: de bestemming toont
Mislukt met die status, de cursor blijft bij de laatst bevestigde batch en bij de volgende uitvoering
worden dezelfde rijen opnieuw verzonden. Permanente statussen blijven fouten veroorzaken totdat de collector of configuratie
is hersteld. Gebruik de eigen logs van de collector voor antwoorddetails. Foutsamenvattingen in het aanroeplogboek behouden
hun afzonderlijke maskering.
`prepare()` richt niets in; Test verstuurt exact `{"resourceSpans":[]}` via POST en rapporteert
de HTTP-status zonder spans van het aanroeplogboek te schrijven.

Trace-ID's en span-ID's zijn de eerste 32/16 hexadecimale cijfers van SHA-256 over
`"omniroute.trace\\0" + callLogId` en `"omniroute.span\\0" + callLogId`. Opnieuw verzonden spans hebben
identieke ID's. Dit garandeert geen deduplicatie: sommige backends, waaronder Langfuse
v4-ingestie, dedupliceren geen spans met dezelfde ID. Een crash of een fout in een deel van een batch kan ertoe leiden dat
hoogstens die ene onbevestigde cursorbatch opnieuw wordt verzonden; die hele batch kan worden gedupliceerd,
niet alleen het laatste HTTP-deel. Houd bij het kiezen van de cursorbatchgrootte rekening met deze afweging.

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

Maak de Authorization-waarde lokaal aan als Base64 van de letterlijke string `public-key:secret-key`
(bijvoorbeeld met `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Plak geen echte toegangsgegevens in logs, schermafbeeldingen of issues. De mapping stelt automatisch
`x-langfuse-ingestion-version: 4` in; Authorization wordt nog steeds aangeleverd via `headers`.
Zowel de headers als de gegenereerde identiteitssalt gebruiken het bestaande mechanisme voor versleutelde
geheime velden en API-placeholders; `STORAGE_ENCRYPTION_KEY` is vereist.

De mapping voegt het generatietype/-model, JSON-gebruiksdetails (invoer/uitvoer/totaal en beschikbare
cachesleutels), JSON-momentopnamen van invoer/uitvoer, het niveau ERROR/DEFAULT, een opgeschoond statusbericht,
de tracenaam, de sessie-id, een optionele omgeving en filterbare
`langfuse.observation.metadata.<key>` toe voor provider, aangevraagd model, pad, combinatie,
cachebron en status. `langfuse.observation.completion_start_time` is een ISO 8601-tijdstip op
start + TTFT, maar alleen wanneer TTFT bekend is en binnen de duur valt. Er worden geen kostenattributen verzonden.

Identiteitsmodi zijn van toepassing op `langfuse.user.id`:

- `pseudonymous` (standaard): HMAC-SHA256 van de interne id van de API-sleutel met een willekeurige
  salt van 32 bytes per bestemming. De salt wordt bij het aanmaken gegenereerd als deze ontbreekt, versleuteld
  als `identitySalt`, nooit geretourneerd en bij bewerkingen behouden. Ruwe sleutel-id's worden nooit
  in spanattributen opgenomen. Het opnieuw aanmaken/roteren van de salt van een bestemming verandert de identiteiten.
- `keyName`: de geconfigureerde API-sleutelnaam, waarmee dat door de beheerder ingestelde label bewust wordt onthuld.
- `none`: geen gebruikers-id. Sessietags worden nog steeds geëxporteerd wanneer ze aanwezig zijn; deze modi
  anonimiseren geen willekeurige promptinhoud of door de beheerder opgegeven sessie-/correlatielabels.

### Starten zonder historische gegevens aan te vullen

Schakel alleen bij het aanmaken **Start vanaf de huidige positie (bestaande logs overslaan)** in of geef
`startFromCurrentPosition: true` mee op het hoogste niveau van de payload voor de aanmaak-API. Dit initialiseert
`cursor_row_id` op de huidige maximale rowid van de bewaarde aanroeplogs met behulp van de bestaande
cursorhulpfuncties, zonder migratie. De standaardwaarde is false (cursor 0 en aanvulling vanuit de bewaarde historie).
Dit is geen instelling om de cursor bij een update opnieuw in te stellen.

De gedeelde toevoeging van `ttftMs` voegt ook een nullable kolom `ttft_ms` toe aan de BigQuery-mapper
en het schema voor nieuwe tabellen: de schematest vereist dat elk canoniek recordveld een
kolom heeft. Bestaande tabellen blijven ongewijzigd exporteren: `prepare()` leest het tabelschema en
laat alleen `ttft_ms` weg wanneer die kolom ontbreekt. Voeg de nullable INT64-kolom toe om TTFT
bij de volgende uitvoering te krijgen, of gebruik een nieuwe tabel. Er zijn geen PATCH, automatische schemawijziging of aanvullende
machtigingen vereist; voor alle andere rijvelden blijft strikte schemacontrole gelden.

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

## 7. Gebruik en beheer

- **Dashboard**: Integraties → Logexport. Voeg een bestemming toe, voer **Test** uit om de inloggegevens te controleren
  zonder rijen te schrijven en schakel de bestemming vervolgens in.
- **Achterstand**: elke bestemmingskaart toont de wachtende rijen en de cursor; `GET
/api/log-export/status` retourneert dezelfde cijfers plus de laatste 20 jobuitvoeringen.
- **Een falende bestemming laat de andere niet mislukken** — de uitvoeringssamenvatting registreert de status
  per bestemming in `last_status` / `last_error`, en de uitvoeringsgeschiedenis van de job bewaart het totaaloverzicht.
- **Als je een bestemming verwijdert, wordt ook de cursor ervan verwijderd.** Als je deze opnieuw toevoegt, begint de export bij het oudste bewaarde
  aanroeplogboek, waardoor rijen opnieuw worden verzonden die de bestemming mogelijk al bevat. Bij BigQuery
  vangt de `insertId` per rij dit alleen op binnen het eigen deduplicatievenster van BigQuery. Schakel
  een bestemming daarom liever uit dan deze te verwijderen.
