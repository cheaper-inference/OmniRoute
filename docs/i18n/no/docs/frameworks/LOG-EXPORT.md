# Log export (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, inkrementell eksport av OmniRoute-kallogger til et eksternt analyselager.

Loggfanen i dashbordet lagrer forespørselshistorikk i SQLite (`call_logs`), begrenset av
rotasjon og oppbevaringstid. Loggeksport sender det samme postsettet ut etter en tidsplan, slik at det kan bevares
lenger enn den lokale databasen og kobles sammen med andre data. BigQuery er den første destinasjonen;
pipelinen er registerbasert, så flere destinasjoner kan legges til.

---

## 1. Hvordan det fungerer

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Rute** — one `JobRegistry` cron jobb, `log_export`, som standard er `0 * * * *` (timelig, UTC). Registrert i `src/lib/initCloudSync.ts`; overstyres med `OMNIROUTE_LOG_EXPORT_CRON`. Hver flått renner hver** aktivert** destinasjon, sekvensielt.
- **Cursor** — SQLite implisitte `call_logs.rowid`, vedvarte per destinasjon i `log_export_destinations.cursor_row_id`. `timestamp` er bevisst ikke markøren: innringere kan oppgi sin egen verdi, så en langsom forespørsel kan skrives etter en raskere som startet senere, og en tidsstempelmarkør ville hoppe over den.
- **Batching** — `batch_size` rader per forespørsel (standard 500), `max_rows_per_run` rader per kjøring (standard 10000) slik at et stort etterslep renner over flere haker i stedet for å blokkere en.
- **Leveranse** — beveger markøren seg først etter at `send()` er løst. En mislykket batch forlater markøren der den var, så de samme radene prøves på nytt ved neste kjøring. Garantien er minst én gang pluss de-duplisering på destinasjonssiden, ikke nøyaktig én gang: BigQuery taster hver rad med anropslogg-IDen, som den respekterer etter beste innsats innenfor sitt eget dedup-vindu.
- **Overlappingsvern** — cron tick og `POST .../run` kan skyte sammen. En destinasjon som allerede tømmes, hoppes over i stedet for å tømmes to ganger (`skipped: true` i kjøringsresultatet), så en samtidig kjøring kan ikke sende en batch på nytt eller skrive markøren bakover.
- **Rens utvinning** — hvis `cursor_row_id` havner over `MAX(rowid)` (hele bordet ble renset og rader startet på nytt), spoler løperen tilbake til 0 i stedet for å bli permanent blind.

### Isolert løper og grenser

Hver destinasjon som kjøres på Node starter en separat, kortvarig OS -underordnet prosess (`child_process` med IPC, ikke `worker_threads`). Brødtekst, nyttelast JSON parsing/serialization, destination `prepare()` og destinasjonsnettverk I/O kjører alle der, ikke på serverens hendelsesløkke. Bare konfigurasjons- og små fremdriftsmeldinger krysser IPC; eksporterte poster kommer aldri tilbake til serveren. Cron-jobben og Run now-ruten beholder det samme offentlige resultatet og overlappingsbeskyttelsen.

Barnet åpner serverens løste `DATA_DIR/storage.sqlite` skrivebeskyttet ved å bruke `node:sqlite`, med `busy_timeout=5000` og `query_only=ON`. Den importerer ingen DB singleton og utfører ingen migreringer, sikkerhetskopier eller SQLite -oppdateringer. Missing/corrupt -artefaktbokføring (inkludert den korrupte artefakten UPDATE) forblir bare i dashbordets detaljsti. Begge banene deler en ren detaljløser; eksport bruker asynkrone filsystemlesninger og den samme artefakten → legacy inline → legacy disk → ingen oppløsningsrekkefølge. Et løp tar øyeblikksbilder av den maksimale innsettingen når barnet åpner leseren sin; senere innlegg venter på neste kjøring. Dette er en innsettingsgrense, ikke en langvarig SQLite transaksjon: WAL skrivere og sjekkpunkter forblir ledige under nettverksventer. Updates/deletions av eksisterende rader er ikke frosset av denne grensen.

Etter hvert akseptert parti venter barnet på en bekreftelse. Serveren vedvarer først markøren med `advanceLogExportCursor`, og sender deretter `ack`; ingen neste batch starter før den. En sendingsfeil, krasj eller tidsavbrudd registrerer feil uten å gå videre med den batchen. Tidligere anerkjente partier forblir forpliktet; maksimalt den ene ikke-bekreftede batchen kan sendes på nytt. Suksess registreres først etter `done` og en ren barneutgang. Feil avslutter barnet med SIGTERM, eskalerer til SIGKILL etter 500 ms, og løperen venter på prosessavslutning.

| Miljøvariabel                                 | Misligholde | Hensikt                          |
| --------------------------------------------- | ----------- | -------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000      | Veggklokkegrense per destinasjon |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024        | Child V8 old-space limit i MB    |

Invalid/non-positive/non-integer -verdier bruker standardverdiene. Heap-innstillingen er ikke en total RSS grense; svært store partier kan fortsatt tømme barneminnet og feile kjøringen på en sikker måte. 1024 MB standarden gir rom for standard 500-rads batch med 512 KiB artefakter med kropper aktivert, inkludert BigQuery byte-chunked JSON serialisering. Det gjør ikke en 10000-rads karosseri batchsikker. V8-heap-utmattelse registrerer en handlingsbar feil: lavere batchstørrelse eller øk `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; markøren forblir på den siste bekreftede batchen. Historiske inline/disk kropper dekkes ikke av den moderne artefakthetten. Operatører må budsjettere RSS separat, spesielt innenfor minnebegrensede beholdere.

Barnet arver bare de oppløste `DATA_DIR`, `NODE_ENV`, eksplisitte `TZ` (legacy filnavn lokaltidsoppløsning), `ELECTRON_RUN_AS_NODE` når de er tilstede, og følgende utgående innganger: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (og deres små bokstaver), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. En global Undici-dispatcher deler serverens rene miljøproxy-oppløsning og lokale vertsbypass-regler, inkludert `NO_PROXY`; den importerer ikke `proxyFetch.ts` eller DB/feature -flaggene. Fullmaktslegitimasjon blir redigert fra videresendt utdata og registrerte feil. Destinasjonslegitimasjon går bare i én start IPC melding, aldri argv eller miljø; output/error videresending er prefiks og renset. Bare `ExperimentalWarning` er deaktivert i child exec-argumenter for å unngå å gjenta Nodes SQLite som advarer hver cron-kjøring; andre advarselstyper forblir synlige.

Destinasjonsmoduler må kunne importeres uten Next.js/server-only avhengigheter. Den eksisterende BigQuery implementeringen oppfyller allerede den kontrakten. Cacher for tilgangstoken varer bare for barneløpet, ikke på tvers av løpeturer. Node er den støttede kjøretiden (`package.json` motorer). En best-innsats, ikke-støttet Bun -kompatibilitetsbane eksisterer (`bun:sqlite` i `src/lib/db/core.ts` / adaptere og `Dockerfile.bun`), så eksport må ikke brytes under den. Under Bun beholder eksporten den forrige prosessen underveis og sender ut en engangsadvarsel: underordnet heap/timeout isolasjon er utilgjengelig. Bruk Node for event-loop og OOM isolasjon.

Når `includeBodies` er aktivert, foretrekk en tråkkfrekvens på minuttnivå som `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` i stedet for å akkumulere en timebasert nyttelastetterslep. Gruppe- og radgrenser er fortsatt bundet til hver kjøring. Prosessoppstart betales per destinasjon per kjøring; dette bytter en liten oppstartskostnad for server-hendelsesløkke-isolasjon, ikke redusert total CPU bruk.

### Nyttelast (forespørsler og fullføringer)

Som standard har eksporten bare sammendragsfeltene Loggene** liste** viser. Slår på** Eksporter forespørsler og svar** (`includeBodies`) sender i tillegg det loggene** detalj** ruten viser for hver samtale:

| Felt                             | Hva den inneholder                                     |
| -------------------------------- | ------------------------------------------------------ |
| `request_body` / `response_body` | Samtalen lastes etter hvert som dashbordet gjengir dem |
| `pipeline_route_decision`        | Hvilket mål og hvilken modell ruteren valgte           |
| `pipeline_client_request`        | Råforespørselen nøyaktig slik klienten sendte den      |
| `pipeline_openai_request`        | Etter oversettelse til den interne OpenAI formen       |
| `pipeline_provider_request`      | Som faktisk sendt oppstrøms, på leverandørdialekten    |
| `pipeline_provider_response`     | Den rå oppstrømsresponsen                              |
| `pipeline_client_response`       | Det som ble levert tilbake til den som ringte          |
| `pipeline_error`                 | Feildetaljer på rørledningsnivå for et mislykket anrop |
| `bodies_truncated`               | Sant når et felt ovenfor treffer `maxBodyBytes`        |

Dette er raskt innhold, så det er det** av som standard** og bevisst et valg per destinasjon. Det som sendes er det dashbordet viser, fordi eksport og `getCallLogById` deler detaljoppløsning: nyttelaster er allerede PII-sanitisert og hemmelig-redigert når de skrives, og et anrop gjort med en `noLog` API nøkkel lagrer ingen nyttelast i det hele tatt, så det er ingenting å eksportere.

Nyttelaster leses per rad fra filsystemartefakten, så hydrering kjører bare for destinasjoner som ba om det. En manglende eller korrupt artefakt eksporterer sammendraget med null nyttelast i stedet for å svikte batchen og strande markøren.

`maxBodyBytes` (standard 262144) begrenser hvert felt. Lengre nyttelast er** kuttes i stedet for å slippes** — en klippet ledetekst svarer fortsatt "hva ble spurt" — og raden er flagget med `bodies_truncated`. Strømmede del-for-del-deltaer eksporteres ikke; den sammensatte responsen er allerede i `pipeline_provider_response` og `pipeline_client_response`.

---

## 2. Filer

| Del                                     | Plassering                                   |
| --------------------------------------- | -------------------------------------------- |
| Destinasjonskontrakt                    | `src/lib/logExport/types.ts`                 |
| Register                                | `src/lib/logExport/registry.ts`              |
| Håndtering av hemmeligheter             | `src/lib/logExport/secrets.ts`               |
| Kjøringsmodul (IPC i forelderprosessen) | `src/lib/logExport/runner.ts`                |
| Prosesslivssyklus                       | `src/lib/logExport/childRunner.ts`           |
| Inngangspunkt for underprosess          | `src/lib/logExport/exportChild.ts`           |
| Åpner for skrivebeskyttet tilgang       | `src/lib/db/logExportReadOnly.ts`            |
| Delt spørring/tilordning                | `src/lib/usage/callLogExportQueries.ts`      |
| Detaljoppløser                          | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projeksjon                          | `src/lib/logExport/presenter.ts`             |
| BigQuery-destinasjon                    | `src/lib/logExport/destinations/bigquery.ts` |
| Google-tjenestekontoautentisering       | `src/lib/logExport/googleServiceAccount.ts`  |
| Kilde for anropslogg                    | `src/lib/usage/callLogExportSource.ts`       |
| Lagring                                 | `src/lib/db/logExportDestinations.ts`        |
| Cron-jobb                               | `src/lib/jobs/logExportJob.ts`               |
| REST-lag                                | `src/app/api/log-export/`                    |
| Dashbordside                            | `src/app/(dashboard)/dashboard/log-export/`  |

Skjema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle ruter krever administrasjonsautentisering (`requireManagementAuth`). Hemmeligheter returneres aldri:
En lagret hemmelighet returneres som den bokstavelige verdien `__stored__`, og hvis denne verdien sendes tilbake ved en oppdatering,
beholdes den lagrede påloggingsinformasjonen.

Oppretting eller oppdatering av en destinasjon med en type som definerer en hemmelighet, **krever
`STORAGE_ENCRYPTION_KEY`**. Uten denne slipper `encrypt()` verdien uendret gjennom uten varsel, så skriveoperasjonen
avvises med 400 i stedet for å lagre påloggingsinformasjon i SQLite i klartekst (samme sikkerhetssjekk som
Telegram-webhooken bruker).

| Metode   | Sti                                      | Formål                                                          |
| -------- | ---------------------------------------- | --------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinasjonstyper + liste over konfigurasjonsfeltene deres      |
| `GET`    | `/api/log-export/destinations`           | List opp destinasjoner (hemmeligheter skjult)                   |
| `POST`   | `/api/log-export/destinations`           | Opprett en destinasjon                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | Hent én                                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | Oppdater navn / aktivering / konfigurasjon / satsvis behandling |
| `DELETE` | `/api/log-export/destinations/{id}`      | Slett                                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | Test påloggingsinformasjon uten å skrive noe                    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Tøm køen nå, med samme kjøringsløp som den planlagte kjøringen  |
| `GET`    | `/api/log-export/status`                 | Cron-status, nylige kjøringer, etterslep per mål                |

`GET /api/log-export/types` er det som gjør brukergrensesnittet generisk: Dashbordskjemaet gjengis ut fra
de returnerte feltbeskrivelsene, slik at en ny destinasjon ikke krever endringer i brukergrensesnittet.

---

## 4. BigQuery-destinasjon

Konfigurasjonsnøkler (`type: "bigquery"`):

| Nøkkel               | Merknader                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-prosjektet som inneholder datasettet                                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                         |
| `location`           | Brukes bare når datasettet må opprettes (standardverdi `EU`)                                            |
| `serviceAccountJson` | Tjenestekontonøkkel. Hemmelig: kryptert i hvile, returneres aldri                                       |
| `autoCreate`         | Opprett manglende datasett/tabell; legg betinget til nullable-kolonner for bruksbevis (standard `true`) |

Tjenestekontoen trenger `bigquery.tables.updateData` på måltabellen, samt
`bigquery.datasets.create` / `bigquery.tables.create` når `autoCreate` er aktivert.
Oppdatering av en eksisterende tabell for å legge til de to nullable-feltene for bruksbevis
krever også `bigquery.tables.update`. En manglende tillatelse avbryter eksporten uten å
flytte markøren fremover.

En konfigurert batch er en **markørenhet**, ikke en HTTP-enhet: `send()` deler den opp i
insertAll-kall på maksimalt 500 rader, slik at en stor `batch_size` ikke kan utløse BigQuerys
grense på 10 MB per forespørsel. Forbigående statuser (408/429/500/502/503/504) forsøkes på
nytt opptil tre ganger med eksponentiell backoff, med de samme insertIds; autentiserings- og
skjemafeil kastes ved første forsøk i stedet for å bruke opp kjøringen.

En tabell som nettopp er opprettet, er ikke synlig for strømmeendepunktet ennå, som svarer
med 404 i noen sekunder. Denne 404-en forsøkes på nytt, men **bare når denne kjøringen
opprettet tabellen** — en tabell som faktisk mangler, feiler fortsatt umiddelbart. Merk at
det å opprette en tabell på nytt med et navn som nylig ble slettet, får BigQuery til å
avvise strømmeinnsettinger i flere minutter; dette skyldes sletting-etterfulgt-av-nyoppretting,
så foretrekk et nytt tabellnavn fremfor å slette og legge til tabellen på nytt.

**En delvis feil kommer som HTTP 200 med en ikke-tom `insertErrors[]`.** Dette behandles som
en feil og kastes, noe som hindrer markøren i å gå forbi rader BigQuery aldri godtok;
`tests/unit/log-export-bigquery.test.ts` fastslår denne atferden.

Transporten er ren REST — en selvsignert RS256-påstand utveksles mot et tilgangstoken på
`https://oauth2.googleapis.com/token`, og deretter sendes radene til `tabledata.insertAll`.
Ingen Google-SDK hentes inn. Tilgangstokener bufres i prosessen per (tjenestekonto, scope).

Den opprettede tabellen har én kolonne per felt i Logs-fanen, pluss `exported_at`, og er
utformet for hvordan samtalelogger faktisk spørres:

- **Dagspartisjonert på `timestamp`**, slik at en spørring avgrenset av dato bare skanner
  disse dagene.
- **Klyngeinndelt etter `api_key_name`, `provider`, `model`, `status`** (i denne rekkefølgen),
  slik at filtrering etter hvem som kjørte den, hvor den ble sendt, eller om den feilet,
  utelater blokker i hver partisjon. BigQuery tillater maksimalt fire klyngekolonner, og
  rekkefølgen er viktig: Et filter på `api_key_name` alene utelater blokker, mens et filter på
  `status` alene ikke gjør det.
- **Valgfri oppbevaring av partisjoner** via `partitionExpirationDays` (0 beholder alt), brukt
  når tabellen opprettes.

Begge innstillingene gjelder ved opprettelse. En eksisterende tabell beholder oppsettet den
allerede har, så pek destinasjonen mot en ny tabell-ID hvis du vil ta dem i bruk.

`tests/unit/log-export-bigquery.test.ts` bekrefter at tilordningen og tabellskjemaet holdes
i samsvar, slik at en ny samtaleloggkolonne ikke kan bli droppet ubemerket på veien ut.

Batcher deles opp etter **både radantall og serialiserte byte**. Radantall alene er ikke nok
når nyttelaster eksporteres: 500 rader med ledetekster kan utgjøre titalls megabyte, og
insertAll avviser en forespørsel på over 10 MB. Delene avsluttes ved 500 rader eller 9 MB,
avhengig av hva som inntreffer først.

---

## 5. OTLP/HTTP-destinasjon for spor

Konfigurasjonen bruker `type: "otlp-http"`. Dette er en planlagt, markørbasert eksport av vedvarende
anropslogger, ikke den best-effort-sinken for aktive rutingshendelser i
`open-sse/services/routing/otel.ts`. Den leser eller endrer ikke sinkens miljøvariabler,
tidtakere eller buffere. Aktivering av begge kan produsere to uavhengige typer spans;
bruk instrumenteringsområdet `omniroute.log-export` for å skille disse anropslogg-spanene.

| Nøkkel                   | Standardverdi / formål                                                           |
| ------------------------ | -------------------------------------------------------------------------------- |
| `endpoint`               | Påkrevd fullstendig HTTP(S)-URL for spor; suffikset `/v1/traces` legges ikke til |
| `headers`                | Valgfrie `Name: value`-linjer eller JSON-objekt med strenger; kryptert           |
| `requestHeaderAllowlist` | Tom (av); klientheadernavn/-prefikser som skal registreres som span-attributter  |
| `serviceName`            | `omniroute`; ressursen `service.name`                                            |
| `langfuseMapping`        | `false`; legger til attributter for Langfuse-generering/-økt/-bruker             |
| `identity`               | `pseudonymous`, `keyName` eller `none`                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                          |
| `timeoutMs`              | `30000` per HTTP-forsøk                                                          |
| `environment`            | Ikke angitt; valgfritt `langfuse.environment`                                    |

Det generiske dashbordet gjengir disse feltene. `paths` godtar en API-matrise eller et tekstområde
med eksakte stier separert med linjeskift/komma. Embeddings, rerank og andre stier
utelates med mindre de eksplisitt er tillatt. Hoppede rader flytter fortsatt markøren fremover;
den eksisterende kjørerens `exported`/`exportedTotal`-tellere teller behandlede kilderader,
inkludert filtrerte rader, i stedet for aksepterte spans. Filtreringen gjøres i underprosessen,
uten å endre IPC-/markørkontrakten.

URL-validering bruker den DB-frie hjelpefunksjonen `parseAndValidateNonMetadataUrl` fra
`src/shared/network/outboundUrlGuard.ts`: policyen `block-metadata`. Den har de samme
ubetingede kontrollene for metadata/protokoll/innebygd legitimasjon som webhook-validatoren,
med private URL-er eksplisitt tillatt, men tillater med hensikt localhost-/LAN-mål uten en
global overstyring av funksjonsflagget. Dette muliggjør selvhostede Langfuse-, Phoenix-, Tempo-
og Collector-endepunkter, inkludert private HTTP-endepunkter. Vertsnavn for skymetadata
blokkeres alltid. Omdirigeringer følges ikke, så en collector kan ikke omdirigere legitimasjon
til en annen vert. I likhet med den eksisterende leksikalske URL-vakten låser ikke dette
DNS-oppslag; konfigurer bare operatørstyrte verter. Foretrekk HTTPS når endepunktet ikke
befinner seg på et klarert nettverk.

### Nyttelast og levering

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) inneholder ett
CLIENT-span per tillatt rad, navngitt etter den eksakte forespørselsstien. Navngivning etter sti
skiller Chat Completions, Responses og Messages uten å legge inn modell- eller identitetsdata
i span-navnet. Ressursattributter inkluderer `service.name` og pakkens `service.version`.

Den normale loggen for chatforsøk (`open-sse/handlers/chatCore/attemptLogging.ts`) skriver
`duration = Date.now() - startTime` ved fullføring og oppgir ikke et tidsstempel;
`saveCallLogOperation` i `src/lib/usage/callLogs.ts` setter som standard tidsstempelet til
skrivetidspunktet (fullføringstidspunktet). Eksporten setter derfor slutt = radens tidsstempel
og start = slutt − varighet (millisekunder, konvertert til desimale nanosekunder).
Historiske tidsstempler levert av anroperen bevares også som sluttidspunkt; det finnes ingen
skillemekanisme per rad for start/fullføring. En null-varighet blir null. Ugyldige eller
manglende tidsstempler får batchen til å feile i stedet for å opprette ikke-deterministiske
spans. `ttftMs` kan være null og tilordnes til `omniroute.ttft_ms`.

Attributtene inkluderer `gen_ai.operation.name="chat"`, leverandør, forespurt/svart modell,
inndata-/utdatatoken, valgfrie token for cache-lesing/cache-oppretting/resonnering, HTTP-status,
kombinasjon, cachekilde, øktetikett og korrelasjons-ID. Heltallsverdier og tidsstempler i OTLP
er desimale strenger; strenger, boolske verdier og brøktall bruker sine opprinnelige
OTLP-verdivarianter. Feilspan har ERROR-status og en renset statusmelding. Den kanoniske
posten har ingen URL til oppstrømsvert, så `server.address` utelates i stedet for å identifisere
collectoren feilaktig som modellserveren. Kostnad eksporteres ikke.

Bare `includeBodies=true` laster innhold. Med `langfuseMapping=false` inneholder
`gen_ai.input.messages` / `gen_ai.output.messages` den rensede JSON-en for forespørsels-/svarbrødteksten
slik den er lagret av OmniRoute (kanonisert når den kan analyseres), ikke en omformet
semconv-meldingsmatrise. Avkortede/ikke-JSON-baserte brødtekster forblir rå tekst. Med
`langfuseMapping=true` sendes brødtekster bare som `langfuse.observation.input` /
`langfuse.observation.output`; `gen_ai.*.messages`-attributtene utelates slik at hver
brødtekst sendes én gang. Begge modi arver `maxBodyBytes` fra den eksisterende innlastingsbanen;
`omniroute.bodies_truncated=true` markerer avkorting.
Ingen ekstra pipeline-øyeblikksbilder eller usensurerte artefaktlesninger legges til av denne
destinasjonen; valgfri innsamling av forespørselsheadere bruker det eksisterende innlastede
klientøyeblikksbildet som beskrives nedenfor.
Bruk en kadens på minuttnivå, for eksempel `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, ved eksport
av brødtekster, i stedet for å samle opp en timesvis backlogg.

### Valgfrie klientheadere for forespørsler

Innsamling av headere er **av som standard**. Angi `requestHeaderAllowlist` i destinasjonskonfigurasjonen
og aktiver **Eksporter ledetekster og svar** (`includeBodies: true` på destinasjonen).
Tillatelseslisten godtar en API-matrise eller et tekstområde med navn separert med linjeskift/komma:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Navn samsvarer uten hensyn til store og små bokstaver og må samsvare nøyaktig, med mindre en enkelt avsluttende `*` velger et prefiks for ikke-tomme headernavn. Bare `*`, innebygde jokertegn og ugyldige HTTP-headernavn avvises.
Det kan være høyst 64 velgere, og hvert navn eller prefiks kan være på høyst 256 ASCII-byte.
Denne innstillingen er separat fra `headers`, som autentiserer eksportøren mot samleren.

Opptaket leser bare `pipeline_client_request`, som fylles ut fra `clientRawRequest` (eller eldre `clientRequest`) i den lagrede detaljerte pipelinen. Det faller aldri tilbake til leverandørens request-headere.
Detaljert logging av pipelinen må ha vært aktivert da forespørselen ble registrert. Når
`includeBodies` er deaktivert, eller når JSON-en for klientøyeblikksbildet mangler, er skadet eller avkortet, sendes ingen header-attributter. En økning av `maxBodyBytes` kan unngå at øyeblikksbildet avkortes ved eksporttidspunktet; den kan ikke gjenopprette detaljer som aldri ble lagret. Et øyeblikksbilde på over 1 MiB eller med mer enn 256 headeroppføringer ignoreres. Den eksisterende eksporten av prompt/respons forblir aktiv sammen med headeropptaket; tillatelseslisten tilbyr ikke en modus for hydrering av bare headere.

Valgte verdier blir OTLP-strengtabeller med navnene `http.request.header.<full lowercase header name>`, også når det bare finnes én streng. For eksempel blir `X-OmniRoute-Meta-Team: example-team` til
`http.request.header.x-omniroute-meta-team` med
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Hele prefikset bevares: dette er vanlige headere, uten tolkning av forretningsfelter eller konvertering til `omniroute.metadata.*` / Langfuse-metadata. `langfuseMapping` endrer ikke semantikken til headere. En valgt `User-Agent` med én verdi setter også standard-skalaren `user_agent.original`. Kommaer i én verdi deles ikke opp. Varianter med ulik bruk av store og små bokstaver slås sammen i rekkefølgen de er lagret i; hvis en variant er ugyldig, utelates hele headeren. Attributter sorteres etter navn med små bokstaver.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, API-nøkkel-headere, navn som inneholder markører for auth/token/secret/password/credential, samt interne gateway-legitimasjoner utelates alltid, selv om de er valgt eller delvis maskert i lagringen. Kjente mønstre for legitimasjon bruker den delte legitimasjonsdetektoren; redigeringsmarkører utelates og eksporteres ikke som trygge verdier. Bare strenger og ikke-tomme strengtabeller godtas; tall eller objekter konverteres ikke. Ugyldige navn, prototypenøkler, kontrolltegn (unntatt horisontal tabulator) og ugyldig Unicode ignoreres uten at batchen feiler eller innholdet deres gjenspeiles i feil.

Hvert spenn registrerer høyst 32 headere, 16 verdier per header, 4096 UTF-8-byte per verdi og totalt 16384 UTF-8-byte på tvers av registrerte headernavn og -verdier. For store eller ugyldige headere utelates i sin helhet, de avkortes ikke. Valg av hva som skal inkluderes er en personvernavgjørelse for operatøren: navn som ser trygge ut, kan fortsatt inneholde personopplysninger, og disse grensene og detektorene er ikke en generell PII-rensing.

### Leveringsbegrensninger

Forespørsler er begrenset til 500 spenn og 4 MiB UTF-8-kodet JSON, inkludert omslaget.
Alle tillatte spenn størrelseskontrolleres før den første forespørselen i en markørbatch. Et enkelt spenn som er større enn grensen, sender ingen del av denne batchen og mislykkes med veiledning om å senke
`maxBodyBytes`; det forkastes ikke i stillhet. Forhåndskontrollen beholder bare referanser til poster og byteantall, og forkaster hvert midlertidige spenn/JSON; spenn bygges på nytt for avgrensede deler i stedet for å beholde en ekstra serialisert kopi av batchen. HTTP 408/429/5xx, nettverksfeil og tidsavbrudd får høyst
tre forsøk, med eksponentiell tilbakeventing på 250/500 ms. `Retry-After` i sekunder eller HTTP-datoer
kan forlenge en forsinkelse med opptil 5 sekunder. Andre statuser mislykkes umiddelbart. OTLP 2xx-avvisning med delvis feil utløser også en feil i stedet for
å bekrefte et tapt spenn; tomme eller gyldige JSON-bekreftelser godtas, med en
grense på 64 KiB for lesing av responsen.

Feil inneholder bare fakta som eies av eksportøren: HTTP-status, retry-klasse, antall forsøk og antall sendte spenn, eller fast ordlyd for bekreftelses-/nettverksfeil. Responslegemer fra samleren,
antall delvise vellykkede elementer og responsheadere kopieres aldri til feil, logger eller dashbordet. En mislykket eller delvis godkjent batch bekreftes ikke: målet viser statusen Failing, markøren blir stående på den sist bekreftede batchen, og neste kjøring sender de samme radene på nytt. Permanente statuser fortsetter å feile til samleren eller konfigurasjonen er rettet. Bruk samlerens egne logger for responsdetaljer. Feilsammendrag i samtaleloggen beholder sin separate redigering.
`prepare()` klargjør ingen ressurser; Test sender nøyaktig `{"resourceSpans":[]}` og rapporterer
HTTP-statusen uten å skrive spenn til samtaleloggen.

Trace-ID-er og span-ID-er er de første 32/16 heksadesimale sifrene i SHA-256 over
`"omniroute.trace\\0" + callLogId` og `"omniroute.span\\0" + callLogId`. Nye sendinger bruker
identiske ID-er. Dette er ingen garanti for deduplisering: enkelte backends, inkludert Langfuse
v4-inntak, dedupliserer ikke spenn med samme ID. Et krasj eller en delvis feil i en del kan sende
den ene ubekreftede markørbatchen på nytt; hele batchen kan bli duplisert, ikke bare den siste HTTP-delen. Velg størrelsen på markørbatchen med dette avveiningsforholdet i mente.

### Langfuse-eksempel

Konfigurer disse feltene for en selvhostet Langfuse-instans:

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

Bygg Authorization-verdien lokalt som Base64 av den bokstavelige strengen `public-key:secret-key`
(for eksempel med `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ikke lim inn ekte legitimasjon i logger, skjermbilder eller saker. Tilordningen setter automatisk
`x-langfuse-ingestion-version: 4`; Authorization oppgis fortsatt i `headers`.
Både headere og det genererte saltsaltet for identiteten bruker den eksisterende krypterte mekanismen for hemmelige felt og API-plassholdere; `STORAGE_ENCRYPTION_KEY` er påkrevd.

Tilordningen legger til genereringstype/-modell, JSON-bruksdetaljer (input/output/total og tilgjengelige
hurtigbuffernøkler), JSON-øyeblikksbilder av input/output, ERROR/DEFAULT-nivå, sanitert statusmelding,
sporingsnavn, økt-ID, valgfritt miljø og filtrerbar
`langfuse.observation.metadata.<key>` for leverandør, forespurt modell, bane, kombinasjon, hurtigbufferkilde
og status. `langfuse.observation.completion_start_time` er ISO 8601 ved start + TTFT bare når TTFT er kjent
og ligger innenfor varigheten. Ingen kostnadsattributter sendes.

Identitetsmoduser gjelder for `langfuse.user.id`:

- `pseudonymous` (standard): HMAC-SHA256 av API-nøkkelens interne ID med et tilfeldig 32-bytes salt per mål. Saltet genereres ved opprettelse hvis det mangler, krypteres som `identitySalt`, returneres aldri og beholdes ved redigering. Rå nøkkel-ID-er legges aldri i span-attributter. Hvis et mål opprettes på nytt eller saltet roteres, endres identitetene.
- `keyName`: det konfigurerte API-nøkkele-navnet, som med hensikt avslører operatørens etikett.
- `none`: ingen bruker-ID. Øktetiketter eksporteres fortsatt når de finnes; disse modusene anonymiserer ikke vilkårlig promptinnhold eller økt-/korrelasjonsetiketter som er angitt av operatøren.

### Starte uten tilbakefylling

Bare ved opprettelse aktiverer du **Start fra gjeldende posisjon (hopp over eksisterende logger)** eller sender
`startFromCurrentPosition: true` på toppnivået i create API-nyttelasten. Dette initialiserer
`cursor_row_id` til gjeldende største beholdte rowid i anropsloggen ved hjelp av de eksisterende markørhjelperne,
uten en migrering. Standardverdien er false (markør 0 og tilbakefylling av beholdt historikk).
Dette er ikke en innstilling for tilbakestilling av markøren ved oppdateringstidspunktet.

Tillegget av den delte `ttftMs` legger også til en nullstillbar `ttft_ms`-kolonne i BigQuery-tilordningen
og skjemaet for nye tabeller: Skjematesten krever at hvert kanoniske postfelt har en kolonne. Eksisterende
tabeller fortsetter å eksporteres uendret: `prepare()` leser tabellskjemaet og utelater bare `ttft_ms` når
den kolonnen mangler. Legg til den nullstillbare INT64-kolonnen for å få TTFT ved neste kjøring, eller bruk en
ny tabell. Den valgfrie TTFT-kolonnen utløser ikke en skjemaoppdatering. Kolonner for dokumentasjon av bruk
følger den betingede, eksplisitt aktiverte kompatibilitetsflyten nedenfor; andre radfelt beholder streng
skjemakontroll.

---

## 6. Legge til en destinasjon

1. Opprett `src/lib/logExport/destinations/<name>.ts` som eksporterer en `LogExportDestinationType`:
   et Zod-`configSchema`, en `fields`-beskrivelsesmatrise for brukergrensesnittet, `secretFields` og en
   `createClient(config)` som returnerer `test()` / `prepare()` / `send(records)`.
2. Legg den til i `DESTINATIONS`-matrisen i `src/lib/logExport/registry.ts`.
3. Skriv tester under `tests/unit/`.

Det er hele endringen: persistenslaget, cron-jobben, REST-laget, krypteringen av hemmeligheter og
skjemaet i kontrollpanelet leser alle fra registeret.

To regler for en ny destinasjon:

- `send()` **må kaste et unntak** ved delvis feil. Vellykket fullføring betyr «destinasjonen har disse radene»,
  og markøren flyttes permanent forbi dem.
- En destinasjon som tar imot en brukeroppgitt URL, må validere den gjennom
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) før den henter data,
  på samme måte som webhooks gjør. BigQuery trenger ikke dette: vertene er konstanter.

---

## 7. Bruk

- **Instrumentbord**: Integrasjoner → Loggeksport. Legg til et mål, kjør **Test** for å kontrollere legitimasjonen
  uten å skrive rader, og aktiver det deretter.
- **Etterslep**: hvert målkort viser ventende rader og markøren; `GET
/api/log-export/status` returnerer de samme tallene samt de siste 20 jobbkjøringene.
- **Et mål som mislykkes, fører ikke til at de andre mislykkes** — kjøringssammendraget registrerer status
  per mål i `last_status` / `last_error`, og historikken for jobbkjøringer beholder aggregatet.
- **Når et mål slettes, slettes markøren.** Hvis du legger det til på nytt, starter det fra den eldste
  bevarte anropsloggen, og sender rader på nytt som målet kanskje allerede har. I BigQuery absorberer
  `insertId` per rad dette bare innenfor BigQuerys eget vindu for deduplisering, så det er bedre å deaktivere
  et mål enn å slette det.

### Kompatibilitet for skjemaet for bruksbevis

Nye BigQuery-tabeller inkluderer nullable `usage_evidence` (STRING som inneholder JSON) og
`usage_estimated` (BOOL). Når `autoCreate` er aktivert, kan en eksisterende tabell motta
bare disse manglende nullable-kolonnene. Eksportøren bevarer hele det eksisterende skjemaet,
inkludert feltmetadata, og sender en betinget PATCH ved hjelp av den returnerte etag-en. En samtidig
skjem endring fører til at eksporten mislykkes i stedet for å overskrive den; neste kjøring leser
tabellen på nytt.

Når `autoCreate` er deaktivert, må du selv legge til disse kolonnene før du eksporterer poster
med bruksbevis. Manglende skjema-/etag-metadata eller en mislykket oppdatering hindrer også
innsettinger som inneholder bevis. Eksportmarkøren går ikke videre ved denne feilen, og bevis
droppes aldri i stillhet. Lokal loggbevaring gjelder fortsatt mens en eksport er blokkert, så løs
feilen før de bevarte kilderadene utløper.
