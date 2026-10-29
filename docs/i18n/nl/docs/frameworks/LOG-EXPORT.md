# Log export (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Continue, incrementeel exporteren van OmniRoute-aanroeplogboeken naar een externe analyticsopslag.

Het tabblad Logs van het dashboard bewaart de aanvraaggeschiedenis in SQLite (`call_logs`), die wordt begrensd door rotatie en retentie. Logexport verzendt dezelfde recordset volgens een schema, zodat deze langer kan worden bewaard dan in de lokale database en kan worden gecombineerd met andere gegevens. BigQuery is de eerste bestemming; de pipeline is een register, zodat meer bestemmingen eenvoudig kunnen worden toegevoegd.

---

## 1. Hoe het werkt

```
server (configuratie ontsleutelen + valideren, cursor afstemmen)
  → IPC starten → geïsoleerd exportChild-OS-proces
    → alleen-lezen storage.sqlite → gedeelde query/toewijzing voor aanroeplogboeken
      → asynchrone hydratatie van artefacten → bestemming prepare()/send()
        → batch-IPC → server slaat cursor op → ack-IPC
          → volgende batch; done-IPC → server registreert succes
```

- **Planning** — één `JobRegistry`-crontaak, `log_export`, standaard ingesteld op `0 * * * *` (elk uur,
  UTC). Geregistreerd in `src/lib/initCloudSync.ts`; kan worden overschreven met `OMNIROUTE_LOG_EXPORT_CRON`.
  Bij elke uitvoering worden alle **ingeschakelde** bestemmingen achtereenvolgens verwerkt.
- **Cursor** — de impliciete `call_logs.rowid` van SQLite, per bestemming opgeslagen in
  `log_export_destinations.cursor_row_id`. `timestamp` wordt bewust niet als cursor gebruikt: aanroepers
  kunnen hun eigen waarde opgeven, waardoor een trage aanvraag kan worden opgeslagen na een snellere
  aanvraag die later is gestart, en een tijdstempelcursor deze zou overslaan.
- **Batchverwerking** — `batch_size` rijen per aanvraag (standaard 500), `max_rows_per_run` rijen per uitvoering
  (standaard 10000), zodat een grote achterstand over meerdere uitvoeringen wordt verwerkt in plaats van één
  uitvoering te blokkeren.
- **Levering** — de cursor gaat pas verder nadat `send()` is afgerond. Bij een mislukte batch blijft de
  cursor staan, zodat dezelfde rijen tijdens de volgende uitvoering opnieuw worden geprobeerd. De garantie is
  ten minste één levering plus ontdubbeling aan de bestemmingszijde, niet echt exact één levering: BigQuery geeft elke
  rij een sleutel op basis van de aanroeplogboek-id, die binnen het eigen ontdubbelingsvenster op basis van beste inspanning wordt gerespecteerd.
- **Beveiliging tegen overlap** — de cronuitvoering en `POST .../run` kunnen gelijktijdig worden geactiveerd. Een bestemming
  die al wordt verwerkt, wordt overgeslagen in plaats van tweemaal verwerkt (`skipped: true` in het uitvoeringsresultaat),
  zodat een gelijktijdige uitvoering geen batch opnieuw kan verzenden of de cursor kan terugzetten.
- **Herstel na opschonen** — als `cursor_row_id` boven `MAX(rowid)` komt te liggen (de volledige tabel is
  opgeschoond en de rowids zijn opnieuw begonnen), zet de runner de cursor terug naar 0 in plaats van permanent geen gegevens meer te zien.

### Geïsoleerde runner en limieten

Elke bestemmingsuitvoering op Node start een afzonderlijk, kortlevend onderliggend OS-proces (`child_process`
met IPC, niet `worker_threads`). Het lezen van bodies, het parseren/serialiseren van payload-JSON, de
`prepare()`-bewerking van de bestemming en netwerk-I/O voor de bestemming worden allemaal daar uitgevoerd, niet in de eventlus van de server.
Alleen configuratie en kleine voortgangsberichten worden via IPC verstuurd; geëxporteerde records keren nooit terug naar
de server. De crontaak en de route Nu uitvoeren behouden hetzelfde openbare resultaat en dezelfde beveiliging tegen overlap.

Het onderliggende proces opent de opgeloste `DATA_DIR/storage.sqlite` van de server als alleen-lezen met `node:sqlite`,
met `busy_timeout=5000` en `query_only=ON`. Het importeert geen DB-singleton en voert geen
migraties, back-ups of SQLite-updates uit. Boekhouding voor ontbrekende/beschadigde artefacten (waaronder de
UPDATE voor beschadigde artefacten) blijft uitsluitend in het detailpad van het dashboard. Beide paden delen een zuivere
detailresolver; de export gebruikt asynchrone bestandssysteemlezingen en dezelfde oplossingsvolgorde:
artefact → verouderd inline → verouderd op schijf → geen. Een uitvoering maakt een momentopname van de maximale ingevoegde rowid
wanneer het onderliggende proces de reader opent; latere invoegingen wachten tot de volgende uitvoering. Dit is een invoeggrens,
geen langlopende SQLite-transactie: WAL-writers en checkpoints blijven vrij tijdens
netwerkwachttijden. Updates/verwijderingen van bestaande rijen worden niet door deze grens bevroren.

Na elke geaccepteerde batch wacht het onderliggende proces op een bevestiging. De server slaat eerst
de cursor op met `advanceLogExportCursor` en verzendt vervolgens `ack`; er wordt geen volgende batch gestart voordat dit is gebeurd.
Een verzendfout, crash of time-out registreert een fout zonder de cursor voor die batch te verplaatsen. Eerder
bevestigde batches blijven vastgelegd; maximaal de ene onbevestigde batch kan opnieuw worden verzonden.
Succes wordt pas geregistreerd na `done` en een correcte afsluiting van het onderliggende proces. Bij fouten wordt het onderliggende proces
beëindigd met SIGTERM, waarna na 500 ms wordt opgeschaald naar SIGKILL, en de runner wacht totdat het proces is afgesloten.

| Omgevingsvariabele                            | Standaard | Doel                                              |
| --------------------------------------------- | --------- | ------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000    | Totale tijdslimiet per bestemming                 |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024      | V8-old-space-limiet van onderliggend proces in MB |

Bij ongeldige/niet-positieve/niet-gehele waarden worden de standaardwaarden gebruikt. De heapinstelling is geen totale
RSS-limiet; zeer grote batches kunnen nog steeds het geheugen van het onderliggende proces uitputten en de uitvoering veilig laten mislukken.
De standaardwaarde van 1024 MB laat ruimte over voor de standaardbatch van 500 rijen met artefacten van 512 KiB en
ingeschakelde bodies, inclusief de bytegewijs in stukken opgesplitste JSON-serialisatie van BigQuery. Dit maakt een
batch van 10000 rijen met bodies niet veilig. Uitputting van de V8-heap registreert een fout met een duidelijke handelingsoptie: verlaag de batchgrootte
of verhoog `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; de cursor blijft bij de laatst
bevestigde batch staan. Historische inline-/schijfbodies vallen niet onder de moderne artefactlimiet.
Beheerders moeten RSS afzonderlijk begroten, vooral binnen containers met geheugenlimieten.

Het onderliggende proces erft alleen de opgeloste `DATA_DIR`, `NODE_ENV`, expliciete `TZ` (oplossing van lokale tijd
voor verouderde bestandsnamen), `ELECTRON_RUN_AS_NODE` indien aanwezig, en de volgende invoer voor uitgaande verbindingen:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (en hun varianten in kleine letters),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Een globale Undici-dispatcher deelt de zuivere proxyresolutie op basis van omgevingsvariabelen en de regels van de server
voor het omzeilen van lokale hosts, waaronder `NO_PROXY`; deze importeert `proxyFetch.ts` of de bijbehorende DB-/functievlaggen niet.
Proxyreferenties worden uit doorgestuurde uitvoer en geregistreerde fouten verwijderd. Bestemmingsreferenties
worden alleen in één IPC-startbericht verstuurd, nooit via argv of de omgeving; het doorsturen van uitvoer/fouten krijgt
een voorvoegsel en wordt opgeschoond. Alleen `ExperimentalWarning` wordt uitgeschakeld in de uitvoeringsargumenten van het onderliggende proces om te voorkomen
dat de SQLite-waarschuwing van Node bij elke cronuitvoering wordt herhaald; andere waarschuwingstypen blijven zichtbaar.

Bestemmingsmodules moeten importeerbaar zijn zonder afhankelijkheden van Next.js of server-only-afhankelijkheden. De bestaande
BigQuery-implementatie voldoet al aan dat contract. Toegangstokencaches blijven alleen bestaan tijdens de uitvoering van het onderliggende
proces, niet tussen uitvoeringen. Node is de ondersteunde runtime (`package.json` engines), maar de Bun-installatiesectie in de README
en `Dockerfile.bun` bieden ook een productiecompatibiliteitspad met
`bun:sqlite` (`src/lib/db/core.ts` / adapters). Onder Bun behouden exports daarom het eerdere
in-process-pad en wordt een eenmalige waarschuwing weergegeven: isolatie van de heap en time-out van onderliggende processen is niet beschikbaar. Gebruik
Node voor isolatie van de eventloop en OOM-fouten; Bun wordt hier niet als uitsluitend voor ontwikkeling beschouwd.

Wanneer `includeBodies` is ingeschakeld, heeft een interval van enkele minuten de voorkeur, zoals
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, in plaats van elk uur een achterstand aan payloads op te bouwen.
Batch- en rijlimieten begrenzen nog steeds elke uitvoering. Het opstarten van een proces gebeurt per bestemming en per uitvoering;
hiermee worden geringe opstartkosten ingeruild voor isolatie van de servereventloop, niet voor een lager totaal CPU-gebruik.

### Payloads (prompts en voltooiingen)

Standaard bevat de export alleen de samenvattingsvelden die in de **lijst** van Logs worden weergegeven. Als
**Prompts en antwoorden exporteren** (`includeBodies`) wordt ingeschakeld, wordt ook geëxporteerd wat het **detailvenster**
van Logs voor elke aanroep toont:

| Veld                             | Wat het bevat                                                          |
| -------------------------------- | ---------------------------------------------------------------------- |
| `request_body` / `response_body` | De payloads van de aanroep zoals het dashboard ze weergeeft            |
| `pipeline_route_decision`        | Welk doel en model de router heeft gekozen                             |
| `pipeline_client_request`        | Het onbewerkte verzoek, precies zoals de client het verzond            |
| `pipeline_openai_request`        | Na omzetting naar de interne OpenAI-structuur                          |
| `pipeline_provider_request`      | Zoals daadwerkelijk upstream verzonden, in het dialect van de provider |
| `pipeline_provider_response`     | Het onbewerkte upstreamantwoord                                        |
| `pipeline_client_response`       | Wat aan de aanroeper is teruggegeven                                   |
| `pipeline_error`                 | Foutdetails op pijplijnniveau voor een mislukte aanroep                |
| `bodies_truncated`               | Waar als een van de bovenstaande velden `maxBodyBytes` heeft bereikt   |

Dit is promptinhoud, dus deze optie is **standaard uitgeschakeld** en is bewust per bestemming instelbaar.
Wat wordt geëxporteerd, is wat het dashboard toont, omdat de export en `getCallLogById` dezelfde
detailresolutie gebruiken: payloads worden
al van PII ontdaan en geheimen worden al geredigeerd wanneer ze worden opgeslagen. Voor een aanroep met een
`noLog`-API-sleutel wordt helemaal geen payload opgeslagen, dus valt er niets te exporteren.

Payloads worden per rij uit het bestandssysteemartefact gelezen, zodat verrijking alleen wordt uitgevoerd voor bestemmingen
die daarom hebben gevraagd. Bij een ontbrekend of beschadigd artefact wordt de samenvatting met null-payloads geëxporteerd,
in plaats van dat de batch mislukt en de cursor vastloopt.

`maxBodyBytes` (standaard 262144) begrenst elk veld. Langere payloads worden **afgekapt in plaats van
verwijderd** — een afgekorte prompt beantwoordt nog steeds de vraag „wat werd er gevraagd?” — en de rij wordt gemarkeerd met
`bodies_truncated`. Delta's die tijdens het streamen stukje voor stukje worden ontvangen, worden niet geëxporteerd; het samengestelde antwoord staat
al in `pipeline_provider_response` en `pipeline_client_response`.

---

## 2. Bestanden

| Onderdeel                 | Locatie                                      |
| ------------------------- | -------------------------------------------- |
| Bestemmingscontract       | `src/lib/logExport/types.ts`                 |
| Register                  | `src/lib/logExport/registry.ts`              |
| Geheimenbeheer            | `src/lib/logExport/secrets.ts`               |
| Runner (bovenliggend IPC) | `src/lib/logExport/runner.ts`                |
| Proceslevenscyclus        | `src/lib/logExport/childRunner.ts`           |
| Onderliggend toegangspunt | `src/lib/logExport/exportChild.ts`           |
| Alleen-lezen-opener       | `src/lib/db/logExportReadOnly.ts`            |
| Gedeelde query/mapping    | `src/lib/usage/callLogExportQueries.ts`      |
| Detailresolver            | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projectie             | `src/lib/logExport/presenter.ts`             |
| BigQuery-bestemming       | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-authenticatie   | `src/lib/logExport/googleServiceAccount.ts`  |
| Aanroeplogbron            | `src/lib/usage/callLogExportSource.ts`       |
| Persistentie              | `src/lib/db/logExportDestinations.ts`        |
| Cron-taak                 | `src/lib/jobs/logExportJob.ts`               |
| REST-laag                 | `src/app/api/log-export/`                    |
| Dashboardpagina           | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle routes zijn beveiligd met beheerauthenticatie (`requireManagementAuth`). Geheimen worden nooit geretourneerd:
een opgeslagen geheim wordt teruggegeven als de letterlijke waarde `__stored__`, en als die waarde bij een update
wordt teruggestuurd, blijft de opgeslagen referentie behouden.

Voor het aanmaken of bijwerken van een doel waarvan het type een geheim declareert, is
**`STORAGE_ENCRYPTION_KEY` vereist**. Zonder deze sleutel voert `encrypt()` stilzwijgend niets uit, waardoor de
schrijfbewerking met een 400 wordt geweigerd in plaats van een referentie als platte tekst in SQLite op te slaan
(dezelfde beveiliging die de Telegram-webhook toepast).

| Methode  | Pad                                      | Doel                                                    |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Doeltypen + hun lijst met configuratievelden            |
| `GET`    | `/api/log-export/destinations`           | Doelen weergeven (geheimen geredigeerd)                 |
| `POST`   | `/api/log-export/destinations`           | Een doel aanmaken                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Eén doel lezen                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | Naam / ingeschakeld / configuratie / batching bijwerken |
| `DELETE` | `/api/log-export/destinations/{id}`      | Verwijderen                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Referenties testen, niets schrijven                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Nu leegmaken, hetzelfde pad als de geplande uitvoering  |
| `GET`    | `/api/log-export/status`                 | Cron-status, recente uitvoeringen, achterstand per doel |

`GET /api/log-export/types` maakt de gebruikersinterface generiek: het dashboardformulier wordt opgebouwd uit
de geretourneerde veldbeschrijvingen, zodat voor een nieuw doel geen wijziging aan de gebruikersinterface nodig is.

---

## 4. BigQuery-doel

Configuratiesleutels (`type: "bigquery"`):

| Sleutel              | Opmerkingen                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `projectId`          | GCP-project dat de dataset bevat                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                            |
| `location`           | Alleen gebruikt wanneer de dataset moet worden aangemaakt (standaard `EU`) |
| `serviceAccountJson` | Serviceaccountsleutel. Geheim: versleuteld opgeslagen, nooit geretourneerd |
| `autoCreate`         | De dataset en tabel bij de eerste export aanmaken (standaard `true`)       |

Het serviceaccount heeft `bigquery.tables.updateData` nodig voor de doeltabel, plus
`bigquery.datasets.create` / `bigquery.tables.create` wanneer `autoCreate` is ingeschakeld.

Een geconfigureerde batch is een **cursor**-eenheid, geen HTTP-eenheid: `send()` splitst deze op in `insertAll`-
aanroepen van maximaal 500 rijen, zodat een grote `batch_size` de BigQuery-limiet van 10 MB per verzoek niet kan
overschrijden. Tijdelijke statussen (408/429/500/502/503/504) worden maximaal drie keer opnieuw geprobeerd met
exponentiële back-off, waarbij dezelfde insertIds opnieuw worden gebruikt; authenticatie- en schemafouten
genereren bij de eerste poging een fout in plaats van de uitvoering te verspillen.

Een tabel die enkele ogenblikken geleden is aangemaakt, is nog niet zichtbaar voor het streaming-eindpunt, dat
gedurende enkele seconden met 404 antwoordt. Die 404 wordt opnieuw geprobeerd, maar **alleen wanneer deze
uitvoering de tabel heeft aangemaakt** — een werkelijk ontbrekende tabel faalt nog steeds onmiddellijk. Houd er
rekening mee dat BigQuery streaming-invoegingen enkele minuten weigert als een tabel opnieuw wordt aangemaakt
onder een naam die onlangs is verwijderd; dit is inherent aan verwijderen en vervolgens opnieuw aanmaken, dus
gebruik bij voorkeur een nieuwe tabelnaam in plaats van een tabel te verwijderen en opnieuw toe te voegen.

**Een gedeeltelijke fout wordt geretourneerd als HTTP 200 met een niet-lege `insertErrors[]`.** Dit wordt als
een fout behandeld en genereert een uitzondering, waardoor wordt voorkomen dat de cursor voorbij rijen gaat die
BigQuery nooit heeft geaccepteerd; `tests/unit/log-export-bigquery.test.ts` legt dit gedrag vast.

Het transport verloopt via gewone REST — een zelfondertekende RS256-assertie wordt bij
`https://oauth2.googleapis.com/token` ingewisseld voor een toegangstoken, waarna de rijen naar
`tabledata.insertAll` worden verzonden. Er wordt geen Google SDK toegevoegd. Toegangstokens worden tijdens het
proces gecachet per combinatie van serviceaccount en scope.

De aangemaakte tabel bevat één kolom per veld van het tabblad Logs plus `exported_at`, en is ingericht op de
manier waarop aanroeplogboeken daadwerkelijk worden opgevraagd:

- **Per dag gepartitioneerd op `timestamp`**, zodat een op datum begrensde query alleen die dagen scant.
- **Geclusterd op `api_key_name`, `provider`, `model`, `status`** (in die volgorde), zodat filteren op
  wie de uitvoering startte, waar deze naartoe ging of of deze mislukte, blokken binnen elke partitie uitsluit.
  BigQuery staat maximaal vier clusterkolommen toe en de volgorde is belangrijk: een filter op alleen
  `api_key_name` sluit blokken uit, terwijl een filter op alleen `status` dat niet doet.
- **Optionele bewaartermijn voor partities** via `partitionExpirationDays` (0 bewaart alles), toegepast
  wanneer de tabel wordt aangemaakt.

Beide instellingen worden toegepast op het moment van aanmaken. Een bestaande tabel behoudt de bestaande indeling, dus
laat de bestemming naar een nieuwe tabel-id verwijzen als u deze instellingen wilt gebruiken.

`tests/unit/log-export-bigquery.test.ts` controleert of de mapper en het tabelschema synchroon blijven,
zodat een nieuwe kolom in het aanroeplogboek niet ongemerkt kan wegvallen tijdens de export.

Batches worden opgesplitst op basis van **zowel** het aantal rijen als het aantal geserialiseerde bytes. Alleen het aantal rijen is niet voldoende
wanneer payloads worden geëxporteerd: 500 rijen met prompts kunnen tientallen megabytes groot zijn, en insertAll
weigert een aanvraag van meer dan 10 MB. Chunks worden afgesloten bij 500 rijen of 9 MB, afhankelijk van welke limiet het eerst wordt bereikt.

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
`"omniroute.trace\0" + callLogId` en `"omniroute.span\0" + callLogId`. Opnieuw verzonden spans hebben
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

1. Maak `src/lib/logExport/destinations/<name>.ts` aan die een `LogExportDestinationType` exporteert:
   een Zod-`configSchema`, een `fields`-descriptorarray voor de UI, `secretFields` en een
   `createClient(config)` die `test()` / `prepare()` / `send(records)` retourneert.
2. Voeg deze toe aan de `DESTINATIONS`-array in `src/lib/logExport/registry.ts`.
3. Schrijf tests onder `tests/unit/`.

Dat is de volledige wijziging: persistentie, de cron-taak, de REST-laag, versleuteling van geheimen en het
dashboardformulier lezen allemaal het register.

Twee regels voor een nieuwe bestemming:

- `send()` **moet een fout genereren** bij een gedeeltelijke mislukking. Als de functie succesvol wordt afgehandeld, betekent dit: "de bestemming bevat deze rijen",
  en de cursor wordt er permanent voorbij verplaatst.
- Een bestemming die een door de gebruiker opgegeven URL accepteert, moet deze vóór het ophalen valideren met
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  op dezelfde manier als webhooks. Voor BigQuery is dit niet nodig: de hosts zijn constanten.

---

## 7. Beheer

- **Dashboard**: Integraties → Logboekexport. Voeg een bestemming toe, voer **Testen** uit om de referenties te controleren
  zonder rijen te schrijven en schakel de bestemming vervolgens in.
- **Achterstand**: elke bestemmingskaart toont de wachtende rijen en de cursor; `GET
/api/log-export/status` retourneert dezelfde cijfers, plus de laatste 20 taakuitvoeringen.
- **Een falende bestemming laat de andere niet falen** — het uitvoeringsoverzicht registreert de status per bestemming
  in `last_status` / `last_error`, en de taakuitvoeringsgeschiedenis bewaart het totaaloverzicht.
- **Als een bestemming wordt verwijderd, wordt ook de cursor verwijderd.** Als u de bestemming opnieuw toevoegt, wordt begonnen bij het oudste bewaarde
  oproeplogboek, waardoor rijen die de bestemming mogelijk al bevat opnieuw worden verzonden. In BigQuery voorkomt de `insertId` per rij dit alleen
  binnen het eigen deduplicatievenster van BigQuery. Schakel een bestemming daarom bij voorkeur uit in plaats van deze te verwijderen.
