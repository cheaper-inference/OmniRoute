# Log export (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Løbende, inkrementel eksport af OmniRoute-kaldslogfiler til et eksternt analyselager.

Fanen Logs i dashboardet gemmer anmodningshistorik i SQLite (`call_logs`), som begrænses af
rotation og opbevaringsperiode. Logeksport sender det samme sæt poster ud efter en tidsplan, så det kan bevares længere end
den lokale database og sammenkøres med andre data. BigQuery er den første destination;
pipelinen er registerbaseret, så flere destinationer kan tilføjes.

---

## 1. Sådan fungerer det

```
server (dekryptér + validér konfiguration, afstem markør)
  → start IPC → isoleret exportChild OS-proces
    → skrivebeskyttet storage.sqlite → fælles kaldslogforespørgsel/-mapping
      → asynkron indlæsning af artefakter → destination prepare()/send()
        → batch-IPC → server gemmer markør → ack-IPC
          → næste batch; done-IPC → server registrerer succes
```

- **Tidsplan** — ét `JobRegistry`-cronjob, `log_export`, med standardværdien `0 * * * *` (hver time,
  UTC). Registreret i `src/lib/initCloudSync.ts`; kan tilsidesættes med `OMNIROUTE_LOG_EXPORT_CRON`.
  Ved hver aktivering behandles alle **aktiverede** destinationer sekventielt.
- **Markør** — SQLites implicitte `call_logs.rowid`, gemt pr. destination i
  `log_export_destinations.cursor_row_id`. `timestamp` bruges bevidst ikke som markør: kaldere
  kan angive deres egen værdi, så en langsom anmodning kan blive skrevet efter en hurtigere, der startede
  senere, og en tidsstempelmarkør ville springe den over.
- **Batchopdeling** — `batch_size` rækker pr. anmodning (standard 500), `max_rows_per_run` rækker pr. kørsel
  (standard 10000), så et stort efterslæb behandles over flere aktiveringer i stedet for at blokere én.
- **Levering** — markøren flyttes først frem, når `send()` er fuldført. En mislykket batch efterlader
  markøren, hvor den var, så de samme rækker forsøges igen ved næste kørsel. Garantien er
  mindst én gang plus deduplikering på destinationssiden, ikke ægte præcis én gang: BigQuery bruger
  kaldslog-id'et som nøgle for hver række og respekterer dette efter bedste evne inden for sit eget deduplikeringsvindue.
- **Beskyttelse mod overlap** — cronaktiveringen og `POST .../run` kan udløses samtidig. En destination,
  der allerede behandles, springes over i stedet for at blive behandlet to gange (`skipped: true` i kørselsresultatet),
  så en samtidig kørsel ikke kan gensende en batch eller flytte markøren baglæns.
- **Gendannelse efter tømning** — hvis `cursor_row_id` ender over `MAX(rowid)` (hele tabellen blev
  tømt, og række-id'er startede forfra), nulstiller kørselskomponenten til 0 i stedet for permanent at overse nye poster.

### Isoleret kørselskomponent og grænser

Hver destinationskørsel på Node starter en separat, kortlivet underproces på operativsystemniveau (`child_process`
med IPC, ikke `worker_threads`). Læsning af body-indhold, JSON-parsing/-serialisering af nyttelast, destinationens
`prepare()` og destinationens netværks-I/O foregår alle dér, ikke i serverens hændelsesløkke.
Kun konfiguration og små statusmeddelelser overføres via IPC; eksporterede poster returneres aldrig til
serveren. Cronjobbet og ruten Kør nu bevarer det samme offentlige resultat og den samme beskyttelse mod overlap.

Underprocessen åbner serverens opløste `DATA_DIR/storage.sqlite` skrivebeskyttet med `node:sqlite`,
med `busy_timeout=5000` og `query_only=ON`. Den importerer ingen databasesingleton og udfører ingen
migreringer, sikkerhedskopieringer eller SQLite-opdateringer. Registrering af manglende/beskadigede artefakter (herunder
UPDATE for beskadigede artefakter) forbliver udelukkende i dashboardets detaljeforløb. Begge forløb deler en ren
detaljeresolver; eksport bruger asynkrone filsystemlæsninger og den samme opløsningsrækkefølge: artefakt → ældre
inline-data → ældre diskdata → ingen. En kørsel tager et øjebliksbillede af det højeste indsættelses-rowid,
når underprocessen åbner sin læser; senere indsættelser venter til næste kørsel. Dette er en indsættelsesgrænse,
ikke en langvarig SQLite-transaktion: WAL-skrivere og checkpoints kan fortsat arbejde frit under
netværksventetider. Opdateringer/sletninger af eksisterende rækker fastfryses ikke af denne grænse.

Efter hver accepteret batch venter underprocessen på en kvittering. Serveren gemmer først
markøren med `advanceLogExportCursor` og sender derefter `ack`; ingen næste batch starter før dette.
En afsendelsesfejl, et nedbrud eller en timeout registrerer en fejl uden at flytte markøren frem for den pågældende batch. Tidligere
kvitterede batches forbliver gemt; højst den ene batch, der ikke er kvitteret for, kan blive gensendt.
Succes registreres først efter `done` og en fejlfri afslutning af underprocessen. Ved fejl afsluttes underprocessen
med SIGTERM, som eskaleres til SIGKILL efter 500 ms, og kørselskomponenten venter på, at processen lukkes.

| Miljøvariabel                                 | Standard | Formål                                   |
| --------------------------------------------- | -------- | ---------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Grænse for forløbet tid pr. destination  |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Underprocessens V8-old-space-grænse i MB |

Ugyldige/ikke-positive/ikke-heltallige værdier bruger standardværdierne. Heap-indstillingen er ikke en samlet
RSS-grænse; meget store batches kan stadig opbruge underprocessens hukommelse og få kørslen til at fejle sikkert.
Standardværdien på 1024 MB giver spillerum til standardbatchen på 500 rækker med artefakter på 512 KiB med
body-indhold aktiveret, inklusive BigQuerys JSON-serialisering i byteopdelte blokke. Den gør ikke en
batch på 10000 rækker med body-indhold sikker. Opbrug af V8-heap registrerer en fejl med en konkret afhjælpning: sænk batchstørrelsen,
eller hæv `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; markøren forbliver ved den senest
kvitterede batch. Historisk inline-/diskbaseret body-indhold er ikke omfattet af den moderne artefaktgrænse.
Operatører skal budgettere RSS separat, især i containere med begrænset hukommelse.

Underprocessen arver kun den fastlagte `DATA_DIR`, `NODE_ENV`, eksplicit `TZ` (lokal
tidsfortolkning for ældre filnavne), `ELECTRON_RUN_AS_NODE`, når den er angivet, og følgende input til udgående forbindelser:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (og deres former med små bogstaver),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
En global Undici-dispatcher deler serverens rene miljøbaserede proxyfortolkning og regler for at
omgå proxyen for lokale værter, herunder `NO_PROXY`; den importerer ikke `proxyFetch.ts` eller dens database-/funktionsflag.
Proxy-legitimationsoplysninger sløres i videresendt output og registrerede fejl. Destinationens legitimationsoplysninger
sendes kun i én IPC-startmeddelelse, aldrig via argv eller miljøet; videresendt output og fejl
forsynes med præfiks og renses. Kun `ExperimentalWarning` deaktiveres i underprocessens eksekveringsargumenter for at undgå
at gentage Nodes SQLite-advarsel ved hver cron-kørsel; andre advarselstyper forbliver synlige.

Destinationsmoduler skal kunne importeres uden afhængigheder til Next.js eller server-only. Den eksisterende
BigQuery-implementering opfylder allerede denne kontrakt. Cachelagre til adgangstokens varer kun under underprocessens
kørsel, ikke på tværs af kørsler. Node er det understøttede kørselsmiljø (`package.json` engines), men README'ens afsnit om Bun-
installation og `Dockerfile.bun` beskriver også en kompatibilitetsmulighed til produktion med
`bun:sqlite` (`src/lib/db/core.ts` / adaptere). Under Bun bevarer eksporter derfor den tidligere
udførelse i samme proces og udsender en engangsadvarsel: isolering af underprocessens heap og timeout er ikke tilgængelig. Brug
Node til isolering af event-loop og OOM; Bun behandles ikke som udelukkende beregnet til udvikling her.

Når `includeBodies` er aktiveret, bør du foretrække et interval på minutniveau såsom
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` frem for at ophobe en times nyttelast.
Batch- og rækkegrænser begrænser stadig hver kørsel. Procesopstart sker pr. destination pr. kørsel;
dette bytter en lille opstartsomkostning for isolering af serverens event-loop, ikke et reduceret samlet CPU-forbrug.

### Nyttelaster (prompter og svar)

Som standard indeholder eksporten kun de oversigtsfelter, der vises i loggenes **liste**. Aktivering af
**Eksportér prompter og svar** (`includeBodies`) medtager desuden det, som loggenes **detaljerude**
viser for hvert kald:

| Felt                             | Indhold                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| `request_body` / `response_body` | Kaldets nyttelaster, som dashboardet gengiver dem              |
| `pipeline_route_decision`        | Hvilket mål og hvilken model routeren valgte                   |
| `pipeline_client_request`        | Den rå anmodning, præcis som klienten sendte den               |
| `pipeline_openai_request`        | Efter oversættelse til det interne OpenAI-format               |
| `pipeline_provider_request`      | Som den faktisk blev sendt til udbyderen, i udbyderens dialekt |
| `pipeline_provider_response`     | Det rå svar fra udbyderen                                      |
| `pipeline_client_response`       | Det, der blev returneret til den kaldende part                 |
| `pipeline_error`                 | Fejldetaljer på pipeline-niveau for et mislykket kald          |
| `bodies_truncated`               | Sand, når et af felterne ovenfor nåede `maxBodyBytes`          |

Dette er promptindhold, så det er **deaktiveret som standard** og bevidst et valg pr. destination.
Det, der eksporteres, er det, dashboardet viser, fordi eksport og `getCallLogById` deler
detaljeopløsning: nyttelaster er
allerede renset for personhenførbare oplysninger og hemmeligheder, når de skrives, og et kald foretaget med en
`noLog`-API-nøgle gemmer slet ingen nyttelast, så der er intet at eksportere.

Nyttelaster læses pr. række fra filsystemartefakten, så indlæsning kun udføres for destinationer,
der har anmodet om det. En manglende eller beskadiget artefakt eksporterer sin oversigt med null-nyttelaster i stedet
for at få batchen til at fejle og efterlade markøren fastlåst.

`maxBodyBytes` (standard 262144) sætter en grænse for hvert felt. Længere nyttelaster **afkortes frem for at blive
udeladt** — en afkortet prompt besvarer stadig "hvad blev der spurgt om" — og rækken markeres med
`bodies_truncated`. Streamede ændringer blok for blok eksporteres ikke; det samlede svar findes
allerede i `pipeline_provider_response` og `pipeline_client_response`.

---

## 2. Filer

| Del                                        | Placering                                    |
| ------------------------------------------ | -------------------------------------------- |
| Destinationskontrakt                       | `src/lib/logExport/types.ts`                 |
| Register                                   | `src/lib/logExport/registry.ts`              |
| Håndtering af hemmeligheder                | `src/lib/logExport/secrets.ts`               |
| Kørselskomponent (IPC i forældreprocessen) | `src/lib/logExport/runner.ts`                |
| Proceslivscyklus                           | `src/lib/logExport/childRunner.ts`           |
| Indgangspunkt for underproces              | `src/lib/logExport/exportChild.ts`           |
| Åbning med skrivebeskyttelse               | `src/lib/db/logExportReadOnly.ts`            |
| Fælles forespørgsler/datamapping           | `src/lib/usage/callLogExportQueries.ts`      |
| Detaljeopløser                             | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projektion                             | `src/lib/logExport/presenter.ts`             |
| BigQuery-destination                       | `src/lib/logExport/destinations/bigquery.ts` |
| Godkendelse med Google-tjenestekonto       | `src/lib/logExport/googleServiceAccount.ts`  |
| Kilde til kaldlog                          | `src/lib/usage/callLogExportSource.ts`       |
| Datalagring                                | `src/lib/db/logExportDestinations.ts`        |
| Cron-job                                   | `src/lib/jobs/logExportJob.ts`               |
| REST-lag                                   | `src/app/api/log-export/`                    |
| Dashboardside                              | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle ruter kræver administrationsgodkendelse (`requireManagementAuth`). Hemmeligheder returneres aldrig:
En gemt hemmelighed returneres som den bogstavelige værdi `__stored__`, og hvis denne værdi sendes tilbage ved en opdatering,
bevares de gemte legitimationsoplysninger.

Oprettelse eller opdatering af en destination, hvis type definerer en hemmelighed, **kræver
`STORAGE_ENCRYPTION_KEY`**. Uden den lader `encrypt()` stiltiende værdien passere uændret, så skrivningen
afvises med en 400-fejl frem for at lægge legitimationsoplysninger i SQLite som klartekst (samme beskyttelse som
Telegram-webhooken anvender).

| Metode   | Sti                                      | Formål                                                         |
| -------- | ---------------------------------------- | -------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinationstyper + deres liste over konfigurationsfelter      |
| `GET`    | `/api/log-export/destinations`           | Vis destinationer (hemmeligheder skjult)                       |
| `POST`   | `/api/log-export/destinations`           | Opret en destination                                           |
| `GET`    | `/api/log-export/destinations/{id}`      | Hent én                                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | Opdater navn / aktivering / konfiguration / batchindstillinger |
| `DELETE` | `/api/log-export/destinations/{id}`      | Slet                                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | Kontrollér legitimationsoplysninger uden at skrive noget       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Tøm køen nu via samme kodevej som den planlagte kørsel         |
| `GET`    | `/api/log-export/status`                 | Cron-status, seneste kørsler, kø pr. destination               |

`GET /api/log-export/types` er det, der gør brugergrænsefladen generisk: Formularen i dashboardet gengives ud fra
de returnerede feltbeskrivelser, så en ny destination ikke kræver ændringer i brugergrænsefladen.

---

## 4. BigQuery-destination

Konfigurationsnøgler (`type: "bigquery"`):

| Nøgle                | Bemærkninger                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-projektet, der indeholder datasættet                                                                   |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                            |
| `location`           | Bruges kun, når datasættet skal oprettes (standardværdi `EU`)                                              |
| `serviceAccountJson` | Nøgle til servicekonto. Hemmelighed: krypteret under lagring, returneres aldrig                            |
| `autoCreate`         | Opret manglende datasæt/tabel; tilføj betinget nullable felter til dokumentation af brug (standard `true`) |

Servicekontoen skal have `bigquery.tables.updateData` på måltabellen samt
`bigquery.datasets.create` / `bigquery.tables.create`, når `autoCreate` er slået til.
Opdatering af en eksisterende tabel for at tilføje de to nullable felter til dokumentation af brug
kræver også `bigquery.tables.update`. En manglende tilladelse får eksporten til at mislykkes uden
at føre dens cursor frem.

En konfigureret batch er en **cursor-enhed**, ikke en HTTP-enhed: `send()` opdeler den i insertAll
-kald på højst 500 rækker, så en stor `batch_size` ikke kan udløse BigQuerys grænse på 10 MB pr. anmodning.
Midlertidige statusser (408/429/500/502/503/504) forsøges igen op til tre gange med eksponentiel
backoff, hvor de samme insertIds genbruges. Godkendelses- og skemafejl udløser en fejl ved første forsøg
i stedet for at bruge kørslen op.

En tabel, der netop er blevet oprettet, er endnu ikke synlig for streaming-endpointet, som svarer
404 i nogle få sekunder. Dette 404-svar forsøges igen, men **kun når denne kørsel oprettede tabellen** —
en tabel, der reelt mangler, fejler stadig med det samme. Bemærk, at hvis en tabel genoprettes under et navn,
der for nylig blev slettet, nægter BigQuery streamingindsættelser i flere minutter; det er en egenskab
ved sletning efterfulgt af genoprettelse, så foretræk et nyt tabelnavn frem for at slette og tilføje en igen.

**En delvis fejl ankommer som HTTP 200 med et ikke-tomt `insertErrors[]`.** Det behandles som
en fejl og udløser en undtagelse, hvilket forhindrer cursoren i at gå videre forbi rækker, som BigQuery
aldrig accepterede; `tests/unit/log-export-bigquery.test.ts` fastlåser denne adfærd.

Transporten er ren REST — en selvsigneret RS256-assertion udveksles med et access token på
`https://oauth2.googleapis.com/token`, hvorefter rækker sendes til `tabledata.insertAll`. Der
indhentes ingen Google SDK. Access tokens caches i processen pr. (servicekonto, scope).

Den oprettede tabel indeholder én kolonne pr. felt på fanen Logs plus `exported_at` og er udformet til
den måde, opkaldslogge faktisk forespørges på:

- **Dagsinddelt efter `timestamp`**, så en forespørgsel, der er afgrænset efter dato, kun scanner
  disse dage.
- **Klynget efter `api_key_name`, `provider`, `model`, `status`** (i denne rækkefølge), så filtrering efter
  hvem der kørte den, hvor den blev sendt hen, eller om den mislykkedes, frasorterer blokke inden for hver
  partition. BigQuery tillader højst fire klyngekolonner, og rækkefølgen betyder noget: Et filter på
  `api_key_name` alene frasorterer, mens et filter på `status` alene ikke gør.
- **Valgfri partitionstilbageholdelse** via `partitionExpirationDays` (0 bevarer alt), anvendt
  når tabellen oprettes.

Begge indstillinger anvendes ved oprettelsen. En eksisterende tabel bevarer det layout, den allerede har,
så peg destinationen på et nyt tabel-id, hvis du vil tage dem i brug.

`tests/unit/log-export-bigquery.test.ts` bekræfter, at mapperen og tabellens skema forbliver
synkroniserede, så en ny kolonne i opkaldsloggen ikke kan gå tabt ubemærket under eksporten.

Batches opdeles efter **både antal rækker og serialiserede bytes**. Antallet af rækker alene er ikke nok,
når payloads eksporteres: 500 rækker med prompts kan fylde titusindvis af megabytes, og insertAll
afviser en anmodning på over 10 MB. Chunks afsluttes ved 500 rækker eller 9 MB, alt efter hvad der kommer først.

---

## 5. Destination for OTLP/HTTP-traces

Konfigurationen bruger `type: "otlp-http"`. Dette er en planlagt, cursor-baseret eksport af
persistente opkaldslogs, ikke den best-effort-sink for live-routinghændelser, der findes i
`open-sse/services/routing/otel.ts`. Den læser eller ændrer ikke denne sinks miljøvariabler,
timere eller buffere. Hvis begge aktiveres, kan det producere to uafhængige typer spans;
brug instrumenteringsscopet `omniroute.log-export` til at skelne disse opkaldslog-spans.

| Nøgle                    | Standard / formål                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `endpoint`               | Påkrævet fuld HTTP(S)-URL til traces; der tilføjes ikke noget `/v1/traces`-suffiks         |
| `headers`                | Valgfri `Name: value`-linjer eller JSON-objekt med strenge; krypteret                      |
| `requestHeaderAllowlist` | Tom (deaktiveret); klientheadernavne/-præfikser, der skal registreres som span-attributter |
| `serviceName`            | `omniroute`; ressourcen `service.name`                                                     |
| `langfuseMapping`        | `false`; tilføjer Langfuse-generation/session/user-attributter                             |
| `identity`               | `pseudonymous`, `keyName` eller `none`                                                     |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                    |
| `timeoutMs`              | `30000` pr. HTTP-forsøg                                                                    |
| `environment`            | Ikke angivet; valgfri `langfuse.environment`                                               |

Det generiske dashboard viser disse felter. `paths` accepterer et API-array eller et tekstområde
med eksakte stier adskilt af linjeskift/kommaer. Embeddings, rerank og andre stier
udelades, medmindre de udtrykkeligt er tilladt. Udeladte rækker fremfører stadig cursoren;
den eksisterende runners `exported`/`exportedTotal`-tællere tæller behandlede kilderækker,
herunder filtrerede rækker, i stedet for accepterede spans. Filtreringen udføres i child-processen
uden at ændre dens IPC-/cursor-kontrakt.

URL-valideringen bruger den DB-uafhængige `parseAndValidateNonMetadataUrl`-hjælper fra
`src/shared/network/outboundUrlGuard.ts`: politikken `block-metadata`. Den har de samme
ubetingede kontroller af metadata/protokol/indlejrede legitimationsoplysninger som webhook-validatoren,
men private URL'er er udtrykkeligt tilladt, og localhost-/LAN-destinationer tillades bevidst
uden en global feature-flag-override. Dette gør det muligt at bruge self-hosted Langfuse-, Phoenix-,
Tempo- og Collector-endpoints, herunder private HTTP-endpoints. Cloud-metadata-værter blokeres altid.
Redirects følges ikke, så en collector kan ikke omdirigere legitimationsoplysninger til en anden vært.
Ligesom den eksisterende leksikalske URL-vagt fastlåser dette ikke DNS-opløsningen; konfigurér kun
værter, som operatøren kontrollerer. Foretræk HTTPS, når endpointet ikke befinder sig på et
betroet netværk.

### Payload og levering

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) indeholder én
CLIENT-span pr. tilladt række, navngivet efter den eksakte request-sti. Navngivningen af stier
skelner mellem Chat Completions, Responses og Messages uden at indlejre model- eller
identitetsdata i span-navnet. Ressourceattributter omfatter `service.name` og pakkens
`service.version`.

Den normale logger for chatforsøg (`open-sse/handlers/chatCore/attemptLogging.ts`) skriver
`duration = Date.now() - startTime` ved afslutningen og leverer ikke et tidsstempel;
`saveCallLogOperation` i `src/lib/usage/callLogs.ts` sætter som standard tidsstemplet til
skrivetidspunktet (afslutningstidspunktet). Eksporten sætter derfor slut = rækkens tidsstempel
og start = slut − varighed (millisekunder, konverteret til decimale nanosekunder).
Historiske tidsstempler leveret af kaldere bevares også som sluttidspunktet; der findes ingen
skelnen pr. række mellem start- og afslutningstidspunkt. En null-varighed bliver til nul.
Ugyldige eller manglende tidsstempler får batchen til at mislykkes i stedet for at oprette
ikke-deterministiske spans. `ttftMs` kan være nullable og mappes til `omniroute.ttft_ms`.

Attributter omfatter `gen_ai.operation.name="chat"`, udbyder, forespurgt/svarende model,
input-/output-tokens, valgfri cache-read-/cache-creation-/reasoning-tokens, HTTP-status,
combo, cachekilde, sessionstag og korrelations-id. Heltalsværdier og tidsstempler i OTLP
er decimale strenge; strenge, booleske værdier og brøktal bruger deres native OTLP-værdivarianter.
Fejlspans har ERROR-status og en renset statusmeddelelse. Den kanoniske post har ingen URL til
upstream-værten, så `server.address` udelades i stedet for fejlagtigt at identificere collectoren
som modelserveren. Omkostninger eksporteres ikke.

Kun `includeBodies=true` indlæser indhold. Når `langfuseMapping=false`, indeholder
`gen_ai.input.messages` / `gen_ai.output.messages` den rensede JSON for request-/response-bodyen,
som den er gemt af OmniRoute (kanoniseret, når den kan parses), ikke et omformet
semconv-meddelelsesarray. Afkortede/ikke-JSON-bodies forbliver rå tekst. Når
`langfuseMapping=true`, udsendes bodies kun som `langfuse.observation.input` /
`langfuse.observation.output`; `gen_ai.*.messages`-attributterne udelades, så hver body
sendes én gang. Begge tilstande arver `maxBodyBytes` fra den eksisterende indlæsningssti;
`omniroute.bodies_truncated=true` markerer afkortning.
Der tilføjes ingen ekstra pipeline-snapshots eller ulæste artefakter uden rensning af denne
destination; valgfri request-header-opsamling bruger det eksisterende indlæste klientsnapshot,
der beskrives nedenfor. Brug en frekvens på minutniveau, f.eks.
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, ved eksport af bodies i stedet for at akkumulere
et backlog på timebasis.

### Valgfrie request-headers fra klienten

Opsamling af headers er **deaktiveret som standard**. Angiv `requestHeaderAllowlist` i destinationens
konfiguration, og aktivér `Export prompts and responses` (`includeBodies: true` på destinationen).
Allowlisten accepterer et API-array eller et tekstområde med navne adskilt af linjeskift/kommaer:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Navne matcher uden hensyn til store og små bogstaver og nøjagtigt, medmindre en enkelt afsluttende `*` vælger et ikke-tomt
header-navnepræfiks. Et fritstående `*`, indlejrede jokertegn og ugyldige HTTP-headernavne afvises.
Der er højst 64 selektorer, hver med et navn/præfiks på højst 256 ASCII-bytes.
Denne indstilling er separat fra `headers`, som autentificerer eksportøren over for collectoren.

Capture læser kun fra `pipeline_client_request`, som udfyldes fra den gemte detaljerede pipelines
`clientRawRequest` (eller den ældre `clientRequest`). Den falder aldrig tilbage til providerens request-headers.
Detaljeret pipeline-logning skal have været aktiveret, da requesten blev registreret. Når
`includeBodies` er deaktiveret, eller når client-snapshot-JSON mangler, er beskadiget eller er afskåret,
udsendes ingen header-attributter. En forøgelse af `maxBodyBytes` kan forhindre afskæring af snapshot ved eksporttidspunktet;
den kan ikke gendanne detaljer, der aldrig blev gemt. Et snapshot på over 1 MiB eller med mere end
256 header-poster ignoreres. Den eksisterende eksport af prompt/svar forbliver aktiveret sammen med header-capture;
allowlisten giver ikke en hydration-tilstand, der kun omfatter headers.

Valgte værdier bliver til OTLP-string-arrays med `http.request.header.<full lowercase header name>`,
selv for en enkelt streng. For eksempel bliver `X-OmniRoute-Meta-Team: example-team` til
`http.request.header.x-omniroute-meta-team` med
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Det fulde præfiks bevares: Dette er almindelige headers uden fortolkning af forretningsfelter eller
konvertering til `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` ændrer ikke header-semantikken.
En valgt enkeltværdi for `User-Agent` sætter også standard-skalaren
`user_agent.original`. Kommaer i én værdi opdeles ikke. Varianter med forskellig store/små bogstaver flettes i den rækkefølge,
de forekommer i de gemte poster; enhver ugyldig variant medfører, at hele den pågældende header udelades.
Attributter sorteres efter navn med små bogstaver.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key-headers, navne, der indeholder
markører for auth/token/secret/password/credential, samt interne gateway-legitimationsoplysninger udelades altid,
selv hvis de er valgt eller delvist maskeret i lageret. Kendte legitimationsoplysningsmønstre genbruger den fælles
legitimationsoplysningsdetektor; redigeringsmarkører udelades og eksporteres ikke som sikre værdier.
Kun strenge og ikke-tomme string-arrays accepteres; tal eller objekter tvangskonverteres ikke.
Ugyldige navne, prototypenøgler, kontroltegn (bortset fra horisontalt tabulator-tegn) og ugyldig Unicode ignoreres
uden at få batchen til at mislykkes eller afspejle deres indhold i fejl.

Hvert span indeholder højst 32 headers, 16 værdier pr. header, 4096 UTF-8-bytes pr. værdi
og 16384 samlede UTF-8-bytes på tværs af gemte headernavne og -værdier. For store/ugyldige headers
udelades som helhed og afskæres ikke. Valg af headers er en operatørbeslutning om databeskyttelse: navne, der ser sikre ud,
kan stadig indeholde persondata, og disse grænser/detektorer er ikke en generel PII-scrubber.

### Leveringsgrænser

Requests er begrænset til 500 spans og 4 MiB UTF-8-JSON, inklusive envelope.
Hvert tilladt span størrelseskontrolleres før den første request i en cursor-batch. Et individuelt
span, der er større end grænsen, sender ingen del af den pågældende batch og mislykkes med vejledning om at sænke
`maxBodyBytes`; det droppes ikke stiltiende. Preflight beholder kun referencer til poster
og byteantal og kasserer hvert midlertidigt span/JSON; spans genopbygges til begrænsede chunks
i stedet for at holde en ekstra serialiseret kopi af batchen. HTTP 408/429/5xx, netværksfejl og timeouts får højst
tre forsøg med eksponentiel backoff på 250/500 ms. `Retry-After`-sekunder eller HTTP-datoer
kan forlænge en forsinkelse op til 5 sekunder. Andre statuser medfører øjeblikkeligt fejl. OTLP 2xx-delvis afvisning medfører også
en fejl i stedet for at kvittere for et mistet span; tomme eller gyldige JSON-kvitteringer accepteres med en
grænse på 64 KiB for læsning af svaret.

Fejl indeholder kun fakta, som eksportøren selv ejer: HTTP-status, retry-klasse, antal forsøg og antal sendte spans,
eller en fast formulering om kvitterings-/netværksfejl. Collectorens svarlegemer,
antal delvise succeser og response-headers kopieres aldrig til fejl, logs eller dashboardet. En mislykket eller delvist accepteret batch kvitteres ikke:
destinationen viser Failing med den pågældende status, cursoren bliver ved den senest kvitterede batch, og næste kørsel
sender de samme rækker igen. Permanente statuser bliver ved med at fejle, indtil collectoren eller konfigurationen er rettet.
Brug collectorens egne logs til svaroplysninger. Fejlsammendrag i call-loggen bevarer deres separate redaktion.
`prepare()` klargør ingen ressourcer; Test poster præcis `{"resourceSpans":[]}` og rapporterer
HTTP-status uden at skrive call-log-spans.

Trace-id'er og span-id'er er de første 32/16 hexadecimale cifre af SHA-256 over
`"omniroute.trace\\0" + callLogId` og `"omniroute.span\\0" + callLogId`. Genudsendelser medfører
identiske id'er. Dette er ikke en garanti for deduplikering: Nogle backends, herunder Langfuse
v4-ingestion, deduplikerer ikke spans med samme id. Et nedbrud eller en delvis chunk-fejl kan
genudsende højst den ene ikke-kvitterede cursor-batch; hele denne batch kan blive duplikeret,
ikke kun dens sidste HTTP-chunk. Vælg cursor-batchstørrelsen med denne afvejning i tankerne.

### Langfuse-eksempel

Konfigurer disse felter for en self-hosted Langfuse-instans:

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

Opret Authorization-værdien lokalt som Base64 af den bogstavelige `public-key:secret-key`-
streng (for eksempel med `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Indsæt ikke ægte legitimationsoplysninger i logs, skærmbilleder eller issues. Mappingen
sætter automatisk `x-langfuse-ingestion-version: 4`; Authorization leveres stadig i `headers`.
Både headers og det genererede identity-salt bruger den eksisterende krypterede secret-field-mekanisme og API-placeholders;
`STORAGE_ENCRYPTION_KEY` er påkrævet.

Mapping tilføjer genereringstype/-model, JSON-oplysninger om forbrug (input/output/total og tilgængelige cache-nøgler), JSON-snapshots af input/output, niveauet ERROR/DEFAULT, en renset statusmeddelelse, tracenavn, sessions-id, valgfrit miljø samt filtrerbar
`langfuse.observation.metadata.<key>` for udbyder, ønsket model, sti, kombination, cachekilde og status. `langfuse.observation.completion_start_time` er ISO 8601 ved
starttidspunktet + TTFT, men kun når TTFT er kendt og ligger inden for varigheden. Der sendes ingen omkostningsattributter.

Identitetstilstande gælder for `langfuse.user.id`:

- `pseudonymous` (standard): HMAC-SHA256 af API-nøglens interne id med et tilfældigt
  32-byte-salt pr. destination. Saltet genereres ved oprettelse, hvis det mangler, krypteres
  som `identitySalt`, returneres aldrig og bevares ved redigeringer. Rå nøgle-id'er indsættes
  aldrig i span-attributter. Hvis en destinations salt oprettes eller roteres igen, ændres
  identiteterne.
- `keyName`: det konfigurerede API-nøglenavn, hvilket med vilje afslører denne operatørbetegnelse.
- `none`: intet bruger-id. Sessionstags eksporteres stadig, når de findes; disse tilstande
  anonymiserer ikke vilkårligt promptindhold eller sessions-/korrelationsetiketter, som leveres af operatøren.

### Start uden en historisk indlæsning

Kun ved oprettelse skal du aktivere **Start fra den aktuelle position (spring eksisterende logs over)** eller angive
`startFromCurrentPosition: true` på øverste niveau i create-API-payloaden. Det initialiserer
`cursor_row_id` til den aktuelle maksimale rowid for bevarede kaldelogposter ved hjælp af de eksisterende
markørhjælpere uden en migrering. Standardværdien er false (markør 0 og historisk indlæsning af bevarede poster).
Det er ikke en indstilling til nulstilling af markøren ved opdatering.

Den delte `ttftMs`-tilføjelse tilføjer også en nullable `ttft_ms`-kolonne til BigQuery-mapperen
og skemaet for nye tabeller: Skemaatesten kræver, at hvert kanonisk postfelt har en kolonne. Eksisterende
tabeller fortsætter med at blive eksporteret uændret: `prepare()` læser tabellens skema og udelader kun
`ttft_ms`, når denne kolonne mangler. Tilføj den nullable INT64-kolonne for at få TTFT med i næste kørsel,
eller brug en ny tabel. Den valgfrie TTFT-kolonne udløser ikke en skemaopdatering. Kolonner med evidens for forbrug
følger det betingede, tilvalgsbaserede kompatibilitetsforløb nedenfor; andre rækkefelter bevarer streng
skemakontrol.

---

## 6. Tilføjelse af en destination

1. Opret `src/lib/logExport/destinations/<name>.ts`, som eksporterer en `LogExportDestinationType`:
   et Zod-`configSchema`, et `fields`-descriptorarray til brugergrænsefladen, `secretFields` og en
   `createClient(config)`, der returnerer `test()` / `prepare()` / `send(records)`.
2. Føj den til `DESTINATIONS`-arrayet i `src/lib/logExport/registry.ts`.
3. Skriv tests under `tests/unit/`.

Det er hele ændringen: persistens, cron-jobbet, REST-laget, kryptering af hemmeligheder og
dashboardformularen læser alle registret.

To regler for en ny destination:

- `send()` **skal kaste en undtagelse** ved en delvis fejl. Hvis kaldet afsluttes uden fejl, betyder det, at "destinationen har disse rækker",
  og markøren flyttes permanent forbi dem.
- En destination, der accepterer en brugerangivet URL, skal validere den via
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`), før der hentes data,
  på samme måde som webhooks gør. BigQuery behøver ikke dette: dens værter er konstanter.

---

## 7. Betjening

- **Dashboard**: Integrations → Log export. Tilføj en destination, kør **Test** for at kontrollere legitimationsoplysninger
  uden at skrive rækker, og aktivér den derefter.
- **Backlog**: Hvert destinationskort viser afventende rækker og markøren; `GET
/api/log-export/status` returnerer de samme tal samt de seneste 20 jobkørsler.
- **En destination, der fejler, får ikke de andre til at fejle** — kørselsoversigten registrerer status pr. destination
  i `last_status` / `last_error`, og historikken for jobkørsler bevarer den samlede status.
- **Når en destination slettes, slettes dens markør.** Hvis den tilføjes igen, starter den med den ældste
  bevarede opkaldslog, hvilket gensender rækker, som destinationen muligvis allerede har. På BigQuery absorberer
  `insertId` pr. række kun dette inden for BigQuerys eget vindue for deduplikering, så det anbefales at deaktivere
  en destination i stedet for at slette den.

### Kompatibilitet for schemaet for brugsbevis

Nye BigQuery-tabeller inkluderer nullable `usage_evidence` (STRING, der indeholder JSON) og
`usage_estimated` (BOOL). Når `autoCreate` er aktiveret, kan en eksisterende tabel kun modtage
disse manglende nullable-kolonner. Eksportøren bevarer hele det eksisterende schema, inklusive feltmetadata,
og sender en betinget PATCH ved hjælp af den returnerede etag. En samtidig skemaændring får eksporten til at
fejle i stedet for at overskrive den; ved næste kørsel læses tabellen igen.

Når `autoCreate` er deaktiveret, skal du selv tilføje disse kolonner, før du eksporterer poster
med brugsbevis. Manglende schema-/etag-metadata eller en mislykket opdatering forhindrer også indsættelser
med bevis. Eksportmarkøren går ikke frem ved denne fejl, og bevis bliver aldrig stiltiende kasseret.
Lokal logopbevaring gælder stadig, mens en eksport er blokeret, så løs fejlen, før de bevarede kilderækker
udløber.
