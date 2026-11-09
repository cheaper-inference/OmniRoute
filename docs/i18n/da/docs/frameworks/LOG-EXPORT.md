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

| Nøgle                | Bemærkninger                                                                     |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | GCP-projekt, der indeholder datasættet                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Bruges kun, når datasættet skal oprettes (standard `EU`)                         |
| `serviceAccountJson` | Nøgle til tjenestekonto. Hemmelighed: krypteret under lagring, returneres aldrig |
| `autoCreate`         | Opret datasættet og tabellen ved den første eksport (standard `true`)            |

Tjenestekontoen skal have `bigquery.tables.updateData` på måltabellen samt
`bigquery.datasets.create` / `bigquery.tables.create`, når `autoCreate` er slået til.

En konfigureret batch er en **cursor**-enhed, ikke en HTTP-enhed: `send()` opdeler den i insertAll-
kald med højst 500 rækker, så en stor `batch_size` ikke kan overskride BigQuerys grænse på 10 MB pr. anmodning.
Ved midlertidige statuskoder (408/429/500/502/503/504) forsøges igen op til tre gange med eksponentielt
stigende ventetid og genbrug af de samme insertIds; godkendelses- og skemafejl udløser en undtagelse ved første forsøg frem for
at spilde resten af kørslen.

En tabel, der netop er oprettet, er endnu ikke synlig for streaming-endpointet, som svarer med
404 i nogle sekunder. Ved denne 404 forsøges igen, men **kun når denne kørsel har oprettet tabellen** —
en tabel, der reelt mangler, udløser stadig en fejl med det samme. Bemærk, at hvis en tabel genoprettes med et navn, der
for nylig er blevet slettet, afviser BigQuery streamingindsættelser i flere minutter; det er en
egenskab ved sletning efterfulgt af genoprettelse, så brug helst et nyt tabelnavn i stedet for at slette og tilføje en tabel igen.

**En delvis fejl returneres som HTTP 200 med et ikke-tomt `insertErrors[]`.** Dette behandles som
en fejl og udløser en undtagelse, hvilket forhindrer cursoren i at gå videre forbi rækker, som BigQuery aldrig
accepterede; `tests/unit/log-export-bigquery.test.ts` fastholder denne adfærd.

Transporten er almindelig REST — en selvsigneret RS256-assertion udveksles med et adgangstoken på
`https://oauth2.googleapis.com/token`, hvorefter rækker sendes til `tabledata.insertAll`. Intet Google SDK
hentes ind. Adgangstokens caches i processen pr. (tjenestekonto, scope).

Den oprettede tabel har én kolonne pr. felt på fanen Logs samt `exported_at` og er struktureret efter,
hvordan der faktisk forespørges på kaldlogs:

- **Dagsopdelt i partitioner efter `timestamp`**, så en forespørgsel afgrænset efter dato kun scanner de pågældende dage.
- **Klyngeopdelt efter `api_key_name`, `provider`, `model`, `status`** (i den rækkefølge), så filtrering efter
  hvem der kørte kaldet, hvor det blev sendt hen, eller om det mislykkedes, frasorterer blokke i hver partition. BigQuery
  tillader højst fire klyngekolonner, og rækkefølgen er vigtig: et filter alene på `api_key_name`
  frasorterer blokke, mens et filter alene på `status` ikke gør.
- **Valgfri opbevaringsperiode for partitioner** via `partitionExpirationDays` (0 beholder alt), som anvendes,
  når tabellen oprettes.

Begge indstillinger anvendes ved oprettelsen. En eksisterende tabel beholder sin nuværende struktur, så
peg destinationen på et nyt tabel-id, hvis du vil tage dem i brug.

`tests/unit/log-export-bigquery.test.ts` kontrollerer, at mapperen og tabelskemaet forbliver
synkroniserede, så en ny kolonne i kaldloggen ikke ubemærket kan blive udeladt under eksporten.

Batcher opdeles efter **både** antal rækker og serialiserede bytes. Antallet af rækker alene er ikke nok,
når nyttedata eksporteres: 500 rækker med prompts kan fylde adskillige megabyte, og insertAll
afviser anmodninger over 10 MB. Hver del afsluttes ved 500 rækker eller 9 MB, alt efter hvad der nås først.

---

## 5. Destination for OTLP/HTTP-spor

Konfigurationen bruger `type: "otlp-http"`. Dette er en planlagt, cursorbaseret eksport af gemte
kaldlogs, ikke den best-effort-modtager for live-routinghændelser, der findes i
`open-sse/services/routing/otel.ts`. Den læser eller ændrer ikke denne modtagers miljøvariabler,
timere eller buffere. Hvis begge aktiveres, kan der opstå to uafhængige typer spans;
brug instrumenteringsområdet `omniroute.log-export` til at skelne disse kaldlog-spans fra andre.

| Nøgle                    | Standardværdi / formål                                                             |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `endpoint`               | Påkrævet fuld HTTP(S)-URL til spor; suffikset `/v1/traces` tilføjes ikke           |
| `headers`                | Valgfrie `Name: value`-linjer eller JSON-objekt med strenge; krypteret             |
| `requestHeaderAllowlist` | Tom (fra); klientheadernavne/-præfikser, der skal registreres som span-attributter |
| `serviceName`            | `omniroute`; ressourcens `service.name`                                            |
| `langfuseMapping`        | `false`; tilføjer Langfuse-attributter for generering/session/bruger               |
| `identity`               | `pseudonymous`, `keyName` eller `none`                                             |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                            |
| `timeoutMs`              | `30000` pr. HTTP-forsøg                                                            |
| `environment`            | Ikke angivet; valgfri `langfuse.environment`                                       |

Det generiske dashboard viser disse felter. `paths` accepterer et API-array eller et tekstområde
med nøjagtige stier adskilt af linjeskift/kommaer. Embeddings, rerank og andre stier
springes over, medmindre de udtrykkeligt er tilladt. Oversprungne rækker flytter stadig cursoren frem; den eksisterende
kørselskomponents tællere `exported`/`exportedTotal` tæller behandlede kilderækker, inklusive filtrerede
rækker, frem for accepterede spans. Filtreringen udføres i underprocessen uden at ændre dens
IPC-/cursorkontrakt.

URL-validering bruger hjælpefunktionen `parseAndValidateNonMetadataUrl`, som ikke kræver databaseadgang, fra
`src/shared/network/outboundUrlGuard.ts`: politikken `block-metadata`. Den har de samme
ubetingede kontroller af metadata/protokol/indlejrede legitimationsoplysninger som webhook-validatoren med
private URL'er tilladt, men tillader bevidst localhost-/LAN-mål uden en global
tilsidesættelse via funktionsflag. Dette muliggør selvhostede Langfuse-, Phoenix-, Tempo- og Collector-
endepunkter, herunder private HTTP-endepunkter. Værter for cloudmetadata blokeres altid.
Omdirigeringer følges ikke, så en collector ikke kan omdirigere legitimationsoplysninger til en anden vært.
Ligesom den eksisterende leksikalske URL-beskyttelse fastlåser dette ikke DNS-opløsningen; konfigurer kun
værter, som operatøren kontrollerer. Foretræk HTTPS, når endepunktet ikke er på et betroet netværk.

### Payload og levering

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) indeholder ét
CLIENT-span pr. tilladt række, navngivet efter dens nøjagtige anmodningssti. Navngivning efter sti skelner mellem
Chat Completions, Responses og Messages uden at indlejre model- eller identitetsdata i
span-navnet. Ressourceattributter omfatter `service.name` og pakkens `service.version`.

Den normale logger for chatforsøg (`open-sse/handlers/chatCore/attemptLogging.ts`) skriver
`duration = Date.now() - startTime` ved afslutning og angiver ikke et tidsstempel;
`saveCallLogOperation` i `src/lib/usage/callLogs.ts` sætter som standard tidsstemplet til skrive-
(afslutnings)tidspunktet. Eksporten sætter derfor slut = rækkens tidsstempel og start = slut − varighed
(millisekunder, konverteret til decimale nanosekunder). Historiske tidsstempler angivet af kalderen
bevares også som sluttidspunkt; der findes ingen markør pr. række, som skelner mellem start og afslutning.
En null-varighed bliver til nul. Ugyldige/manglende tidsstempler får batchen til at fejle frem for at oprette
ikke-deterministiske spans. `ttftMs` kan være null og mappes til `omniroute.ttft_ms`.

Attributterne omfatter `gen_ai.operation.name="chat"`, udbyder, anmodet model/svarmodel,
input-/outputtokens, valgfrie tokens for cachelæsning/cacheoprettelse/ræsonnement, HTTP-status,
combo, cachekilde, sessionstag og korrelations-id. Heltalsværdier og tidsstempler i OTLP
er decimalstrenge; strenge, booleske værdier og brøktal bruger deres egne OTLP-værdivarianter.
Fejlspans har status ERROR og en renset statusmeddelelse. Den kanoniske
post har ingen URL til upstream-værten, så `server.address` udelades frem for fejlagtigt
at identificere collectoren som modelserveren. Omkostninger eksporteres ikke.

Kun `includeBodies=true` indlæser indholdet. Med `langfuseMapping=false`
indeholder `gen_ai.input.messages` / `gen_ai.output.messages` den rensede JSON for anmodnings-/svarindholdet,
som OmniRoute har gemt den (kanoniseret, når den kan parses), ikke et omformet semconv-
beskedarray. Afkortet indhold/indhold, der ikke er JSON, forbliver rå tekst. Med `langfuseMapping=true`
udsendes indhold kun som `langfuse.observation.input` / `langfuse.observation.output`;
attributterne `gen_ai.*.messages` udelades, så hvert indhold kun sendes én gang. Begge tilstande
arver `maxBodyBytes` fra den eksisterende indlæsningssti;
`omniroute.bodies_truncated=true` markerer afkortning.
Denne destination tilføjer ingen ekstra pipelineøjebliksbilleder eller læsninger af urensede artefakter;
valgfri registrering af anmodningsheadere bruger det eksisterende indlæste klientøjebliksbillede, der er beskrevet nedenfor.
Brug en frekvens på minutniveau såsom `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ved eksport af
indhold frem for at ophobe en times efterslæb.

### Valgfrie headere fra klientanmodninger

Registrering af headere er **slået fra som standard**. Angiv `requestHeaderAllowlist` i destinationskonfigurationen,
og aktivér **Eksportér prompts og svar** (`includeBodies: true` på destinationen).
Listen over tilladte headere accepterer et API-array eller et tekstområde med navne adskilt af linjeskift/kommaer:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Navne matches nøjagtigt uden forskel på store og små bogstaver, medmindre en enkelt afsluttende `*` vælger et ikke-tomt
præfiks for headernavne. Et enkeltstående `*`, indlejrede jokertegn og ugyldige HTTP-headernavne afvises.
Der må højst være 64 selektorer, hver med et navn/præfiks på højst 256 ASCII-bytes.
Denne indstilling er adskilt fra `headers`, som autentificerer eksportøren over for indsamleren.

Registreringen læser kun `pipeline_client_request`, som udfyldes fra den gemte detaljerede pipelines
`clientRawRequest` (eller det ældre `clientRequest`). Den falder aldrig tilbage til udbyderens anmodningsheadere.
Detaljeret pipeline-logning skal have været aktiveret, da anmodningen blev registreret. Hvis
`includeBodies` er deaktiveret, eller hvis klientøjebliksbilledets JSON mangler, er beskadiget eller afkortet, udsendes der ingen headerattributter.
En forøgelse af `maxBodyBytes` kan forhindre afkortning af øjebliksbilleder under eksport;
den kan ikke genskabe detaljer, der aldrig blev gemt. Et øjebliksbillede på over 1 MiB eller med mere end
256 headerposter ignoreres. Den eksisterende eksport af prompt/svar forbliver aktiveret sideløbende med
headerregistreringen; tilladelseslisten giver ikke en hydreringstilstand, der kun omfatter headere.

Valgte værdier bliver til OTLP-strengarrays i `http.request.header.<full lowercase header name>`,
selv for en enkelt streng. For eksempel bliver `X-OmniRoute-Meta-Team: example-team` til
`http.request.header.x-omniroute-meta-team` med
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Hele præfikset bevares: Dette er almindelige headere uden fortolkning som forretningsfelter eller
konvertering til `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` ændrer ikke headernes
semantik. En valgt `User-Agent` med en enkelt værdi angiver også den skalære standardattribut
`user_agent.original`. Kommaer inden for én værdi bruges ikke til opdeling. Varianter med forskellig brug af store og små bogstaver sammenflettes i den gemte
postrækkefølge; hvis en variant er ugyldig, udelades hele headeren. Attributter sorteres efter navnet med små bogstaver.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-nøgleheadere, navne med
markører for auth/token/secret/password/credential samt interne gateway-legitimationsoplysninger er altid
udelukket, selv hvis de er valgt eller delvist maskeret i lageret. Kendte mønstre for legitimationsoplysninger genbruger
den fælles detektor for legitimationsoplysninger; maskeringsmarkører udelades og eksporteres ikke som sikre værdier.
Kun strenge og ikke-tomme strengarrays accepteres; hverken tal eller objekter typekonverteres.
Ugyldige navne, prototypenøgler, kontroltegn (undtagen vandret tabulator) og ugyldig Unicode
ignoreres, uden at batchen fejler, eller deres indhold gengives i fejl.

Hvert span registrerer højst 32 headere, 16 værdier pr. header, 4096 UTF-8-bytes pr. værdi
og i alt 16384 UTF-8-bytes på tværs af registrerede headernavne og -værdier. For store eller ugyldige headere
udelades helt og afkortes ikke. Udvælgelsen er en beslutning om databeskyttelse, som operatøren træffer: Navne, der ser sikre ud,
kan stadig indeholde personoplysninger, og disse grænser/detektorer er ikke et generelt værktøj til fjernelse af personoplysninger.

### Leveringsgrænser

Anmodninger er begrænset til 500 spans og 4 MiB UTF-8-JSON inklusive omslutningen.
Størrelsen af hvert tilladt span kontrolleres før den første anmodning i en markørbatch. Et enkelt
span, der er større end grænsen, medfører, at ingen del af batchen sendes, og udløser en fejl med vejledning om at sænke
`maxBodyBytes`; det droppes ikke uden varsel. Forhåndskontrollen beholder kun postreferencer og
byteantal og kasserer hvert midlertidigt span/JSON; spans genopbygges til størrelsesbegrænsede dele
i stedet for at opbevare en ekstra serialiseret kopi af batchen. HTTP 408/429/5xx, netværksfejl og timeout får højst
tre forsøg med eksponentielle ventetider på 250/500 ms. `Retry-After` i sekunder eller som HTTP-datoer
kan forlænge ventetiden op til 5 sekunder. Andre statuskoder udløser straks en fejl. Delvis afvisning med OTLP 2xx udløser også en fejl i stedet for
at kvittere for et mistet span; tomme kvitteringer eller kvitteringer med gyldig JSON accepteres med en
grænse på 64 KiB for læsning af svaret.

Fejl indeholder kun oplysninger fra eksportøren selv: HTTP-status, genforsøgsklasse, antal forsøg og antal sendte
spans eller faste formuleringer om kvitterings-/netværksfejl. Indsamlerens svarindhold,
antal delvist accepterede poster og svarheadere kopieres aldrig til fejl, logfiler eller
dashboardet. Der kvitteres ikke for en fejlet eller delvist accepteret batch: Destinationen viser
Fejler med den pågældende status, markøren forbliver ved den sidst kvitterede batch, og næste kørsel
sender de samme rækker igen. Permanente statuskoder bliver ved med at udløse fejl, indtil indsamleren eller konfigurationen
er rettet. Brug indsamlerens egne logfiler til at se svardetaljer. Fejloversigter i kaldloggen beholder
deres separate maskering.
`prepare()` klargør intet; Test sender præcis `{"resourceSpans":[]}` med POST og rapporterer
HTTP-status uden at skrive spans til kaldloggen.

Trace-id'er og span-id'er er de første 32/16 hexadecimale cifre af SHA-256 af
`"omniroute.trace\\0" + callLogId` og `"omniroute.span\\0" + callLogId`. Genafsendelser har
identiske id'er. Dette er ikke en garanti for deduplikering: Nogle backends, herunder Langfuse
v4-indlæsning, deduplikerer ikke spans med samme id. Et nedbrud eller en fejl i en del af batchen kan
højst medføre genafsendelse af den ene markørbatch, der ikke er kvitteret for; hele denne batch kan blive duplikeret,
ikke kun dens sidste HTTP-del. Vælg markørbatchens størrelse med denne afvejning i mente.

### Langfuse-eksempel

Konfigurer disse felter for en selvhostet Langfuse-instans:

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

Opbyg Authorization-værdien lokalt som Base64 af den bogstavelige streng `public-key:secret-key`
(for eksempel med `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Indsæt ikke faktiske legitimationsoplysninger i logfiler, skærmbilleder eller fejlrapporter. Tilknytningen
angiver automatisk `x-langfuse-ingestion-version: 4`; Authorization leveres stadig i `headers`.
Både headere og det genererede identitetssalt bruger den eksisterende mekanisme til krypterede
hemmelighedsfelter og API-pladsholdere; `STORAGE_ENCRYPTION_KEY` er påkrævet.

Mapping tilføjer genereringstype/model, JSON-forbrugsoplysninger (input/output/total og tilgængelige
cache-nøgler), JSON-snapshots af input/output, niveauet ERROR/DEFAULT, en renset statusmeddelelse,
trace-navn, sessions-id, valgfrit miljø og filtrerbare
`langfuse.observation.metadata.<key>` for udbyder, anmodet model, sti, kombination,
cache-kilde og status. `langfuse.observation.completion_start_time` er ISO 8601 ved
start + TTFT, men kun når TTFT er kendt og ligger inden for varigheden. Der sendes ingen omkostningsattributter.

Identitetstilstande gælder for `langfuse.user.id`:

- `pseudonymous` (standard): HMAC-SHA256 af API-nøglens interne id med et tilfældigt
  salt på 32 byte pr. destination. Saltet genereres ved oprettelse, hvis det mangler, krypteres
  som `identitySalt`, returneres aldrig og bevares ved redigering. Rå nøgle-id'er indsættes aldrig
  i span-attributter. Hvis en destinations salt genskabes/roteres, ændres identiteterne.
- `keyName`: det konfigurerede API-nøglenavn, som bevidst afslører denne operatøretiket.
- `none`: intet bruger-id. Sessionstags eksporteres stadig, når de findes; disse tilstande
  anonymiserer ikke vilkårligt promptindhold eller operatørangivne sessions-/korrelationsetiketter.

### Start uden historisk indlæsning

Kun ved oprettelse kan du aktivere **Start fra den aktuelle position (spring eksisterende logfiler over)** eller angive
`startFromCurrentPosition: true` på øverste niveau i API-payloaden til oprettelse. Det initialiserer
`cursor_row_id` til det aktuelle maksimale rowid blandt bevarede kaldslogposter ved hjælp af de eksisterende
markørhjælpefunktioner, uden en migrering. Standardværdien er false (markør 0 og indlæsning af bevaret historik).
Det er ikke en indstilling til nulstilling af markøren ved opdatering.

Den fælles tilføjelse af `ttftMs` tilføjer også en kolonne, der tillader null, med navnet `ttft_ms` til BigQuery-mapperen
og skemaet for nye tabeller: skematesten kræver, at hvert felt i den kanoniske post har en
kolonne. Eksisterende tabeller fortsætter med at eksportere uændret: `prepare()` læser tabelskemaet og
udelader kun `ttft_ms`, når denne kolonne mangler. Tilføj INT64-kolonnen, der tillader null, for at få TTFT
ved næste kørsel, eller brug en ny tabel. Der kræves ingen PATCH, automatisk skemaændring eller yderligere
tilladelser; alle andre rækkefelter bevarer streng skemakontrol.

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

## 7. Drift

- **Dashboard**: Integrationer → Logeksport. Tilføj en destination, kør **Test** for at kontrollere legitimationsoplysningerne
  uden at skrive rækker, og aktivér den derefter.
- **Efterslæb**: hvert destinationskort viser ventende rækker og markøren; `GET
/api/log-export/status` returnerer de samme tal samt de seneste 20 jobkørsler.
- **En fejlende destination får ikke de andre til at fejle** — kørselsoversigten registrerer status for hver destination
  i `last_status` / `last_error`, og jobkørselshistorikken gemmer den samlede status.
- **Sletning af en destination sletter dens markør.** Hvis den tilføjes igen, starter den fra den ældste bevarede
  kaldslog, hvilket gensender rækker, som destinationen muligvis allerede har. I BigQuery håndterer rækkens
  `insertId` kun dette inden for BigQuerys eget deduplikeringsvindue, så deaktivér helst
  en destination frem for at slette den.
