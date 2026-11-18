# Log export (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, inkrementell eksport av OmniRoute-kallogger til et eksternt analyselager.

Loggfanen i dashbordet lagrer forespørselshistorikk i SQLite (`call_logs`), begrenset av
rotasjon og oppbevaringstid. Loggeksport sender det samme postsettet ut etter en tidsplan, slik at det kan bevares
lenger enn den lokale databasen og kobles sammen med andre data. BigQuery er den første destinasjonen;
pipelinen er registerbasert, så flere destinasjoner kan legges til.

---

## 1. Slik fungerer det

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Tidsplan** — én cron-jobb i `JobRegistry`, `log_export`, med standardverdien `0 * * * *` (hver time,
  UTC). Registrert i `src/lib/initCloudSync.ts`; kan overstyres med `OMNIROUTE_LOG_EXPORT_CRON`.
  Hver kjøring eksporterer alle ventende poster for hver **aktivert** destinasjon, sekvensielt.
- **Markør** — SQLites implisitte `call_logs.rowid`, lagret per destinasjon i
  `log_export_destinations.cursor_row_id`. `timestamp` brukes bevisst ikke som markør: kallere
  kan oppgi sin egen verdi, så en treg forespørsel kan bli skrevet etter en raskere som startet
  senere, og en tidsstempelmarkør ville hoppet over den.
- **Satsvis behandling** — `batch_size` rader per forespørsel (standard 500), `max_rows_per_run` rader per kjøring
  (standard 10000), slik at et stort etterslep behandles over flere kjøringer i stedet for å blokkere én.
- **Levering** — markøren flyttes frem først etter at `send()` er fullført. En mislykket sats lar
  markøren stå der den var, slik at de samme radene forsøkes på nytt ved neste kjøring. Garantien er
  minst én gang pluss deduplisering på destinasjonssiden, ikke ekte nøyaktig én gang: BigQuery bruker
  kallogg-ID-en som nøkkel for hver rad og respekterer denne etter beste evne innenfor sitt eget dedupliseringsvindu.
- **Overlappsvern** — cron-kjøringen og `POST .../run` kan utløses samtidig. En destinasjon
  som allerede eksporterer, hoppes over i stedet for å eksporteres to ganger (`skipped: true` i kjøringsresultatet),
  slik at en samtidig kjøring ikke kan sende en sats på nytt eller flytte markøren bakover.
- **Gjenoppretting etter tømming** — hvis `cursor_row_id` havner over `MAX(rowid)` (hele tabellen ble
  tømt og rad-ID-ene startet på nytt), tilbakestiller kjøreren til 0 i stedet for å bli permanent blind.

### Isolert kjører og grenser

Hver destinasjonskjøring på Node starter en separat, kortlivet underprosess på OS-nivå (`child_process`
med IPC, ikke `worker_threads`). Lesing av innhold, JSON-parsing/-serialisering av nyttelast, destinasjonens
`prepare()` og destinasjonens nettverks-I/O kjøres der, ikke i serverens hendelsesløkke.
Bare konfigurasjon og små fremdriftsmeldinger sendes over IPC; eksporterte poster returneres aldri til
serveren. Cron-jobben og Kjør nå-ruten beholder samme offentlige resultat og overlappsvern.

Underprosessen åpner serverens oppløste `DATA_DIR/storage.sqlite` skrivebeskyttet med `node:sqlite`,
med `busy_timeout=5000` og `query_only=ON`. Den importerer ingen databasesingleton og utfører ingen
migreringer, sikkerhetskopier eller SQLite-oppdateringer. Bokføring av manglende/korrupte artefakter (inkludert
UPDATE for korrupte artefakter) forblir utelukkende i dashbordets detaljflyt. Begge flytene deler en ren
detaljoppløser; eksport bruker asynkrone filsystemlesinger og samme oppløsningsrekkefølge: artefakt → eldre
innebygd innhold → eldre diskinnhold → ingen. En kjøring tar et øyeblikksbilde av høyeste innsettings-rowid
når underprosessen åpner leseren; senere innsettinger venter til neste kjøring. Dette er en innsettingsgrense,
ikke en langvarig SQLite-transaksjon: WAL-skrivere og sjekkpunkter forblir uhindret under
nettverksventing. Oppdateringer/slettinger av eksisterende rader fryses ikke av denne grensen.

Etter hver akseptert sats venter underprosessen på en bekreftelse. Serveren lagrer først
markøren med `advanceLogExportCursor`, og sender deretter `ack`; ingen ny sats starter før dette.
En sendefeil, krasj eller tidsavbrudd registrerer feil uten å flytte markøren for den aktuelle satsen. Tidligere
bekreftede satser forblir lagret; høyst den ene ubekreftede satsen kan sendes på nytt.
Vellykket kjøring registreres først etter `done` og en normal avslutning av underprosessen. Feil avslutter underprosessen
med SIGTERM, med eskalering til SIGKILL etter 500 ms, og kjøreren venter til prosessen er lukket.

| Miljøvariabel                                 | Standard | Formål                                                |
| --------------------------------------------- | -------- | ----------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Tidsgrense per destinasjon målt i faktisk forløpt tid |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Grense for underprosessens V8 old-space i MB          |

Ugyldige/ikke-positive/ikke-heltallige verdier bruker standardverdiene. Heap-innstillingen er ikke en total
RSS-grense; svært store satser kan fortsatt bruke opp underprosessens minne og få kjøringen til å feile på en trygg måte.
Standardverdien på 1024 MB gir slingringsmonn for standardsatsen på 500 rader med artefakter på 512 KiB med
innhold aktivert, inkludert BigQuerys JSON-serialisering i bytebaserte blokker. Den gjør ikke en
sats på 10000 rader med innhold trygg. Uttømming av V8-heapen registrerer en feil med konkrete tiltak: reduser satsstørrelsen
eller øk `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; markøren blir stående ved den sist
bekreftede satsen. Historisk innebygd innhold / diskinnhold omfattes ikke av den moderne artefaktgrensen.
Operatører må budsjettere RSS separat, særlig i containere med begrenset minne.

Underprosessen arver bare den ferdig oppløste `DATA_DIR`, `NODE_ENV`, eksplisitt `TZ` (oppløsning av
lokal tid i eldre filnavn), `ELECTRON_RUN_AS_NODE` når den finnes, og følgende inndata for utgående trafikk:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (og variantene med små bokstaver),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
En global Undici-dispatcher deler serverens rent miljøbaserte proxyoppløsning og regler for å omgå
proxy for lokale verter, inkludert `NO_PROXY`; den importerer ikke `proxyFetch.ts` eller tilhørende database-/funksjonsflagg.
Proxyens påloggingsopplysninger sladdes i videresendte utdata og registrerte feil. Destinasjonens påloggingsopplysninger
overføres bare i én IPC-startmelding, aldri via argv eller miljøet; videresendte utdata og feil får
et prefiks og renses. Bare `ExperimentalWarning` deaktiveres i underprosessens kjøreargumenter for å unngå
at Nodes SQLite-advarsel gjentas ved hver cron-kjøring; andre advarselstyper forblir synlige.

Destinasjonsmoduler må kunne importeres uten avhengigheter til Next.js eller komponenter som bare kan kjøres på serveren. Den eksisterende
BigQuery-implementasjonen oppfyller allerede dette kravet. Hurtiglagre for tilgangstokener varer bare under
kjøringen av underprosessen, ikke på tvers av kjøringer. Node er det støttede kjøremiljøet (`package.json` engines), men Bun-installasjonsdelen
i README og `Dockerfile.bun` beskriver også en kompatibilitetsløsning for produksjon med
`bun:sqlite` (`src/lib/db/core.ts` / adaptere). Under Bun beholder eksportene derfor den tidligere
utførelsen i samme prosess og viser en engangsadvarsel: isolering av underprosessens heap og tidsavbrudd er ikke tilgjengelig. Bruk
Node for isolering av hendelsesløkke og OOM; Bun regnes ikke som kun for utvikling her.

Når `includeBodies` er aktivert, bør du foretrekke et intervall på minuttnivå, for eksempel
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, fremfor å bygge opp en times etterslep av nyttelaster.
Batch- og radgrenser begrenser fortsatt hver kjøring. Prosessoppstart skjer per destinasjon per kjøring;
dette bytter en liten oppstartskostnad mot isolering av serverens hendelsesløkke, ikke redusert samlet CPU-bruk.

### Nyttelaster (ledetekster og fullføringer)

Som standard inneholder eksporten bare sammendragsfeltene som vises i **listen** i logger. Hvis du aktiverer
**Eksporter ledetekster og svar** (`includeBodies`), sendes i tillegg det som vises i **detaljruten**
i logger for hvert kall:

| Felt                             | Hva det inneholder                                                  |
| -------------------------------- | ------------------------------------------------------------------- |
| `request_body` / `response_body` | Kallets nyttelaster slik de vises i dashbordet                      |
| `pipeline_route_decision`        | Hvilket mål og hvilken modell ruteren valgte                        |
| `pipeline_client_request`        | Den rå forespørselen nøyaktig slik klienten sendte den              |
| `pipeline_openai_request`        | Etter oversettelse til det interne OpenAI-formatet                  |
| `pipeline_provider_request`      | Slik den faktisk ble sendt til leverandøren, i leverandørens format |
| `pipeline_provider_response`     | Det rå svaret fra leverandøren                                      |
| `pipeline_client_response`       | Det som ble returnert til den som utførte kallet                    |
| `pipeline_error`                 | Feildetaljer på pipelinenivå for et mislykket kall                  |
| `bodies_truncated`               | Sann når et av feltene ovenfor nådde `maxBodyBytes`                 |

Dette er ledetekstinnhold, så funksjonen er **av som standard** og er bevisst et valg per destinasjon.
Det som sendes, er det dashbordet viser, fordi eksporten og `getCallLogById` deler samme
detaljoppløsning: nyttelastene er
allerede renset for personopplysninger og hemmeligheter når de skrives, og et kall utført med en
`noLog`-API-nøkkel lagrer ingen nyttelast, så det finnes ingenting å eksportere.

Nyttelaster leses per rad fra filsystemartefakten, så innlasting av disse kjøres bare for destinasjoner
som har bedt om det. Hvis en artefakt mangler eller er skadet, eksporteres sammendraget med nullverdier for nyttelastene i stedet
for at batchen feiler og markøren blir stående fast.

`maxBodyBytes` (standard 262144) begrenser hvert felt. Lengre nyttelaster **avkortes i stedet for å
utelates** — en avkortet ledetekst svarer fortsatt på «hva ble det spurt om» — og raden merkes med
`bodies_truncated`. Strømmede deltaer, del for del, eksporteres ikke; det sammensatte svaret finnes
allerede i `pipeline_provider_response` og `pipeline_client_response`.

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
